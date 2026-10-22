import { NextRequest, NextResponse } from "next/server";
import { POST as handleLeadSubmit } from "@/app/api/leads/submit/route";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const modifiedBody = { ...rawBody, role: "owner" };

    const clonedRequest = new NextRequest(request.url, {
      method: "POST",
      headers: request.headers,
      body: JSON.stringify(modifiedBody),
    });

    return handleLeadSubmit(clonedRequest);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Invalid payload" },
      { status: 400 }
    );
  }
}
