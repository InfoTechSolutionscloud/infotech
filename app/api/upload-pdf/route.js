import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
    try {
        // Extract form data from the request
        const formData = await request.formData();
        const pdfFile = formData.get("pdf");

        // Log the received file for debugging
        console.log("Received PDF file:", pdfFile);

        // Check if the PDF file is provided
        if (!pdfFile) {
            console.log("No PDF file provided");
            return NextResponse.json({ message: "No PDF uploaded" }, { status: 400 });
        }

        // Check if the file size is greater than 10MB (10 * 1024 * 1024 bytes)
        const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
        if (pdfFile.size > MAX_SIZE) {
            console.log("File too large, size: ", pdfFile.size);
            return NextResponse.json({ message: "File size exceeds 10 MB" }, { status: 400 });
        }

        // Generate a unique filename for the uploaded PDF
        const timestamp = Date.now();
        const fileName = `upload-${timestamp}-${pdfFile.name}`;

        // Define the directory for storing uploaded files
        const uploadDir = path.join(process.cwd(), "public", "uploads");

        // Ensure the uploads directory exists, or create it if necessary
        if (!fs.existsSync(uploadDir)) {
            console.log("Creating uploads directory...");
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Construct the file path for saving the uploaded PDF
        const filePath = path.join(uploadDir, fileName);

        // Log the file path and size before saving
        console.log("Saving file to:", filePath);
        console.log("File size:", pdfFile.size);

        // Save the file to disk
        try {
            const fileBuffer = Buffer.from(await pdfFile.arrayBuffer());
            fs.writeFileSync(filePath, fileBuffer);
            console.log("File saved successfully!");
        } catch (writeError) {
            console.error("Error saving PDF file:", writeError);
            return NextResponse.json({ message: "Error saving PDF file" }, { status: 500 });
        }

        // Provide the public URL for the uploaded file
        const fileUrl = `/uploads/${fileName}`;

        return NextResponse.json(
            { message: "PDF uploaded successfully", url: fileUrl },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in upload-pdf handler:", error);
        return NextResponse.json(
            { message: "Error uploading PDF", error: error.message },
            { status: 500 }
        );
    }
}
