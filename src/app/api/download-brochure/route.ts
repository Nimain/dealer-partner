import { NextRequest, NextResponse, connection } from "next/server";
import fs from "fs";
import path from "path";

const S3_BROCHURE_URL =
  "https://holadashboard.s3.us-west-2.amazonaws.com/holatractor-dealer-brochure.pdf";

export async function GET(request: NextRequest) {
  await connection();

  try {
    // 1. Fetch official brochure from S3
    const s3Res = await fetch(S3_BROCHURE_URL);

    if (s3Res.ok) {
      const pdfBuffer = await s3Res.arrayBuffer();
      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="holatractor-dealer-brochure.pdf"',
          "Cache-Control": "public, max-age=3600",
        },
      });
    }
  } catch (err) {
    console.warn("Could not fetch brochure from S3, using local fallback:", err);
  }

  // 2. Reliable fallback to local public directory copy
  try {
    const localFilePath = path.join(
      process.cwd(),
      "public",
      "holatractor-dealer-brochure.pdf"
    );
    if (fs.existsSync(localFilePath)) {
      const fileBuffer = fs.readFileSync(localFilePath);
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="holatractor-dealer-brochure.pdf"',
          "Cache-Control": "public, max-age=3600",
        },
      });
    }
  } catch (localErr) {
    console.error("Local brochure file fallback failed:", localErr);
  }

  return NextResponse.json({ error: "Brochure file unavailable" }, { status: 404 });
}
