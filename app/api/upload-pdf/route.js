
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const imageFile = formData.get("image");

        if (!imageFile) {
            return NextResponse.json({ message: "No image uploaded" }, { status: 400 });
        }

        // Convert the image file to a buffer
        const buffer = await imageFile.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        // Imgur API request
        const response = await axios.post("https://api.imgur.com/3/image", {
            image: base64Image,
            type: "base64",
        }, {
            headers: {
                Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
            },
        });

        if (response.data.success) {
            return NextResponse.json({ message: "Image uploaded successfully", url: response.data.data.link }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Image upload failed" }, { status: 500 });
        }
    } catch (error) {
        console.error(error.message);
        return NextResponse.json({ message: "Error uploading image", error: error.message }, { status: 500 });
    }
}
