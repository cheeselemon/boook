const fs = require('fs-extra');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const sharp = require('sharp');

async function createPdf(directory, options) {
  try {
    const files = await fs.readdir(directory);
    const imageFiles = files
      .filter(file => file.toLowerCase().endsWith('.png'))
      .sort((a, b) => {
        // Sort numerically (001.png comes before 002.png)
        const numA = parseInt(path.parse(a).name);
        const numB = parseInt(path.parse(b).name);
        return numA - numB;
      });

    if (imageFiles.length === 0) {
      throw new Error('No PNG files found in the directory');
    }

    const pdfDoc = await PDFDocument.create();
    
    for (const file of imageFiles) {
      const filePath = path.join(directory, file);
      console.log(`Processing: ${file}`);
      
      // Optimize and convert image to buffer
      const imageBuffer = await sharp(filePath)
        .png({ 
          quality: 85,
          compressionLevel: 9,
          palette: true
        })
        .resize({
          width: 2480,  // A4 size at 300 DPI
          height: 3508,
          fit: 'inside',
          withoutEnlargement: true
        })
        .toBuffer();
      
      // Convert to PDF compatible format
      const image = await pdfDoc.embedPng(imageBuffer);
      const page = pdfDoc.addPage([image.width, image.height]);
      
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
    }

    // Ensure output directory exists
    await fs.ensureDir(path.dirname(options.output));
    
    // Save PDF with compression
    const pdfBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      compress: true
    });
    await fs.writeFile(options.output, pdfBytes);
    
    console.log(`PDF created successfully at: ${options.output}`);
  } catch (error) {
    console.error('Error creating PDF:', error.message);
    process.exit(1);
  }
}

module.exports = { createPdf }; 