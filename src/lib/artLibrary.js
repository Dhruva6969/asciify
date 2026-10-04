const RAW_LIBRARY = {
  cat: {
    aliases: ['kitten', 'kitty', 'neko', 'cyberpunk cat'],
    styles: {
      classic: String.raw` /\_/\
( o.o )
 > ^ <`,
      blocks: String.raw` ▄▄▄▄▄
█ o o █
█  ▴  █
▀▀▀▀▀`,
      minimal: String.raw`/\_/\
(• •)
 >^<`,
      terminal: String.raw`┌─────────┐
│ /\_/\  │
│( o.o ) │
│ > ^ <  │
└─────────┘`,
      glitch: String.raw`/\_/\ ░▒▓
( ◉.◉ ) ▓▒░
 > ▒ <`,
      dotted: String.raw` .:::.
:.o o.:
:. ^ .:
 ':::'`,
      symbols: String.raw`@/\_/\@
(@) (@)
 { ^ }`,
      emoji: String.raw`😺😺😺
😺 👁 👁 😺
😺  👃  😺`
    }
  },
  dog: {
    aliases: ['puppy', 'doggo', 'woof'],
    styles: {
      classic: String.raw` / \__
(    @\___
/         O
/   (_____/
/_____/   U`,
      blocks: String.raw` ▄▄▄▄▄▄
█ ●  ● █
█  ▾   █
▀█▄▄▄█▀`,
      minimal: String.raw`/ \__
(• •)
( U )`,
      terminal: String.raw`┌──────────┐
│ / \__    │
│( ^ ^ )   │
│ ( U )    │
└──────────┘`,
      glitch: String.raw`/\_/\ ▓▒░
(°v°) ░▒▓
 {U}`,
      dotted: String.raw`..:::..
: o o :
:  U  :`,
      symbols: String.raw`/\_/\
(@ @)
{ U }`,
      emoji: String.raw`🐶🐶🐶
🐶 👁 👁 🐶
🐶  👅  🐶`
    }
  },
  dragon: {
    aliases: ['wyvern', 'serpent', 'fire dragon'],
    styles: {
      classic: String.raw`      /\   /\
     /  \_/  \
    (  o   o  )
     \  ---  /
   ___/|___|\___`,
      blocks: String.raw`  ▄█▄     ▄█▄
 ███████████
 ██▀███▀███
  ▀██████▀`,
      minimal: String.raw`/\   /\
( o o )
 \ V /`,
      terminal: String.raw`╔════════════╗
║  DRAGON    ║
║ /\  ___ /\ ║
║( o)___(o )║
╚════════════╝`,
      glitch: String.raw`▓▒░ DRAGON ░▒▓
/\ ░▒▓ /\
(◉)▓▒░(◉)`,
      dotted: String.raw`.::::::::.
:: o   o ::
 ':.___.:'`,
      symbols: String.raw`@@@ DRAGON @@@
/@\ * * /@\
  \==V==/`,
      emoji: String.raw`🔥🐉🔥🐉🔥
🐉 👁 👁 🐉
🔥🐉🔥🐉🔥`
    }
  },
  robot: {
    aliases: ['bot', 'android', 'cyborg', 'mech'],
    styles: {
      classic: String.raw`  _______
 | o   o |
 |   ^   |
 | [===] |
  -------`,
      blocks: String.raw`███████
█ ▄ ▄ █
█  ▴  █
███████`,
      minimal: String.raw`[ o o ]
[  ^  ]
[_____]`,
      terminal: String.raw`╔════════╗
║ UNIT 7 ║
║ ◉  ◉  ║
║ [==]  ║
╚════════╝`,
      glitch: String.raw`R0B0T ░▒▓
[◉_◉]
▓[###]▒`,
      dotted: String.raw`.......
. o o .
. --- .`,
      symbols: String.raw`╔════╗
║@  @║
║ ## ║
╚════╝`,
      emoji: String.raw`🤖🤖🤖
🤖 ⚙️ ⚙️ 🤖
🤖 🔋 🤖`
    }
  },
  spaceship: {
    aliases: ['rocket', 'ufo', 'starship', 'spacecraft'],
    styles: {
      classic: String.raw`    /\
   /  \
  /____\
  |    |
  |____|
   /||\ `,
      blocks: String.raw`   ▄█▄
  █████
 ███████
  ▀███▀
  ▄▀ ▀▄`,
      minimal: String.raw` /\
/--\
|__|
/||\ `,
      terminal: String.raw`╔══════════╗
║ LAUNCH   ║
║   /\     ║
║  /__\    ║
║  ||||    ║
╚══════════╝`,
      glitch: String.raw`░▒▓ UFO ▓▒░
  /\
 ████
░/||\░`,
      dotted: String.raw`  .:.
 .:::.
.:::::.
  :::`,
      symbols: String.raw`  @@@
 @###@
@@###@@
  |||`,
      emoji: String.raw`✨🚀✨
🚀🚀🚀
🔥🔥🔥`
    }
  },
  skull: {
    aliases: ['death', 'skeleton', 'pirate'],
    styles: {
      classic: String.raw`  _____
 /     \
| () () |
|   ^   |
 \_____/
  |||||`,
      blocks: String.raw` ▄████▄
██ ▀ ▀ ██
██  ▴  ██
 ▀████▀
  █ █`,
      minimal: String.raw` _____
| x x |
|  -  |
 -----`,
      terminal: String.raw`╔════════╗
║ SKULL  ║
║ X   X  ║
║  ___   ║
╚════════╝`,
      glitch: String.raw`░▒ SKULL ▒░
/X   X\
| ▓▓▓ |`,
      dotted: String.raw`.:::::.
: x x :
: --- :`,
      symbols: String.raw`*~~~~~*
* @ @ *
* --- *`,
      emoji: String.raw`💀💀💀
💀 👁 👁 💀
💀💀💀`
    }
  },
  heart: {
    aliases: ['love', 'valentine'],
    styles: {
      classic: String.raw` **   **
**** ****
*********
 *******
  *****
   ***
    *`,
      blocks: String.raw`██  ██
██████
 ████
  ██`,
      minimal: String.raw`** **
*****
 ***
  *`,
      terminal: String.raw`╔══════╗
║ ♥ ♥  ║
║  ♥   ║
╚══════╝`,
      glitch: String.raw`▓ LOVE ▓
♥♥ ♥♥
 ♥♥♥`,
      dotted: String.raw`.::. .::.
:::::::::
 ':::::'`,
      symbols: String.raw`@@ @@
@@@@@
 @@@
  @`,
      emoji: String.raw`❤️ ❤️
❤️❤️❤️
 ❤️`
    }
  },
  tree: {
    aliases: ['forest', 'pine', 'nature'],
    styles: {
      classic: String.raw`    *
   ***
  *****
 *******
   |||`,
      blocks: String.raw`   ▄
  ███
 █████
███████
  ███`,
      minimal: String.raw`  *
 ***
*****
  |`,
      terminal: String.raw`╔══════╗
║  *   ║
║ ***  ║
║  |   ║
╚══════╝`,
      glitch: String.raw`TREE ░▒▓
  *
 ▓▓▓
░|||`,
      dotted: String.raw`  .
 .:.
.:::.
 :::`,
      symbols: String.raw`  @
 @@@
@@@@@
 ###`,
      emoji: String.raw`🌟
🌲🌲🌲
🌳🌳`
    }
  },
  wizard: {
    aliases: ['mage', 'magic', 'sorcerer'],
    styles: {
      classic: String.raw`    *
   /|\
  /_|_\
 ( o o )
  \_^_/
   /|\ `,
      blocks: String.raw`  ▄
 ▄█▄
█████
█● ●█
█████`,
      minimal: String.raw` /^\
(o o)
 -^-`,
      terminal: String.raw`╔════════╗
║ WIZARD ║
║  /^\   ║
║ (o o)  ║
╚════════╝`,
      glitch: String.raw`MAGIC ░▒▓
 /^\
(◉ ◉)
▓***▓`,
      dotted: String.raw`  .
 .:.
: o o :
 '---'`,
      symbols: String.raw` *+*
/|*|\
(@ @)`,
      emoji: String.raw`⭐🧙⭐
🧙 👁 👁 🧙
✨✨✨`
    }
  },
  rose: {
    aliases: ['flower', 'floral'],
    styles: {
      classic: String.raw`  ,---.
 (  *  )
  \---/
    |
  --|--
    |`,
      blocks: String.raw` ▄██▄
██████
 ▀██▀
  ██`,
      minimal: String.raw`(@)
 |
/|\ `,
      terminal: String.raw`╔══════╗
║ ROSE ║
║ (@)  ║
║ /|\  ║
╚══════╝`,
      glitch: String.raw`ROSE ░▒▓
 (@)
▓ | ▓`,
      dotted: String.raw`.::.
:::::
 ':'
  :`,
      symbols: String.raw`@~~~@
(@*@)
  |#|`,
      emoji: String.raw`🌹🌹🌹
 🌹
 🌿`
    }
  }
};

const STYLE_FALLBACKS = ['classic', 'minimal', 'symbols', 'blocks', 'terminal', 'glitch', 'dotted', 'emoji'];

export const ART_LIBRARY = Object.fromEntries(
  Object.entries(RAW_LIBRARY).map(([key, value]) => [key, value.styles])
);

export function listConcepts() {
  return Object.entries(RAW_LIBRARY).map(([key, value]) => ({
    key,
    aliases: value.aliases,
    styles: Object.keys(value.styles)
  }));
}

export function findArt(prompt, style = 'classic') {
  const query = String(prompt || '').trim().toLowerCase();
  if (!query) return null;

  const exactKey = RAW_LIBRARY[query] ? query : null;
  const aliasKey = exactKey || Object.keys(RAW_LIBRARY).find(key =>
    RAW_LIBRARY[key].aliases.some(alias => alias.toLowerCase() === query)
  );
  const fuzzyKey = aliasKey || Object.keys(RAW_LIBRARY).find(key =>
    key.includes(query) ||
    query.includes(key) ||
    RAW_LIBRARY[key].aliases.some(alias => {
      const normalized = alias.toLowerCase();
      return normalized.includes(query) || query.includes(normalized);
    })
  );

  if (!fuzzyKey) return null;

  const styles = RAW_LIBRARY[fuzzyKey].styles;
  const chosenStyle = styles[style] ? style : STYLE_FALLBACKS.find(name => styles[name]) || 'classic';
  return {
    key: fuzzyKey,
    style: chosenStyle,
    art: styles[chosenStyle].trim(),
    styles: Object.keys(styles)
  };
}
