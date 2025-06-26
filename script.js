const rows = 3, cols = 3;
const imgUrl = 'https://images.unsplash.com/photo-1600891964945-556a1b9b6338?auto=format&fit=crop&w=600&h=400&q=80';
const puzzleEl = document.getElementById('puzzle');

let tiles = [], first = null;

function init() {
  // create tiles
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const div = document.createElement('div');
      div.classList.add('tile');
      div.dataset.index = idx;
      div.style.backgroundImage = `url(${imgUrl})`;
      div.style.backgroundPosition = `-${c * (600/3)}px -${r * (400/3)}px`;
      div.style.backgroundSize = '600px 400px';
      tile = { el: div, pos: idx };
      div.addEventListener('click', () => selectTile(tile));
      tiles.push(tile);
      puzzleEl.appendChild(div);
    }
  }
  shuffle();
}

function shuffle() {
  tiles.sort(() => Math.random() - 0.5);
  tiles.forEach((t, i) => {
    puzzleEl.appendChild(t.el);
    t.pos = i;
    t.el.classList.remove('correct');
  });
}

function selectTile(tile) {
  if (!first) {
    first = tile;
    tile.el.classList.add('selected');
  } else if (first === tile) {
    first.el.classList.remove('selected');
    first = null;
  } else {
    swapTiles(first, tile);
    first.el.classList.remove('selected');
    first = null;
    checkWin();
  }
}

function swapTiles(a, b) {
  const pi = a.pos, pj = b.pos;
  tiles[pi] = b; tiles[pj] = a;
  a.pos = pj; b.pos = pi;
  puzzleEl.insertBefore(b.el, puzzleEl.children[pi]);
  puzzleEl.insertBefore(a.el, puzzleEl.children[pj]);
}

function checkWin() {
  let won = tiles.every((t, i) => {
    if (t.pos === parseInt(t.el.dataset.index)) {
      t.el.classList.add('correct');
      return true;
    }
    return false;
  });
  if (won) setTimeout(() => alert('🎉 You Win! 🎉'), 100);
}

window.onload = init;
