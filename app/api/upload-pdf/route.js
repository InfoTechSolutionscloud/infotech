import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
    try {
        // Extract form data from the request
        const formData = await request.formData();
        const pdfFile = formData.get("pdf");

        // Check if the PDF file is provided
        if (!pdfFile) {
            return NextResponse.json({ message: "No PDF uploaded" }, { status: 400 });
        }

        console.log("Received PDF file:", pdfFile);

        // Generate a unique filename for the uploaded PDF
        const timestamp = Date.now();
        const fileName = `upload-${timestamp}-${pdfFile.name}`;

        // Define the directory for storing uploaded files
        const uploadDir = path.join(process.cwd(), "/public/uploads");

        // Ensure the uploads directory exists, or create it if necessary
        if (!fs.existsSync(uploadDir)) {
            console.log("Creating uploads directory...");
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Construct the file path for saving the uploaded PDF
        const filePath = path.join(uploadDir, fileName);

        // Save the file to disk
        try {
            const fileBuffer = Buffer.from(await pdfFile.arrayBuffer());
            fs.writeFileSync(filePath, fileBuffer);
        } catch (error) {
            console.error("Error saving PDF file:", error);
            return NextResponse.json({ message: "Error saving PDF file" }, { status: 500 });
        }

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
