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

        // Define the upload directory in the project's root folder (ensures compatibility with deployment environments)
        const uploadDir = path.join(process.cwd(), "uploads");

        // Ensure the directory exists or create it
        try {
            if (!fs.existsSync(uploadDir)) {
                console.log("Creating uploads directory...");
                fs.mkdirSync(uploadDir, { recursive: true });
            }
        } catch (dirError) {
            console.error("Failed to create uploads directory:", dirError);
            return NextResponse.json({ message: "Error creating uploads directory" }, { status: 500 });
        }

        // Construct the file path
        const filePath = path.join(uploadDir, fileName);

        // Get the file buffer and write to disk
        try {
            const fileBuffer = Buffer.from(await pdfFile.arrayBuffer());
            fs.writeFileSync(filePath, fileBuffer);
        } catch (writeError) {
            console.error("Error writing file to disk:", writeError);
            return NextResponse.json({ message: "Error saving PDF file" }, { status: 500 });
        }

        // Provide the public URL (modify according to your deployment setup)
        const fileUrl = `/uploads/${fileName}`;

        return NextResponse.json({ message: "PDF uploaded successfully", url: fileUrl }, { status: 200 });
    } catch (error) {
        console.error("Error uploading PDF:", error);
        return NextResponse.json({ message: "Error uploading PDF", error: error.message }, { status: 500 });
    }
}
