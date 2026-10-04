export const CHARSETS = {
  classic: ' .`^",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@',
  blocks: ' ░▒▓█',
  minimal: ' .:#',
  terminal: ' .:-=+*#%@',
  glitch: ' ░▒▓█▀▄■□◆◇',
  dotted: ' ...,,,:::;;;!!!',
  symbols: ' .-~:;=!*#$@'
};

const EMOJI = ['⬜', '🟦', '🟩', '🟨', '🟧', '🟥', '⬛'];

export function imageToAscii(image, options = {}) {
  const { style = 'classic', cols = 90, density = 3, customChars = '' } = options;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const ratio = image.naturalHeight / image.naturalWidth || 1;
  const rows = Math.max(8, Math.round(cols * ratio * 0.45));

  canvas.width = cols;
  canvas.height = rows;
  ctx.drawImage(image, 0, 0, cols, rows);

  const data = ctx.getImageData(0, 0, cols, rows).data;
  if (style === 'emoji') return sampleEmoji(data, cols, rows);

  const chars = style === 'custom' && customChars.length > 1 ? customChars : (CHARSETS[style] || CHARSETS.classic);
  const contrast = Math.max(0.8, Math.min(1.35, 0.75 + Number(density || 3) * 0.12));
  let out = '';

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const i = (y * cols + x) * 4;
      const alpha = data[i + 3] / 255;
      let lum = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) * alpha;
      lum = Math.max(0, Math.min(255, (lum - 128) * contrast + 128));
      const idx = Math.min(chars.length - 1, Math.floor((lum / 255) * chars.length));
      out += chars[idx];
    }
    out += '\n';
  }

  return out;
}

export function textToAscii(text, options = {}) {
  const { style = 'classic', width = 72, customChars = '' } = options;
  const value = String(text || '').trim() || 'ASCIIFY';
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const cols = Math.max(24, Number(width || 72));
  const fontSize = Math.max(42, Math.min(150, Math.floor((cols * 8) / Math.max(3, value.length) * 1.35)));

  canvas.width = cols * 8;
  canvas.height = Math.ceil(fontSize * 1.45);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.font = `700 ${fontSize}px "Space Mono", "Courier New", monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(value, canvas.width / 2, canvas.height / 2);

  return canvasToAscii(canvas, { style, cols, customChars });
}

function canvasToAscii(canvas, options) {
  const { style, cols, customChars } = options;
  const tmp = document.createElement('canvas');
  const rows = Math.max(8, Math.round((canvas.height / canvas.width) * cols * 0.52));
  tmp.width = cols;
  tmp.height = rows;

  const tctx = tmp.getContext('2d', { willReadFrequently: true });
  tctx.drawImage(canvas, 0, 0, cols, rows);
  const data = tctx.getImageData(0, 0, cols, rows).data;

  if (style === 'emoji') return sampleEmoji(data, cols, rows);

  const chars = style === 'custom' && customChars.length > 1 ? customChars : (CHARSETS[style] || CHARSETS.classic);
  let out = '';

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = (y * cols + x) * 4;
      const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      out += chars[Math.min(chars.length - 1, Math.floor((lum / 255) * chars.length))];
    }
    out += '\n';
  }

  return out;
}

function sampleEmoji(data, cols, rows) {
  let out = '';
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x += 2) {
      const i = (y * cols + x) * 4;
      const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      out += EMOJI[Math.min(EMOJI.length - 1, Math.floor((lum / 255) * EMOJI.length))];
    }
    out += '\n';
  }
  return out;
}

export function asciiToPngBlob(ascii, options = {}) {
  const { color = '#00ff66', background = '#000000', fontSize = 13 } = options;
  const lines = String(ascii || '').split('\n');
  const longest = Math.max(1, ...lines.map(line => line.length));
  const charWidth = fontSize * 0.62;
  const lineHeight = fontSize * 1.25;
  const canvas = document.createElement('canvas');

  canvas.width = Math.ceil(longest * charWidth + 32);
  canvas.height = Math.ceil(lines.length * lineHeight + 32);

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.font = `${fontSize}px "Space Mono", "Courier New", monospace`;
  ctx.textBaseline = 'top';
  lines.forEach((line, index) => ctx.fillText(line, 16, 16 + index * lineHeight));

  return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
}
