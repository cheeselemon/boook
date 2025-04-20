const fs = require('fs-extra');
const path = require('path');

async function convertExtension(directory, options) {
  try {
    const files = await fs.readdir(directory);
    
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = await fs.stat(filePath);
      
      if (stat.isFile() && file.toLowerCase().endsWith(`.${options.from}`)) {
        const newName = file.slice(0, -options.from.length) + options.to;
        const newPath = path.join(directory, newName);
        
        console.log(`Converting: ${file} -> ${newName}`);
        await fs.rename(filePath, newPath);
      }
    }
    
    console.log('Extension conversion completed successfully!');
  } catch (error) {
    console.error('Error during conversion:', error.message);
    process.exit(1);
  }
}

module.exports = { convertExtension }; 