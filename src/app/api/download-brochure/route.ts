import { NextRequest, NextResponse, connection } from "next/server";
import fs from "fs";
import path from "path";

const S3_SPANISH_BROCHURE_URL =
  "https://holadashboard.s3.us-west-2.amazonaws.com/holatractor-dealer-brochure.pdf";

export async function GET(request: NextRequest) {
  await connection();

  const { searchParams } = new URL(request.url);
  const lang = (searchParams.get("lang") || "es").toLowerCase();
  const isEnglish = lang === "en" || lang === "english";

  const filename = isEnglish
    ? "holatractor-dealer-brochure-en.pdf"
    : "holatractor-dealer-brochure-es.pdf";

  // 1. If English requested, serve local English edition
  if (isEnglish) {
    const enLocalPath = path.join(
      process.cwd(),
      "public",
      "holatractor-dealer-brochure-en.pdf"
    );
    if (fs.existsSync(enLocalPath)) {
      const fileBuffer = fs.readFileSync(enLocalPath);
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Cache-Control": "public, max-age=3600",
        },
      });
    }
  }

  // 2. For Spanish edition, attempt S3 fetch first
  try {
    const s3Res = await fetch(S3_SPANISH_BROCHURE_URL);
    if (s3Res.ok) {
      const pdfBuffer = await s3Res.arrayBuffer();
      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Cache-Control": "public, max-age=3600",
        },
      });
    }
  } catch (err) {
    console.warn("Could not fetch Spanish brochure from S3, falling back to local file:", err);
  }

  // 3. Fallback to local Spanish brochure file
  const esLocalPath = path.join(
    process.cwd(),
    "public",
    "holatractor-dealer-brochure-es.pdf"
  );
  const fallbackPath = path.join(
    process.cwd(),
    "public",
    "holatractor-dealer-brochure.pdf"
  );

  const localFileToServe = fs.existsSync(esLocalPath) ? esLocalPath : fallbackPath;
  if (fs.existsSync(localFileToServe)) {
    const fileBuffer = fs.readFileSync(localFileToServe);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  return NextResponse.json({ error: "Brochure file unavailable" }, { status: 404 });
}
