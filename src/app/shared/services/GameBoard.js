import Field from 'models/Field';

export default function ($rootScope, Timer, Observable, $q, $timeout) {
    var observable = new Observable();
    var gameBoard, characters, movesStack;
    var reached = 0, fieldsNumber = 28;

    var actions = {
        animationStart: 'ANIMATION_START',
        animationEnd: 'ANIMATION_END',
        levelCompleted: 'LEVEL_COMPLETED',
        colorChanged: 'COLOR_CHANGED',
        colorReverted: 'COLOR_REVERTED',
        monsterDying: 'MONSTER_DYING',
        qbertKilled: 'QBERT_KILLED_GB',
        registeredCharacter: 'REGISTERED_CHARACTER'
    };

    var generateGameBoard = (stepsToTarget) => {
        var gameBoard = [];

        for (let i = 0; i < 7; i++) {
            var row = [];

            for (let j = 0; j < i + 1; j++) {
                let field = new Field({ row: i, column: j, stepsToTarget, $q, $rootScope });
                field.onTargetReached(() => {
                    reached++;

                    if (reached === fieldsNumber) {
                        observable.next({ action: actions.levelCompleted });
                    }
                });

                field.onTargetLost(() => {
                    reached--;
                });

                field.onColorChanged(() => {
                    observable.next({ action: actions.colorChanged })
                });

                field.onColorReverted(() => {
                    observable.next({ action: actions.colorReverted })
                });

                field.onQbertKilled(() => {
                    console.log("qbert killed");
                    var qbert = getCharacterById('qbert');
                    field.removeVisitor(qbert);
                    gameBoard[0][0].addVisitor(qbert);
                    qbert.position = { row: 0, column: 0 }

                    // remove buffered qbert move
                    movesStack = movesStack.filter((x) => x.id !== 'qbert');

                    observable.next({ action: actions.qbertKilled, payload: { id: 'qbert', position: { row: 0, column: 0 } } });

                });

                field.onMonsterKilled((monsterToKillId, field) => {
                    observable.next({ action: actions.monsterDying, payload: { id: monsterToKillId } });
                });

                row.push(field);
            }

            gameBoard.push(row);
        }

        return gameBoard;
    };

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

    var positionAfterMove = (startPos, direction) => {
        var move = directionToCoordinates(direction);
        return {
            row: startPos.row + move.row,
            column: startPos.column + move.column
        }
    }

    var makeMove = ({ id, direction }) => {
        var character = getCharacterById(id);

        if (!character) {
            return;
        }

        var coordinatesToAdd = directionToCoordinates(direction);
        var { position } = character;
        var afterMove = {
            row: position.row + coordinatesToAdd.row,
            column: position.column + coordinatesToAdd.column
        };

        var isFieldValid = afterMove.row >= 0 && afterMove.column >= 0;

        if (isFieldValid) {
            observable.next({ action: actions.animationStart, payload: { id, direction } });

            var previousField = gameBoard[character.position.row][character.position.column];
            previousField.removeVisitor(character);

            character.position.row = afterMove.row;
            character.position.column = afterMove.column;

            let { row, column } = afterMove;

            var field = gameBoard[row][column];
            field.addVisitor(character);

            observable.next({ action: actions.animationEnd, payload: { id, direction, position: character.position } });
        }
    }

    var makeScheduledMoves = () => {
        while (movesStack.length) {
            var { id, direction } = movesStack.pop();
            makeMove({ id, direction });
        }
    };

    Timer.subscribe(makeScheduledMoves);

    /*
    ** Public interface
    */
    observable.start = (stepsToTarget) => {
        gameBoard = generateGameBoard(stepsToTarget);
        characters = [];
        movesStack = [];
        reached = 0;
        fieldsNumber = 28;
    };

    observable.actions = actions;

    observable.get = () => gameBoard;

    observable.getQbert = () => getCharacterById('qbert');

    observable.getPossibleMoves = (id) => {
        var { upRight, upLeft, downRight, downLeft } = $rootScope.directions;
        var directions = [upRight, upLeft, downRight, downLeft]
        var character = getCharacterById(id);
        var moves = [];

        if (!character)
            return [];

        for (var dir of directions) {
            var targetPos = positionAfterMove(character.position, dir);
            if (gameBoard[targetPos.row] && gameBoard[targetPos.row][targetPos.column]) {
                var targetField = gameBoard[targetPos.row][targetPos.column];
                moves.push({ direction: dir, target: targetField });
            }
        }

        if (character.type != "qbert")
            moves = moves.filter(m => m.target.visitors.length == 0 || m.target.visitors[0].type == 'qbert');

        return moves.map(m => m.direction);
    };

    observable.registerCharacter = ({ id, type, position }) => {
        var character = { id, type, position };
        characters.push(character);
        gameBoard[position.row][position.column].addVisitor(character);

        observable.next({ action: actions.registeredCharacter, payload: { id, type } });
    };

    observable.unregisterCharacter = (id) => {
        if (!characters.filter((x) => x.id === id).length) {
            return;
        }

        var characterPos = getCharacterById(id).position;
        var field = gameBoard[characterPos.row][characterPos.column];
        field.removeVisitor({ id: id });
        characters = characters.filter((x) => x.id !== id);
    };

    observable.move = ({ id, direction }) => {
        if (id === 'qbert') {
            makeMove({ id, direction });
        } else {
            movesStack.push({ id, direction });
        }
    };

    return observable;
}
