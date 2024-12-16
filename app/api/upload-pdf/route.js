import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const pdfFile = formData.get("pdf");

        if (!pdfFile) {
            return NextResponse.json({ message: "No PDF uploaded" }, { status: 400 });
        }

        // Get the original file name
        const fileName = pdfFile.name;

        // Define the upload directory (make sure this directory exists on the server)
        const uploadDir = path.join(process.cwd(), "uploads"); // This will store files in the "uploads" directory

        // Ensure the directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Create a write stream to store the uploaded PDF file
        const filePath = path.join(uploadDir, fileName);

        const writableStream = fs.createWriteStream(filePath);

        // Pipe the uploaded PDF to the local server
        pdfFile.stream().pipe(writableStream);

        writableStream.on("finish", () => {
            return NextResponse.json({
                message: "PDF uploaded successfully",
                url: `/uploads/${fileName}`, // You can return the file URL if needed
            }, { status: 200 });
        });

        writableStream.on("error", (error) => {
            console.error("Error saving PDF file:", error.message);
            return NextResponse.json({ message: "Error uploading PDF", error: error.message }, { status: 500 });
        });
        
    } catch (error) {
        console.error("Error uploading PDF:", error.message);
        return NextResponse.json({ message: "Error uploading PDF", error: error.message }, { status: 500 });
    }
}
