import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
    try {
        // Get the form data
        const formData = await request.formData();
        const pdfFile = formData.get("pdf");

        if (!pdfFile) {
            return NextResponse.json({ message: "No PDF uploaded" }, { status: 400 });
        }

        console.log("Received PDF file:", pdfFile);

        // Generate a unique filename for the PDF
        const timestamp = Date.now();
        const fileName = `upload-${timestamp}-${pdfFile.name}`;

        // Define the upload directory in public folder
        const uploadDir = path.join(process.cwd(), "public", "uploads");

        // Log the directory path to verify
        console.log("Upload directory:", uploadDir);

        // Ensure the directory exists
        if (!fs.existsSync(uploadDir)) {
            console.log("Creating uploads directory...");
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Construct the file path
        const filePath = path.join(uploadDir, fileName);

        // Get the file buffer and write to disk
        const fileBuffer = Buffer.from(await pdfFile.arrayBuffer());

        // Save the file
        fs.writeFileSync(filePath, fileBuffer);

        // Check if file was saved
        if (fs.existsSync(filePath)) {
            console.log("File successfully saved at:", filePath);
        } else {
            console.error("Failed to save file at:", filePath);
        }

        // Provide the public URL
        const fileUrl = `/uploads/${fileName}`;

        return NextResponse.json({ message: "PDF uploaded successfully", url: fileUrl }, { status: 200 });
    } catch (error) {
        console.error("Error uploading PDF:", error);
        return NextResponse.json({ message: "Error uploading PDF", error: error.message }, { status: 500 });
    }
}
