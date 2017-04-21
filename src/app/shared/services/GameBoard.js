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

    var qbert = {
        id: 'qbert',
        type: 'qbert',
        position: {
            row: 0,
            column: 0
        }
    };

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

            if (id === qbert.id) {
                let { row, column } = qbert.position;

                if (row !== 0) {
                    if (column !== 0) {
                        possibleMoves.push(directions.upLeft);
                    }

                    if (column !== row + 1) {
                        possibleMoves.push(directions.upRight);
                    }
                }
            }

            return possibleMoves;
        },
        move: ({ id, direction }) => {
            // if (direction = $rootScope.directions.do)
            console.log('move', id, direction);
        },
        qbert
    }
}