const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const framesDir = path.join(__dirname, 'frames');

async function compressFrames() {
    console.log('Starting compression...');
    const files = fs.readdirSync(framesDir).filter(f => f.endsWith('.png'));
    
    for (const file of files) {
        const inputPath = path.join(framesDir, file);
        const outputPath = path.join(framesDir, file.replace('.png', '.webp'));
        
        try {
            await sharp(inputPath)
                .webp({ quality: 60 }) // High compression, good enough for scroll animations
                .toFile(outputPath);
                
            // Delete the original PNG to save space
            fs.unlinkSync(inputPath);
            console.log(`Compressed ${file}`);
        } catch (err) {
            console.error(`Error compressing ${file}:`, err);
        }
    }
    
    console.log('Compression complete!');
}

compressFrames();
