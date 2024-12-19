// pages/api/serve-pdf.js
import fs from 'fs';
import path from 'path';
import { NextApiResponse } from 'next';

export default async function handler(req, res) {
  const { path: filePath } = req.query; // Get the file path from the URL

  const file = path.resolve(process.cwd(), 'public/uploads/pdf', filePath);
  if (fs.existsSync(file)) {
    res.sendFile(file); // Serve the file
  } else {
    res.status(404).json({ message: 'File not found' });
  }
}
