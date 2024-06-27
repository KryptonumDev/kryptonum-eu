import type { APIRoute } from 'astro';
import path from 'node:path'
import sharp from 'sharp';
import ico from 'sharp-ico';

const icon = path.resolve('src/assets/favicon.png');

export const GET: APIRoute = async () => {
  const buffer = await sharp(icon).resize(32).toFormat('png').toBuffer();
  const icoBuffer = ico.encode([buffer]);

  return new Response(icoBuffer, {
    headers: { 'Content-Type': 'image/x-icon' }
  })
}
