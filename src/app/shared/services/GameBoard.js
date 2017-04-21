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

            var possibleMoves = [
                // directions.upRight,
                // directions.upLeft,
                directions.downRight,
                directions.downLeft,
            ];

            return possibleMoves;
        },
        move: ({ id, direction }) => {
            console.log('move', id, direction);
        }
    }
}