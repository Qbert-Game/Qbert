export default function (GameBoard, $rootScope) {
    return {
        getPossibleMoves,
        getPosAfterMove,
        getPosAfterMovingCloser,
        distanceBetween,
        randomMove
    }

    function getPossibleMonsterMoves(monsterId) {
        var monster = GameBoard.getCharacterById(monsterId);
        var monsterMoves = monster.moves;
        var possibleMoves = Gameboard.getPossibleMoves(monster.id);
        return monsterMoves.filter(move => possibleMoves.includes(move));
    }

    function getPosAfterMove(startPos, move) {
        var { upRight, upLeft, downRight, downLeft } = $rootScope.directions;
        switch (move) {
            case upRight: return { row: startPos.row - 1, column: startPos.column };
            case upLeft: return { row: startPos.row - 1, column: startPos.column - 1 };
            case downRight: return { row: startPos.row + 1, column: startPos.column + 1 };
            case downLeft: return { row: startPos.row + 1, column: startPos.column };
        }
    }

    function getPosAfterMovingCloser(fromPos, toPos) {
        var { upRight, upLeft, downRight, downLeft } = $rootScope.directions;
        var colDiff = fromPos.column - toPos.column;
        var rowDiff = fromPos.row - toPos.row;

        if (rowDiff > 0)
            var move = (colDiff <= 1 ? upRight : upLeft);
        else
            var move = (colDiff <= -1 ? downRight : downLeft);

        return getPosAfterMove(fromPos, move);
    }

    function distanceBetween(pos1, pos2) {
        var colDiff = pos1.column - pos2.column;
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