import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const pdfFile = formData.get("pdf");

        // Check if PDF is uploaded
        if (!pdfFile) {
            return NextResponse.json({ message: "No PDF uploaded" }, { status: 400 });
        }

        // Validate the uploaded file is a PDF
        if (!pdfFile.type || !pdfFile.type.includes("pdf")) {
            return NextResponse.json({ message: "Invalid file type" }, { status: 400 });
        }

        const timestamp = Date.now();
        const fileName = `upload-${timestamp}-${pdfFile.name}`;
        const uploadDir = path.join(process.cwd(), "public", "uploads");

        // Ensure directory exists
        await fs.mkdir(uploadDir, { recursive: true });

        const filePath = path.join(uploadDir, fileName);
        const fileBuffer = Buffer.from(await pdfFile.arrayBuffer());

        // Write file to the disk
        await fs.writeFile(filePath, fileBuffer);

        return NextResponse.json({ message: "PDF uploaded successfully", filePath: `/uploads/${fileName}` }, { status: 200 });
    } catch (error) {
        // Log error with more details
        console.error("Error uploading PDF:", error);

        // Send a detailed error response
        return NextResponse.json({ message: "Error uploading PDF", error: error.message }, { status: 500 });
    }
}
