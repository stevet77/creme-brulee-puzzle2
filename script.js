<script>
  const puzzleEl = document.getElementById('puzzle');
  const imgUrl = 'https://github.com/stevet77/creme-brulee-puzzle2/raw/main/D83129CD-B4E8-4D88-AA6B-BA9D0B601BA2_1_105_c.jpeg';

  let tileOrder = [...Array(9).keys()];
  let emptyIndex = 8;

  function isAdjacent(index1, index2) {
    const row1 = Math.floor(index1 / 3), col1 = index1 % 3;
    const row2 = Math.floor(index2 / 3), col2 = index2 % 3;
    return (
      (row1 === row2 && Math.abs(col1 - col2) === 1) ||
      (col1 === col2 && Math.abs(row1 - row2) === 1)
    );
  }

  function render() {
    puzzleEl.innerHTML = '';
    tileOrder.forEach((tileNum, i) => {
      const div = document.createElement('div');
      div.className = 'tile';
      if (tileNum === 8) {
        div.classList.add('empty');
      } else {
        const r = Math.floor(tileNum / 3);
        const c = tileNum % 3;
        div.style.backgroundImage = `url('${imgUrl}')`;
        div.style.backgroundPosition = `-${c * 200}px -${r * 133}px`;
        div.addEventListener('click', () => tryMove(i));
      }
      puzzleEl.appendChild(div);
    });
  }

  function tryMove(index) {
    if (isAdjacent(index, emptyIndex)) {
      [tileOrder[index], tileOrder[emptyIndex]] = [tileOrder[emptyIndex], tileOrder[index]];
      emptyIndex = index;
      render();
    }
  }

  function shuffle() {
    for (let i = 0; i < 100; i++) {
      const possibleMoves = [];
      for (let j = 0; j < 9; j++) {
        if (isAdjacent(j, emptyIndex)) {
          possibleMoves.push(j);
        }
      }
      const rand = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      [tileOrder[emptyIndex], tileOrder[rand]] = [tileOrder[rand], tileOrder[emptyIndex]];
      emptyIndex = rand;
    }
    render();
  }

  render();
  shuffle();
</script>
