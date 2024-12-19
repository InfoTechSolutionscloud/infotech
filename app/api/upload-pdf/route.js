// pages/api/upload-pdf.js

import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Get file from request
      const formData = await req.formData();
      const pdfFile = formData.get('pdf');
      
      if (!pdfFile) {
        return res.status(400).json({ message: 'No PDF uploaded' });
      }

      // Define path and save the file
      const timestamp = Date.now();
      const fileName = `upload-${timestamp}-${pdfFile.name}`;
      const uploadDir = path.join(process.cwd(), 'public/uploads/pdf');

      // Ensure the uploads directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, fileName);
      const fileBuffer = Buffer.from(await pdfFile.arrayBuffer());

      // Save the PDF file
      fs.writeFileSync(filePath, fileBuffer);

      return res.status(200).json({
        message: 'PDF uploaded successfully',
        url: `/uploads/pdf/${fileName}`,
      });
    } catch (error) {
      console.error('Error uploading PDF:', error);
      return res.status(500).json({ message: 'Error uploading PDF', error: error.message });
    }
  } else {
    // Method not allowed for non-POST requests
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
