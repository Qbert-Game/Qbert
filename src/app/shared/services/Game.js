export default function (Observable, GameBoard, $state, $timeout, Timer) {
    var observable = new Observable();

    var actions = {
        levelStarted: 'LEVEL_STARTED',
        pointsAdded: 'POINTS_ADDED',
        pointsSubtracted: 'POINTS_SUBTRACTED',
        qbertKilled: 'QBERT_KILLED_G',
        addCharacter: 'ADD_CHARACTER'
    };

    var level, points, lives, stepsMade;

    var levels = [
        {
            addMonsterAfterSteps: 5,
            addCoilyAfterSteps: 20,
            stepsToTarget: 1
        },
        {
            addMonsterAfterSteps: 5,
            addCoilyAfterSteps: 10,
            stepsToTarget: 1
        },
        {
            addMonsterAfterSteps: 5,
            addCoilyAfterSteps: 20,
            stepsToTarget: 2
        },
        {
            addMonsterAfterSteps: 3,
            addCoilyAfterSteps: 10,
            stepsToTarget: 2
        },
        {
            addMonsterAfterSteps: 5,
            addCoilyAfterSteps: 20,
            stepsToTarget: 3
        },
        {
            addMonsterAfterSteps: 3,
            addCoilyAfterSteps: 10,
            stepsToTarget: 3
        }
    ];

    observable.actions = actions;

    observable.init = () => {
        level = 0;
        points = 0;
        lives = 3;
        stepsMade = 0;
    };

    observable.startLevel = (level_) => {
        observable.init();

        level = level_;

        GameBoard.start(level);
        observable.next({ action: actions.levelStarted, payload: { level } });
    }

    GameBoard.subscribe((data) => {
        var { action, payload } = data;

        switch (action) {
            case GameBoard.actions.levelCompleted: {
                if (level === levels.length) {
                    $state.go('end', { effect: 'victory' });
                }

                observable.startLevel(++level);
                break;
            }
            case GameBoard.actions.colorChanged: {
                points += 25;
                observable.next({ action: actions.pointsAdded, payload: { points } })
                break;
            }
            case GameBoard.actions.colorReverted: {
                points -= 25;
                observable.next({ action: actions.pointsSubtracted, payload: { points } })
                break;
            }
            case GameBoard.actions.qbertKilled: {
                if (lives > 0) {
                    lives--;
                    observable.next({ action: actions.qbertKilled, payload: { id: 'qbert', lives } });
                } else {
                    $timeout(() => {
                        $state.go('end', { effect: 'failure' })
                    }, 1500);
                }
            }
            case GameBoard.actions.animationEnd: {
                if (payload.id !== 'qbert') {
                    return;
                }

                stepsMade++;
                addCharacter();
            }
        }
    });

    var addCharacter = () => {
        var levelCfg = levels[level - 1];

        if (stepsMade === levelCfg.addCoilyAfterSteps) {
            let type = 'coily'
            observable.next({ action: actions.addCharacter, payload: { type } });
            return;
        }

        if (stepsMade % levelCfg.addMonsterAfterSteps !== 0) {
            return;
        }

        var index = Math.floor(Math.random() * 2);
        var types = ['ball', 'sam'];
        let type = types[index];

        observable.next({ action: actions.addCharacter, payload: { type } });
    };

    return observable;
}