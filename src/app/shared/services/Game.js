export default function (Observable, GameBoard, $state, $timeout, Timer) {
    var observable = new Observable();

    var actions = {
        levelStarted: 'LEVEL_STARTED',
        pointsAdded: 'POINTS_ADDED',
        pointsSubtracted: 'POINTS_SUBTRACTED',
        qbertKilled: 'QBERT_KILLED_G',
        addCharacter: 'ADD_CHARACTER'
    };

    var points = 0;

    var level, lives, stepsMade, levelCfg;

    observable.actions = actions;

    observable.init = () => {
        level = 0;
        lives = 3;
        stepsMade = 0;
    };

    observable.startLevel = (level_) => {
        observable.init();

        level = level_;
        levelCfg = App.defaults.getLevelCfg(level);

        var stepsToTarget = levelCfg.stepsToTarget;
        GameBoard.start(stepsToTarget);
        observable.next({ action: actions.levelStarted, payload: { level } });
    }

    GameBoard.subscribe((data) => {
        var { action, payload } = data;

        switch (action) {
            case GameBoard.actions.levelCompleted: {
                if (level === App.defaults.levels.length) {
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