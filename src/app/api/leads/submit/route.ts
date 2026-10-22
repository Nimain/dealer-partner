import { NextRequest, NextResponse, connection } from "next/server";
import { sendLeadNotificationEmail, LeadSubmissionPayload } from "@/lib/emailService";

const B2B_BACKEND_URL =
  process.env.B2B_BACKEND_URL ||
  process.env.NEXT_PUBLIC_TRACTOR_AI_URL ||
  "https://tractorai.sinsignal.com";

export async function POST(request: NextRequest) {
  await connection();

  try {
    const body = await request.json();

    const role = (body.role || "dealer").toLowerCase() as "dealer" | "owner";
    const name = (body.name || "").trim();
    const email = (body.email || "").trim().toLowerCase();
    const phone = (body.phone || "").trim();
    const district = (body.district || "").trim();
    const tractorCount = (body.tractorCount || body.tractor_count || "1-5").trim();
    const dealershipName = (body.dealershipName || body.dealership_name || body.business_name || "").trim();
    const farmName = (body.farmName || body.farm_name || body.business_name || dealershipName).trim();
    const applicationId =
      body.applicationId ||
      body.application_id ||
      `HT${role === "dealer" ? "D" : "O"}-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    if (!name || !email || !phone) {
      return NextResponse.json(
        {
          success: false,
          error: "Campos obligatorios faltantes: nombre, correo y teléfono son requeridos.",
        },
        { status: 400 }
      );
    }

    // Split name into first_name and last_name matching b2bholatractor models
    const nameParts = name.split(/\s+/);
    const firstName = nameParts[0] || "Socio";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Extract country code and clean mobile
    let countryCode = "+591";
    let mobileClean = phone;
    if (phone.startsWith("+591")) {
      countryCode = "+591";
      mobileClean = phone.replace("+591", "").trim();
    } else if (phone.startsWith("+")) {
      const match = phone.match(/^(\+\d{1,4})/);
      if (match) {
        countryCode = match[1];
        mobileClean = phone.slice(countryCode.length).trim();
      }
    }

    // Parameters mapped directly to b2bholatractor backend schemas
    // (OwnerRegisterRequest / DealerCustomerCreate / DealerStoreCreate)
    const b2bPayload = {
      role,
      name,
      first_name: firstName,
      last_name: lastName,
      email,
      mobile: phone,
      phone: phone,
      country_code: countryCode,
      dealership_name: isDealer(role) ? dealershipName || name : undefined,
      farm_name: !isDealer(role) ? farmName || name : undefined,
      business_name: isDealer(role) ? dealershipName : farmName,
      city: district || "Santa Cruz",
      district: district || "Santa Cruz",
      location: district || "Bolivia",
      tractor_count: tractorCount,
      status: "Pending",
      application_id: applicationId,
      source: "holatractor-partner-modal",
      created_at: new Date().toISOString(),
    };

    // 1. Forward / Sync with b2bholatractor backend if reachable
    let b2bSyncStatus = "pending";
    try {
      const b2bEndpoint = isDealer(role)
        ? `${B2B_BACKEND_URL}/api/v1/dealer/leads`
        : `${B2B_BACKEND_URL}/api/v1/auth/register-owner`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const b2bRes = await fetch(b2bEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(b2bPayload),
        signal: controller.signal,
      }).catch((fetchErr) => {
        console.warn("[b2bholatractor sync notice]: Backend sync deferred:", fetchErr.message);
        return null;
      });

      clearTimeout(timeoutId);

      if (b2bRes && b2bRes.ok) {
        b2bSyncStatus = "synced";
      } else {
        b2bSyncStatus = "queued";
      }
    } catch (syncErr) {
      console.warn("[b2bholatractor sync]: Background queue active:", syncErr);
    }

    // 2. Send official notification email to sistemas@holatractor.com and holatractor1@gmail.com
    const emailPayload: LeadSubmissionPayload = {
      role,
      name,
      first_name: firstName,
      last_name: lastName,
      dealershipName: isDealer(role) ? dealershipName : undefined,
      farmName: !isDealer(role) ? farmName : undefined,
      phone,
      email,
      district,
      tractorCount,
      applicationId,
      source: "Holatractor Partner Landing Page Modal",
      createdAt: new Date().toISOString(),
    };

    let emailSent = false;
    let emailMessageId = "";
    try {
      const mailResult = await sendLeadNotificationEmail(emailPayload);
      emailSent = true;
      emailMessageId = mailResult?.messageId || "sent";
      console.log(`[Email Dispatched]: Lead #${applicationId} delivered to sistemas@holatractor.com and holatractor1@gmail.com`);
    } catch (mailErr: any) {
      console.error("[Email Error]: Failed to send notification email:", mailErr.message);
    }

    return NextResponse.json(
      {
        success: true,
        applicationId,
        role,
        message:
          role === "dealer"
            ? "Solicitud de concesionario registrada con éxito."
            : "Solicitud de consulta de maquinaria registrada con éxito.",
        data: b2bPayload,
        emailNotification: {
          sent: emailSent,
          recipients: ["sistemas@holatractor.com", "holatractor1@gmail.com"],
          messageId: emailMessageId,
        },
        b2bSyncStatus,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[/api/leads/submit] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Error procesando la solicitud",
      },
      { status: 500 }
    );
  }
}

function isDealer(role: string): boolean {
  return role.toLowerCase() === "dealer";
}
