import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
    try {
        // Extract form data
        const formData = await request.formData();
        const pdfFile = formData.get("pdf");

        // Check if the file is provided
        if (!pdfFile) {
            return NextResponse.json({ message: "No PDF uploaded" }, { status: 400 });
        }

        // Validate file type (ensure it's a PDF)
        if (pdfFile.type !== "application/pdf") {
            return NextResponse.json({ message: "Only PDF files are allowed" }, { status: 400 });
        }

        // Limit file size to 10 MB (10 * 1024 * 1024 bytes)
        if (pdfFile.size > 10 * 1024 * 1024) {
            return NextResponse.json({ message: "File size exceeds 10 MB limit" }, { status: 400 });
        }

        // Generate a unique filename
        const timestamp = Date.now();
        const fileName = `upload-${timestamp}-${pdfFile.name}`;

        // Define the directory for storing uploaded files
        const uploadDir = path.join(process.cwd(), "/public/uploads");

        // Ensure the uploads directory exists
        if (!fs.existsSync(uploadDir)) {
            console.log("Creating uploads directory...");
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Construct the file path
        const filePath = path.join(uploadDir, fileName);

        // Save the file to disk
        const fileBuffer = Buffer.from(await pdfFile.arrayBuffer());
        fs.writeFileSync(filePath, fileBuffer);

        // Provide the public URL for the uploaded file
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
