import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const siteRecentsDirectory = path.resolve(__dirname, '../src/assets/sites-recentes');

const images = [
  'www.masterpiscinaslitoral.com.br.png',
  'joaocolussiadvocacia.com.br.png',
  'www.correahousesmobiliados.com.br.png',
  'www.tvdecor.com.py.png',
  'www.coworkingsaudetherapi.com.br.png',
];

for (const imageName of images) {
  const inputPath = path.join(siteRecentsDirectory, imageName);
  const outputPath = path.join(siteRecentsDirectory, imageName.replace(/\.png$/i, '.webp'));

  await sharp(inputPath)
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 68 })
    .toFile(outputPath);
}

console.log(`Optimized ${images.length} site screenshots to WebP.`);