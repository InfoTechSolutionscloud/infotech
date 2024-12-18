import formidable from "formidable";
import fs from "fs";

export const config = {
    api: {
        bodyParser: false, // Disable default body parsing
    },
};

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const form = new formidable.IncomingForm();
    form.uploadDir = "./public/uploads"; // Directory to save uploaded PDFs
    form.keepExtensions = true; // Keep file extensions

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error("Error parsing form:", err);
            return res.status(500).json({ message: "Failed to upload PDF" });
        }

        const uploadedFile = files.pdf;
        if (!uploadedFile) {
            return res.status(400).json({ message: "No PDF file uploaded" });
        }

        const newPath = `./public/uploads/${uploadedFile.newFilename}`;
        fs.renameSync(uploadedFile.filepath, newPath);

        return res.status(200).json({
            message: "PDF uploaded successfully",
            url: `/uploads/${uploadedFile.newFilename}`,
        });
    });
}
