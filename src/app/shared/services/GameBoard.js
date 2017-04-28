import Field from 'models/Field';

export default function ($rootScope) {
    var generateGameBoard = () => {
        var gameBoard = [];

        for (let i = 0; i < 7; i++) {
            var row = [];

            for (let j = 0; j < i + 1; j++) {
                row.push(new Field({ row: i, column: j }));
            }

            gameBoard.push(row);
        }

        return gameBoard;
    };

    var gameBoard = generateGameBoard();

    return {
        get: () => gameBoard,

        getPossibleMoves: (id) => {
            var directions = $rootScope.directions;
            var character = getCharacterById(id);
            var moves = [];

            for(var dir of directions){
                var targetPos = MonsterUtils.getPosAfterMove(character.position, dir);
                var targetField = gameBoard[targetPos.row][targetPos.column]
                if(targetField != undefined)
                    moves.push({ direction: dir, target: targetField});
            }

            if(character.type != "qbert")
                moves = moves.filter( m => m.target.visitors.length == 0)

            return moves.map(m => m.direction);
        },
        move: ({ id, direction }) => {
            console.log('move', id, direction);
        }
    }
}