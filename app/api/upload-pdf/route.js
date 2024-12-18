import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
    try {
        // Get the form data
        const formData = await request.formData();
        const pdfFile = formData.get("pdf");

        // Check if a PDF file was provided
        if (!pdfFile) {
            return NextResponse.json({ message: "No PDF uploaded" }, { status: 400 });
        }

        // Generate a unique filename for the PDF
        const timestamp = Date.now();
        const fileName = `upload-${timestamp}-${pdfFile.name}`;
        
        // Define the directory where files will be stored
        const uploadDir = path.join(process.cwd(), "uploads");
        
        // Log the directory path for debugging
        console.log("Upload directory:", uploadDir);
        
        // Ensure the directory exists
        if (!fs.existsSync(uploadDir)) {
            console.log("Creating uploads directory...");
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Create a file path
        const filePath = path.join(uploadDir, fileName);

        // Read the file buffer from the FormData
        const fileBuffer = Buffer.from(await pdfFile.arrayBuffer());

        // Write the file to the server
        fs.writeFileSync(filePath, fileBuffer);

        return NextResponse.json({ message: "PDF uploaded successfully", filePath }, { status: 200 });
    } catch (error) {
        console.error("Error uploading PDF:", error);
        return NextResponse.json({ message: "Error uploading PDF", error: error.message }, { status: 500 });
    }
}
