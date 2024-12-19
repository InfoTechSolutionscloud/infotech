import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const pdfFile = formData.get("pdf");

        if (!pdfFile) {
            return NextResponse.json({ message: "No PDF uploaded" }, { status: 400 });
        }

        // Validate file type
        if (pdfFile.type !== "application/pdf") {
            return NextResponse.json({ message: "Invalid file type" }, { status: 400 });
        }

        console.log("Received PDF file:", pdfFile.name, pdfFile.type);

        const timestamp = Date.now();
        const fileName = `upload-${timestamp}-${pdfFile.name}`;
        const uploadDir = path.join(process.cwd(), "/public/uploads");

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, fileName);

        try {
            const fileBuffer = Buffer.from(await pdfFile.arrayBuffer());
            fs.writeFileSync(filePath, fileBuffer);
        } catch (error) {
            console.error("Error saving PDF file:", error);
            return NextResponse.json({ message: "Error saving PDF file" }, { status: 500 });
        }

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
