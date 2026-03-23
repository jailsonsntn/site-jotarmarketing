import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDirectory = path.resolve(__dirname, "../public/uploads");

const images = [
  "2dcc7432-8798-4ae1-b564-16c9f42cc0d1.png",
  "afc8e4c9-8c5e-4f3f-ac82-553b02a37d51.png",
  "fc9645a5-0ea8-413a-aa15-5ded98d3c7ee.png",
];

const variants = [
  { extension: "avif", formatter: (image) => image.avif({ quality: 52 }) },
  { extension: "webp", formatter: (image) => image.webp({ quality: 82 }) },
];

for (const imageName of images) {
  const inputPath = path.join(uploadsDirectory, imageName);

  for (const variant of variants) {
    const outputPath = path.join(
      uploadsDirectory,
      imageName.replace(/\.png$/i, `.${variant.extension}`)
    );

    await variant.formatter(sharp(inputPath)).toFile(outputPath);
  }
}

console.log(`Optimized ${images.length} images into AVIF and WebP.`);