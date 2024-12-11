
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const pdfFile = formData.get("pdf");

        if (!pdfFile) {
            return NextResponse.json({ message: "No pdf uploaded" }, { status: 400 });
        }

        // Convert the pdf file to a buffer
        const buffer = await pdfFile.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        // pdf API request
        const response = await axios.post("https://api.pdfur.com/3/pdf", {
            pdf: base64pdf,
            type: "base64",
        }, {
            headers: {
                Authorization: `Client-ID ${process.env.PDFUR_CLIENT_ID}`,
            },
        });

        if (response.data.success) {
            return NextResponse.json({ message: "Pdf uploaded successfully", url: response.data.data.link }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Pdf upload failed" }, { status: 500 });
        }
    } catch (error) {
        console.error(error.message);
        return NextResponse.json({ message: "Error uploading Pdf", error: error.message }, { status: 500 });
    }
}
