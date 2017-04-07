export default function () {
    return {
        getPossibleMoves,
        getPosAfterMove,
        getPosAfterMovingCloser,
        distanceBetween,
        randomMove
    }

    function getPossibleMoves(monster) {
        var monsterMoves = monster.moves;
        var possibleMoves = []; //Gameboard.getPossibleMoves(monster.id);
        return monsterMoves.filter(move => possibleMoves.includes(move));
    }

    function getPosAfterMove(startPos, move) {
        switch (move) {
            case "UP RIGHT": return { row: startPos.row - 1, col: startPos.col };
            case "UP LEFT": return { row: startPos.row - 1, col: startPos.col - 1 };
            case "DOWN RIGHT": return { row: startPos.row + 1, col: startPos.col + 1 };
            case "DOWN LEFT": return { row: startPos.row + 1, col: startPos.col };
        }
    }

    function getPosAfterMovingCloser(fromPos, toPos) {
        var colDiff = fromPos.col - toPos.col;
        var rowDiff = fromPos.row - toPos.row;

        if (rowDiff > 0)
            var move = (colDiff <= 1 ? "UP RIGHT" : "UP LEFT");
        else
            var move = (colDiff <= -1 ? "DOWN RIGHT" : "DOWN LEFT");

        return getPosAfterMove(fromPos, move);
    }

    function distanceBetween(pos1, pos2) {
        var colDiff = pos1.col - pos2.col;
        var rowDiff = pos1.row - pos2.row;

        if (colDiff == 0 || colDiff == rowDiff)
            return Math.abs(colDiff);
        if (rowDiff == 0)
            return 2 * Math.abs(colDiff);
        else {
            var closerPos = getPosAfterMovingCloser(pos1, pos2);
            return 1 + distanceBetween(closerPos, pos2)
        }
    }

    function randomMove(moves) {
        return moves[Math.floor(Math.random() * moves.length)];
    }

    return {
        getPossibleMoves: getPossibleMoves,
        getPosAfterMove: getPosAfterMove,
        getPosAfterMovingCloser: getPosAfterMovingCloser,
        distanceBetween: distanceBetween,
        randomMove: randomMove
    }
}