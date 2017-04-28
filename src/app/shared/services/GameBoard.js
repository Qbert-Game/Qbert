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
    var characters = [];

    var getCharacterById = (id) => characters.filter(x => x.id === id)[0];

    var directionToCoordinates = (direction) => {
        var { upRight, upLeft, downRight, downLeft } = $rootScope.directions;
        var map = {};

        map[upRight] = { row: -1, column: 0 };
        map[upLeft] = { row: -1, column: -1 };
        map[downRight] = { row: 1, column: 1 };
        map[downLeft] = { row: 1, column: 0 };

        return map[direction];
    }

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

        registerCharacter: ({ id, type, position }) => {
            var character = { id, type, position };
            characters.push(character);
        },

        move: ({ id, direction }) => {
            var character = getCharacterById(id);
            var coordinatesToAdd = directionToCoordinates(direction);

            var previousField = gameBoard[character.position.row][character.position.column];
            previousField.removeVisitor(character);

            character.position.row += coordinatesToAdd.row;
            character.position.column += coordinatesToAdd.column;

            var { row, column } = character.position;

            var field = gameBoard[row][column];
            field.addVisitor(character);

            return { row, column };
        }
    }
}