import sharp from 'sharp';
import { readdirSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function optimizeFolder(dirRelative, maxWidth = 900, quality = 78) {
  const dir = path.join(__dirname, dirRelative);
  if (!existsSync(dir)) return;

  const files = readdirSync(dir);
  for (const file of files) {
    if (!/\.(png|jpe?g)$/i.test(file)) continue;
    const inputPath = path.join(dir, file);
    const outputPath = path.join(dir, file.replace(/\.(png|jpe?g)$/i, '.webp'));
    
    await sharp(inputPath)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality })
      .toFile(outputPath);
    
    console.log(`Converted: ${file} -> ${path.basename(outputPath)}`);
  }
}

async function main() {
  console.log('Optimizing outfits...');
  await optimizeFolder('public/assets/outfits', 900, 78);

  console.log('Optimizing main assets...');
  await optimizeFolder('public/assets', 1200, 80);

  console.log('Image optimization complete!');
}

main().catch(console.error);
