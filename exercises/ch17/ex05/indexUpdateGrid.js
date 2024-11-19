// Life Game のルールに従ってセルを更新する
export function updateGrid(grid, ROWS, COLS) {
    // 新しいグリッドを作成
    const nextGrid = grid.map((arr) => [...arr]);

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
            let count = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    // 自分自身はカウントしない
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    let newRow = row + i;
                    let newCol = col + j;
                    // 範囲外の場合はスキップ
                    if (newRow < 0 || ROWS <= newRow || newCol < 0 || COLS <= newCol) {
                        continue;
                    }
                    if (grid[newRow][newCol]) {
                        count++;
                    }
                }
            }
            //誕生
            if (!grid[row][col] && count === 3) {
                nextGrid[row][col] = true;
            }
            //生存
            else if (grid[row][col] && (count === 2 || count === 3)) {
                nextGrid[row][col] = true;
            }
            //過疎
            else if (grid[row][col] && count <= 1) {
                nextGrid[row][col] = false;
            }
            //過密  
            else if (grid[row][col] && count >= 4) {
                nextGrid[row][col] = false;
            }
        }
    }
    return nextGrid;
}