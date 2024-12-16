
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const pdfFile = formData.get("pdf");

        if (!pdfFile) {
            return NextResponse.json({ message: "No image uploaded" }, { status: 400 });
        }

        // Convert the image file to a buffer
        const buffer = await pdfFile.arrayBuffer();
        const base64pdf = Buffer.from(buffer).toString("base64");

      const response = await axios.post("https://api.pdfur.com/3/pdf", {
            pdf: base64Pdf, // Corrected variable name for PDF
            type: "base64",
        }, {
            headers: {
                Authorization: `Client-ID ${process.env.PDFUR_CLIENT_ID}`,
            },
        });

        // Check if the API response was successful
        if (response.data.success) {
            return NextResponse.json({ message: "PDF uploaded successfully", url: response.data.data.link }, { status: 200 });
        } else {
            return NextResponse.json({ message: "PDF upload failed" }, { status: 500 });
        }
    } catch (error) {
        // Log the error for debugging
        console.error("Error uploading PDF:", error.message);
        return NextResponse.json({ message: "Error uploading PDF", error: error.message }, { status: 500 });
    }
}
