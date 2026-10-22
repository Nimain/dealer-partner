import nodemailer from "nodemailer";

export interface LeadSubmissionPayload {
  role: "dealer" | "owner";
  name: string;
  first_name?: string;
  last_name?: string;
  dealershipName?: string;
  farmName?: string;
  phone: string;
  email: string;
  district?: string;
  tractorCount?: string;
  applicationId: string;
  source?: string;
  createdAt?: string;
}

const GMAIL_USER = process.env.GMAIL_USER || "holatractor2@gmail.com";
const GMAIL_PASS = process.env.GMAIL_PASS || "kcuvrujirenlnnmj";
const TARGET_EMAILS = [
  "sistemas@holatractor.com",
  "holatractor1@gmail.com",
];

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

export async function sendLeadNotificationEmail(data: LeadSubmissionPayload) {
  const isDealer = data.role === "dealer";
  const roleTitle = isDealer
    ? "Concesionario Autorizado (Dealer)"
    : "Propietario de Maquinaria / Campo (Owner)";
  const entityLabel = isDealer ? "Concesionario / Empresa" : "Hacienda / Finca";
  const entityValue = data.dealershipName || data.farmName || "No especificado";
  const cleanPhone = data.phone.replace(/[^\d+]/g, "");

  const subject = `[Holatractor Lead] Nueva Solicitud de ${
    isDealer ? "Concesionario" : "Propietario"
  } - ${data.name} (${entityValue}) - Ref #${data.applicationId}`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    .header { background: linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #dc2626 100%); color: #ffffff; padding: 32px 28px; text-align: left; }
    .header h1 { margin: 0 0 6px 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 0; font-size: 13px; color: #fecaca; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; background: rgba(255,255,255,0.18); color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.5px; }
    .content { padding: 28px; }
    .summary-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 24px; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
    .row:last-child { border-bottom: none; }
    .label { color: #64748b; font-weight: 600; width: 40%; }
    .value { color: #0f172a; font-weight: 700; width: 60%; text-align: right; word-break: break-word; }
    .actions { display: flex; gap: 12px; margin-top: 24px; }
    .btn { display: inline-block; padding: 12px 20px; border-radius: 999px; text-decoration: none; font-size: 12px; font-weight: 700; text-align: center; }
    .btn-whatsapp { background: #059669; color: #ffffff !important; }
    .btn-call { background: #dc2626; color: #ffffff !important; }
    .footer { background: #f1f5f9; padding: 16px 28px; font-size: 11px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">${data.role.toUpperCase()} LEAD</div>
      <h1>Nueva Solicitud de Registro</h1>
      <p>Recibida a través del portal de concesionarios y propietarios de Holatractor</p>
    </div>

    <div class="content">
      <div class="summary-card">
        <div class="row">
          <span class="label">ID de Referencia:</span>
          <span class="value" style="color: #991b1b;">#${data.applicationId}</span>
        </div>
        <div class="row">
          <span class="label">Tipo de Solicitud:</span>
          <span class="value">${roleTitle}</span>
        </div>
        <div class="row">
          <span class="label">Nombre del Contacto:</span>
          <span class="value">${data.name}</span>
        </div>
        <div class="row">
          <span class="label">${entityLabel}:</span>
          <span class="value">${entityValue}</span>
        </div>
        <div class="row">
          <span class="label">Teléfono / WhatsApp:</span>
          <span class="value">${data.phone}</span>
        </div>
        <div class="row">
          <span class="label">Correo Electrónico:</span>
          <span class="value">${data.email}</span>
        </div>
        <div class="row">
          <span class="label">Ubicación / Territorio:</span>
          <span class="value">${data.district || "Bolivia (No especificado)"}</span>
        </div>
        <div class="row">
          <span class="label">Flota / Capacidad:</span>
          <span class="value">${data.tractorCount || "1-5 Tractores"}</span>
        </div>
        <div class="row">
          <span class="label">Fecha y Hora:</span>
          <span class="value">${new Date().toLocaleString("es-BO", { timeZone: "America/La_Paz" })}</span>
        </div>
        <div class="row">
          <span class="label">Origen:</span>
          <span class="value">${data.source || "Landing Page Modal"}</span>
        </div>
      </div>

      <div style="text-align: center; margin-top: 20px;">
        <a href="https://wa.me/${cleanPhone.replace('+', '')}?text=Hola%20${encodeURIComponent(data.name)}%2C%20le%20escribimos%20de%20Holatractor%20respecto%20a%20su%20solicitud%20${data.applicationId}" class="btn btn-whatsapp" style="margin-right: 8px;">
          💬 Chatear por WhatsApp
        </a>
        <a href="tel:${cleanPhone}" class="btn btn-call">
          📞 Llamar al Solicitante
        </a>
      </div>
    </div>

    <div class="footer">
      Holatractor Srl / Inc. • Notificación automática de captación de leads.<br/>
      Destinatarios configurados: sistemas@holatractor.com, holatractor1@gmail.com
    </div>
  </div>
</body>
</html>
  `;

  const info = await transporter.sendMail({
    from: `"Holatractor Portal" <${GMAIL_USER}>`,
    to: TARGET_EMAILS.join(", "),
    replyTo: data.email,
    subject,
    html: htmlContent,
    text: `Nueva Solicitud Holatractor (#${data.applicationId})\nTipo: ${roleTitle}\nNombre: ${data.name}\n${entityLabel}: ${entityValue}\nTeléfono: ${data.phone}\nEmail: ${data.email}\nUbicación: ${data.district}\nFlota: ${data.tractorCount}\nFecha: ${new Date().toISOString()}`,
  });

  return info;
}
