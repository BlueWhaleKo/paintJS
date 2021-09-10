const canvas = document.querySelector('#jsCanvas');
const colors = document.querySelectorAll('.jsColor');
const widthRange = document.querySelector('#jsRange');
const drawBtn = document.querySelector('#jsDraw');
const fillBtn = document.querySelector('#jsFill');
const saveBtn = document.querySelector('#jsSave');

const ctx = initCtx(canvas);

let isPainting = false;
let currentMode = 'DRAW';

function initCtx(canvas) {
  if (!canvas) {
    return null;
  }

  canvas.width = 700;
  canvas.height = 700;

  let ctx = canvas.getContext('2d');
  // white background by default
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#2c2c2c';
  ctx.strokeStyle = '#2c2c2c';
  ctx.lineWidth = 2.5;

  return ctx;
}

function changeColor(color) {
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
}

function changeLineWidth(width) {
  ctx.lineWidth = width;
}

function startPainting() {
  isPainting = true;

  if (currentMode === 'FILL') {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function stopPainting() {
  isPainting = false;
}

function changeMode(mode) {
  currentMode = mode;
}

if (canvas) {
  canvas.addEventListener('mouseleave', (event) => {
    stopPainting();
  });
  canvas.addEventListener('mouseup', (event) => {
    stopPainting();
  });
  canvas.addEventListener('mousedown', (event) => {
    startPainting();
  });
  canvas.addEventListener('mousemove', (event) => {
    const { offsetX, offsetY } = event;

    if (!isPainting) {
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
    } else {
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    }
  });
  canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });
}

if (colors) {
  Array.from(colors).forEach((color) => {
    color.addEventListener('click', (_) => {
      changeColor(color.style.backgroundColor);
    });
  });
}

if (widthRange) {
  widthRange.addEventListener('input', (event) => {
    const width = event.target.value;
    changeLineWidth(width);
  });
}

if (drawBtn) {
  drawBtn.addEventListener('click', (event) => {
    changeMode('DRAW');
  });
}

if (fillBtn) {
  fillBtn.addEventListener('click', (event) => {
    changeMode('FILL');
  });
}

if (saveBtn) {
  saveBtn.addEventListener('click', (event) => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg');
    link.download = 'PaintJS';
    link.click();
  });
}
