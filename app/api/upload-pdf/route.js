import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
    try {
        // Parse form data
        const formData = await request.formData();
        const pdfFile = formData.get("pdf");

        // Validate if the file is provided
        if (!pdfFile) {
            return NextResponse.json({ message: "No PDF uploaded" }, { status: 400 });
        }

        // Validate file type
        if (pdfFile.type !== "application/pdf") {
            return NextResponse.json({ message: "Invalid file type. Only PDFs are allowed." }, { status: 400 });
        }

        // Validate file size (limit to 10 MB)
        const MAX_SIZE = 10 * 1024 * 1024; // 10 MB in bytes
        if (pdfFile.size > MAX_SIZE) {
            return NextResponse.json(
                { message: "File size exceeds the 10 MB limit." },
                { status: 400 }
            );
        }

        // Generate a unique filename
        const timestamp = Date.now();
        const fileName = `upload-${timestamp}-${pdfFile.name}`;

        // Define the uploads directory
        const uploadDir = path.join(process.cwd(), "/public/uploads");

        // Ensure the directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Write the PDF file to the disk
        const filePath = path.join(uploadDir, fileName);
        const fileBuffer = Buffer.from(await pdfFile.arrayBuffer());
        fs.writeFileSync(filePath, fileBuffer);

        // Generate the public URL
        const fileUrl = `/uploads/${fileName}`;

        return NextResponse.json(
            { message: "PDF uploaded successfully", url: fileUrl },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error uploading PDF:", error);
        return NextResponse.json(
            { message: "Error uploading PDF", error: error.message },
            { status: 500 }
        );
    }
}
