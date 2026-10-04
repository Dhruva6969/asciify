import { listConcepts } from './lib/artLibrary.js';
import { imageToAscii, textToAscii, asciiToPngBlob } from './lib/imageToAscii.js';
import { generateIdeaArt } from './services/generationService.js';
import { HeroCanvas } from './utils/heroCanvas.js';

const state = {
  mode: 'idea',
  style: 'classic',
  image: null,
  output: ''
};

const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));

document.addEventListener('DOMContentLoaded', () => {
  renderApp();
  new HeroCanvas($('#heroCanvas'));
  bindNavigation();
  bindGenerator();
  renderLibrary();
  generate();
});

function renderApp() {
  $('#app').innerHTML = `
    <header class="site-header">
      <a class="brand" href="#hero" aria-label="ASCIIFY home">ASCII<span>FY</span></a>
      <button class="menu-button" id="menuButton" type="button" aria-expanded="false" aria-controls="siteNav">Menu</button>
      <nav class="site-nav" id="siteNav" aria-label="Main navigation">
        <a href="#generator">Generator</a>
        <a href="#library">Library</a>
        <a href="#about">About</a>
      </nav>
    </header>

    <main>
      <section class="hero" id="hero">
        <div class="hero-copy">
          <p class="kicker">Browser-based character art studio</p>
          <h1>Make terminal art from words, ideas, and images.</h1>
          <p class="hero-text">Generate ASCII typography, convert images with canvas sampling, and pull character art from a built-in library. No account, API key, or backend required.</p>
          <div class="hero-actions">
            <a class="button primary" href="#generator">Open generator</a>
            <a class="button ghost" href="#library">View library</a>
          </div>
        </div>
        <div class="hero-stage" aria-label="Animated ASCII background">
          <canvas id="heroCanvas"></canvas>
          <div class="hero-caption">Move your cursor through the field</div>
        </div>
      </section>

      <section class="generator" id="generator">
        <div class="section-head">
          <p class="kicker">Generator</p>
          <h2>Choose a mode and render character art.</h2>
        </div>

        <div class="studio">
          <div class="controls" aria-label="Generator controls">
            <div class="mode-tabs" role="tablist" aria-label="Generation mode">
              <button class="mode-tab active" type="button" data-mode="idea">Idea</button>
              <button class="mode-tab" type="button" data-mode="text">Text</button>
              <button class="mode-tab" type="button" data-mode="image">Image</button>
            </div>

            <div class="panel active" id="ideaPanel">
              <label for="ideaInput">Idea prompt</label>
              <textarea id="ideaInput" rows="4" spellcheck="false">cat</textarea>
              <div class="chips" aria-label="Example ideas">
                <button type="button" data-idea="cat">cat</button>
                <button type="button" data-idea="dragon">dragon</button>
                <button type="button" data-idea="robot">robot</button>
                <button type="button" data-idea="spaceship">spaceship</button>
                <button type="button" data-idea="skull">skull</button>
                <button type="button" data-idea="heart">heart</button>
              </div>
            </div>

            <div class="panel" id="textPanel">
              <label for="textInput">Text to convert</label>
              <textarea id="textInput" rows="3" spellcheck="false">ASCIIFY</textarea>
              <label for="textWidth">Text width: <output id="textWidthValue">72</output></label>
              <input id="textWidth" type="range" min="36" max="120" value="72" />
            </div>

            <div class="panel" id="imagePanel">
              <label for="imageInput">Image file</label>
              <div class="drop-zone" id="dropZone">
                <input id="imageInput" type="file" accept="image/*" />
                <span>Drop an image here or click to browse</span>
              </div>
              <img id="imagePreview" class="image-preview" alt="Selected image preview" />
              <label for="imageCols">Image width: <output id="imageColsValue">90</output> columns</label>
              <input id="imageCols" type="range" min="40" max="160" value="90" />
              <label for="imageDensity">Sampling density: <output id="imageDensityValue">3</output></label>
              <input id="imageDensity" type="range" min="1" max="5" value="3" />
            </div>

            <label for="styleSelect">Art style</label>
            <select id="styleSelect">
              <option value="classic">Classic ASCII</option>
              <option value="blocks">Block shade</option>
              <option value="minimal">Minimal</option>
              <option value="terminal">Terminal frame</option>
              <option value="glitch">Glitch</option>
              <option value="dotted">Dotted</option>
              <option value="symbols">Symbols</option>
              <option value="emoji">Emoji blocks</option>
              <option value="custom">Custom characters</option>
            </select>

            <div class="custom-row" id="customRow">
              <label for="customChars">Custom characters, dark to light</label>
              <input id="customChars" type="text" value=" .:-=+*#%@" spellcheck="false" />
            </div>

            <button class="button primary full" id="generateButton" type="button">Generate</button>
            <p class="status" id="statusText" role="status">Ready.</p>
          </div>

          <div class="output-card">
            <div class="output-toolbar">
              <h3>Result</h3>
              <div class="tool-buttons">
                <button type="button" id="copyButton">Copy</button>
                <button type="button" id="txtButton">Download TXT</button>
                <button type="button" id="pngButton">Download PNG</button>
              </div>
            </div>
            <pre id="asciiOutput" class="ascii-output" tabindex="0">Press Generate to render ASCII art.</pre>
            <p class="meta" id="outputMeta">No output yet.</p>
          </div>
        </div>
      </section>

      <section class="library" id="library">
        <div class="section-head">
          <p class="kicker">Built-in library</p>
          <h2>Offline idea art included.</h2>
        </div>
        <div class="library-grid" id="libraryGrid"></div>
      </section>

      <section class="about" id="about">
        <h2>Ready for VS Code.</h2>
        <p>This project is plain HTML, CSS, and JavaScript modules. It runs locally with a tiny Node development server and builds by copying static files into <code>dist</code>.</p>
      </section>
    </main>
  `;
}

function bindNavigation() {
  const button = $('#menuButton');
  const nav = $('#siteNav');
  button.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
  $$('#siteNav a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
  }));
}

function bindGenerator() {
  $$('.mode-tab').forEach(tab => {
    tab.addEventListener('click', () => setMode(tab.dataset.mode));
  });

  $$('.chips button').forEach(button => {
    button.addEventListener('click', () => {
      $('#ideaInput').value = button.dataset.idea;
      setMode('idea');
      generate();
    });
  });

  $('#styleSelect').addEventListener('change', event => {
    state.style = event.target.value;
    $('#customRow').classList.toggle('visible', state.style === 'custom');
    generate();
  });

  $('#generateButton').addEventListener('click', generate);
  $('#ideaInput').addEventListener('input', debounce(generate, 250));
  $('#textInput').addEventListener('input', debounce(generate, 250));
  $('#textWidth').addEventListener('input', event => {
    $('#textWidthValue').textContent = event.target.value;
    if (state.mode === 'text') generate();
  });
  $('#customChars').addEventListener('input', debounce(generate, 250));
  $('#imageCols').addEventListener('input', event => {
    $('#imageColsValue').textContent = event.target.value;
    if (state.mode === 'image' && state.image) generate();
  });
  $('#imageDensity').addEventListener('input', event => {
    $('#imageDensityValue').textContent = event.target.value;
    if (state.mode === 'image' && state.image) generate();
  });

  const input = $('#imageInput');
  const dropZone = $('#dropZone');
  input.addEventListener('change', () => input.files[0] && loadImage(input.files[0]));
  dropZone.addEventListener('dragover', event => {
    event.preventDefault();
    dropZone.classList.add('dragging');
  });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragging'));
  dropZone.addEventListener('drop', event => {
    event.preventDefault();
    dropZone.classList.remove('dragging');
    const file = event.dataTransfer.files[0];
    if (file) loadImage(file);
  });

  $('#copyButton').addEventListener('click', copyOutput);
  $('#txtButton').addEventListener('click', downloadTxt);
  $('#pngButton').addEventListener('click', downloadPng);
}

function setMode(mode) {
  state.mode = mode;
  $$('.mode-tab').forEach(tab => tab.classList.toggle('active', tab.dataset.mode === mode));
  $('#ideaPanel').classList.toggle('active', mode === 'idea');
  $('#textPanel').classList.toggle('active', mode === 'text');
  $('#imagePanel').classList.toggle('active', mode === 'image');
  generate();
}

async function generate() {
  const status = $('#statusText');
  const output = $('#asciiOutput');
  const meta = $('#outputMeta');
  status.textContent = 'Rendering…';

  try {
    if (state.mode === 'idea') {
      const result = await generateIdeaArt($('#ideaInput').value, state.style);
      state.output = result.art;
      meta.textContent = `Idea mode · ${result.source} · ${result.style}`;
    } else if (state.mode === 'text') {
      state.output = textToAscii($('#textInput').value, {
        style: state.style,
        width: Number($('#textWidth').value),
        customChars: $('#customChars').value
      });
      meta.textContent = `Text mode · ${state.style} · ${$('#textWidth').value} columns`;
    } else {
      if (!state.image) {
        state.output = 'Select or drop an image to convert it into ASCII art.';
        meta.textContent = 'Image mode · waiting for image';
      } else {
        state.output = imageToAscii(state.image, {
          style: state.style,
          cols: Number($('#imageCols').value),
          density: Number($('#imageDensity').value),
          customChars: $('#customChars').value
        });
        meta.textContent = `Image mode · ${state.style} · ${$('#imageCols').value} columns`;
      }
    }

    output.textContent = state.output;
    status.textContent = 'Ready.';
  } catch (error) {
    state.output = `Could not render art: ${error.message}`;
    output.textContent = state.output;
    meta.textContent = 'Error';
    status.textContent = 'Check the input and try again.';
  }
}

function loadImage(file) {
  if (!file.type.startsWith('image/')) {
    $('#statusText').textContent = 'Choose an image file.';
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      state.image = img;
      $('#imagePreview').src = reader.result;
      $('#imagePreview').classList.add('visible');
      setMode('image');
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

async function copyOutput() {
  if (!state.output) return;
  await navigator.clipboard.writeText(state.output);
  flash('#copyButton', 'Copied');
}

function downloadTxt() {
  if (!state.output) return;
  const blob = new Blob([state.output], { type: 'text/plain;charset=utf-8' });
  saveBlob(blob, `asciify-${Date.now()}.txt`);
  flash('#txtButton', 'Saved');
}

async function downloadPng() {
  if (!state.output) return;
  const blob = await asciiToPngBlob(state.output);
  saveBlob(blob, `asciify-${Date.now()}.png`);
  flash('#pngButton', 'Saved');
}

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function renderLibrary() {
  const grid = $('#libraryGrid');
  grid.innerHTML = '';

  for (const concept of listConcepts()) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'library-card';
    card.innerHTML = `<span>${concept.key}</span><small>${concept.aliases.slice(0, 3).join(', ')}</small>`;
    card.addEventListener('click', () => {
      $('#ideaInput').value = concept.key;
      setMode('idea');
      $('#generator').scrollIntoView({ behavior: 'smooth' });
    });
    grid.append(card);
  }
}

function flash(selector, label) {
  const button = $(selector);
  const original = button.textContent;
  button.textContent = label;
  setTimeout(() => {
    button.textContent = original;
  }, 1100);
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
