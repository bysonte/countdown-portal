/**
 * Incrementally optimizes photos in public/album → public/album/web
 * Skips files already converted. Run again anytime new photos are added.
 * Usage: node scripts/optimize-photos.mjs
 */
import sharp from 'sharp';
import heicConvert from 'heic-convert';
import { readdir, readFile, mkdir } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT_DIR = join(__dirname, '..', 'public', 'album');
const OUTPUT_DIR = join(__dirname, '..', 'public', 'album', 'web');
const MAX_WIDTH = 1440;
const QUALITY = 82;

const HEIC_EXTS = new Set(['.heic', '.heif']);
const SUPPORTED = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif', '.heic', '.heif']);

function outputName(file) {
  return basename(file, extname(file)).replace(/[^a-z0-9_-]/gi, '_');
}

async function toBuffer(file) {
  const ext = extname(file).toLowerCase();
  if (HEIC_EXTS.has(ext)) {
    const input = await readFile(file);
    const jpegBuffer = await heicConvert({ buffer: input, format: 'JPEG', quality: 0.95 });
    return Buffer.from(jpegBuffer);
  }
  return file;
}

async function run() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const [allFiles, doneFiles] = await Promise.all([
    readdir(INPUT_DIR),
    readdir(OUTPUT_DIR).catch(() => []),
  ]);

  const done = new Set(doneFiles.map(f => basename(f, extname(f))));
  const photos = allFiles.filter(f => SUPPORTED.has(extname(f).toLowerCase()));
  const pending = photos.filter(f => !done.has(outputName(f)));
  const skipped = photos.length - pending.length;

  console.log(`${photos.length} total photos — ${skipped} already done, ${pending.length} to process\n`);
  if (pending.length === 0) { console.log('Nothing to do.'); return; }

  let ok = 0, failed = 0;

  for (const file of pending) {
    const input = join(INPUT_DIR, file);
    const name = outputName(file);
    const output = join(OUTPUT_DIR, `${name}.webp`);

    process.stdout.write(`  ${file} → ${name}.webp ... `);
    try {
      const source = await toBuffer(input);
      const { width, height } = await sharp(source)
        .rotate()
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 4 })
        .toFile(output);

      console.log(`✓  ${width}×${height}`);
      ok++;
    } catch (err) {
      console.log(`✗  ${String(err.message).split('\n')[0]}`);
      failed++;
    }
  }

  console.log(`\nDone: ${ok} new, ${failed} failed, ${skipped} skipped`);
}

run().catch(err => { console.error(err); process.exit(1); });
