export default function (GameBoard, $rootScope) {

    function getPossibleMonsterMoves(monsterId, monsterMoves) {
        var possibleMoves = GameBoard.getPossibleMoves(monsterId);
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

    function randomMove(moves) {
        return moves[Math.floor(Math.random() * moves.length)];
    }

    return {
        getPossibleMonsterMoves: getPossibleMonsterMoves,
        getPosAfterMove: getPosAfterMove,
        randomMove: randomMove
    }
}