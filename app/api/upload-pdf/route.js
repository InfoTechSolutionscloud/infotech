import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const pdfFile = formData.get("pdf");

        if (!pdfFile) {
            console.log("No PDF file uploaded.");
            return NextResponse.json({ message: "No PDF uploaded" }, { status: 400 });
        }

        const timestamp = Date.now();
        const fileName = `upload-${timestamp}-${pdfFile.name}`;
        const uploadDir = path.join(process.cwd(), "public", "uploads");

        // Ensure the directory exists, or create it if necessary
        if (!fs.existsSync(uploadDir)) {
            console.log("Creating uploads directory...");
            try {
                fs.mkdirSync(uploadDir, { recursive: true });
                console.log("Uploads directory created successfully.");
            } catch (error) {
                console.error("Error creating uploads directory:", error);
                return NextResponse.json({ message: "Error creating uploads directory" }, { status: 500 });
            }
        }

        // Define the file path
        const filePath = path.join(uploadDir, fileName);
        const fileBuffer = Buffer.from(await pdfFile.arrayBuffer());

        // Log before saving the file
        console.log("Saving file to:", filePath);
        console.log("File size:", pdfFile.size);

        // Save the file to disk
        try {
            fs.writeFileSync(filePath, fileBuffer);
            console.log("File saved successfully!");
        } catch (error) {
            console.error("Error saving PDF file:", error);
            return NextResponse.json({ message: "Error saving PDF file" }, { status: 500 });
        }

        // Provide the public URL for the uploaded file
        const fileUrl = `/uploads/${fileName}`;
        return NextResponse.json({ message: "PDF uploaded successfully", url: fileUrl }, { status: 200 });

    } catch (error) {
        console.error("Error in upload-pdf handler:", error);
        return NextResponse.json({ message: "Error uploading PDF", error: error.message }, { status: 500 });
    }
}
