import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.resolve(__dirname, '../public/assets');

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        const baseName = path.basename(entry.name, ext);
        const webpPath = path.join(dir, `${baseName}.webp`);

        const metadata = await sharp(fullPath).metadata();
        const originalSize = fs.statSync(fullPath).size;

        let pipeline = sharp(fullPath);
        
        if (metadata.width && metadata.width > 900 && dir.includes('outfits')) {
          pipeline = pipeline.resize({ width: 900, withoutEnlargement: true });
        } else if (metadata.width && metadata.width > 1400) {
          pipeline = pipeline.resize({ width: 1400, withoutEnlargement: true });
        }

        await pipeline
          .webp({ quality: 82, effort: 6 })
          .toFile(webpPath);

        const newSize = fs.statSync(webpPath).size;
        console.log(`✓ ${path.relative(assetsDir, fullPath)}: ${(originalSize / 1024).toFixed(1)} KB -> ${(newSize / 1024).toFixed(1)} KB (${Math.round((1 - newSize / originalSize) * 100)}% saved)`);
      }
    }
  }
}

console.log('Optimizing images in:', assetsDir);
processDirectory(assetsDir)
  .then(() => console.log('Image optimization complete!'))
  .catch((err) => {
    console.error('Error optimizing images:', err);
    process.exit(1);
  });
