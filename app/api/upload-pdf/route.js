export async function POST(request) {
    try {
        const formData = await request.formData();
        const pdfFile = formData.get("pdf");

        if (!pdfFile) {
            console.error("No PDF file uploaded.");
            return NextResponse.json({ message: "No PDF uploaded" }, { status: 400 });
        }

        const timestamp = Date.now();
        const fileName = `upload-${timestamp}-${pdfFile.name}`;

        const uploadDir = path.join(process.cwd(), "public", "uploads");

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, fileName);
        const fileBuffer = Buffer.from(await pdfFile.arrayBuffer());
        fs.writeFileSync(filePath, fileBuffer);

        const fileUrl = `/uploads/${fileName}`;
        return NextResponse.json({ message: "PDF uploaded successfully", url: fileUrl }, { status: 200 });
    } catch (error) {
        console.error("Error in PDF upload:", error);
        return NextResponse.json({ message: "Error uploading PDF", error: error.message }, { status: 500 });
    }
}
