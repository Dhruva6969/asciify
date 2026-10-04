import { findArt } from '../lib/artLibrary.js';

export async function generateIdeaArt(prompt, style) {
  const result = findArt(prompt, style);
  if (result) {
    return { ...result, source: 'built-in library' };
  }

  const label = String(prompt || 'unknown concept').trim().slice(0, 28) || 'unknown concept';
  return {
    key: 'not-available',
    style: 'message',
    source: 'not available',
    art: `╔════════════════════════════════╗
║  ${label.toUpperCase().padEnd(28).slice(0, 28)}  ║
║                                ║
║  This idea is not available    ║
║  in the built-in library yet.  ║
║                                ║
║  Try cat, dog, dragon, robot,  ║
║  spaceship, skull, heart,      ║
║  tree, wizard, or rose.        ║
╚════════════════════════════════╝`
  };
}
