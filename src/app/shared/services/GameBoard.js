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
        monsterDying: 'MONSTER_DYING'
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

                field.onColorChanged(() => {
                    observable.next({ action: actions.colorChanged })
                });

                field.onColorReverted(() => {
                    observable.next({ action: actions.colorReverted })
                })

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

    var makeMoves = () => {
        while (movesStack.length) {
            var { id, direction } = movesStack.pop();

            observable.next({ action: actions.animationStart, payload: { id, direction } });

            var character = getCharacterById(id);
            var coordinatesToAdd = directionToCoordinates(direction);

            var previousField = gameBoard[character.position.row][character.position.column];
            previousField.removeVisitor(character);

            character.position.row += coordinatesToAdd.row;
            character.position.column += coordinatesToAdd.column;

            var { row, column } = character.position;

            var field = gameBoard[row][column];
            field.addVisitor(character);
            
            observable.next({ action: actions.animationEnd, payload: { id, direction, position: character.position } });
            handleActionsAfterMove(field);
        }
    };

    var handleActionsAfterMove = (field) => {
        var visitors = field.getVisitors();
        var qbert = visitors.filter(v => v.type === 'qbert')[0];
        var monster = visitors.filter(v => v.type !== 'qbert')[0];

        if(qbert && monster){
            if(monster.type === 'sam')
                killMonster(monster.id, field);
            else
                killQbert();
        } else if(monster){
            if(monster.type == 'sam')
                field.revertColor();
            if((monster.type == 'sam' || monster.type == 'ball') && field.getCoordinates().row === 6)
                killMonster(monster.id, field);
        }
    }

    var killMonster = (monsterToKillId, field) => {
        observable.next({ action: actions.monsterDying, payload: { id: monsterToKillId} });
        field.removeVisitor({id: monsterToKillId});


        /* errors caused by remaining timer subscription 
        for(var monster of characters) {
            if(monster.id === monsterToKillId)
                characters.splice(characters.indexOf(monster), 1);
        } */
    }

    var killQbert = () => {
        console.log("qbert killed")
    }
    

    Timer.subscribe(makeMoves);

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
    };

    observable.move = ({ id, direction }) => {
        movesStack.push({ id, direction });
    };

    return observable;
}
