export default function (Observable, GameBoard) {
    var observable = new Observable();

    var actions = {
        levelStarted: 'LEVEL_STARTED',
        pointsAdded: 'POINTS_ADDED',
        pointsSubtracted: 'POINTS_SUBTRACTED',
        addCharacter: 'ADD_CHARACTER'
    };

    var level = 0;
    var points = 0;

    observable.actions = actions;

    observable.playing = false;

    observable.startLevel = (level_) => {
        level = level_;
        observable.playing = true;
        GameBoard.start(level);
        observable.next({ action: actions.levelStarted, payload: { level } });
    }

    GameBoard.subscribe((data) => {
        var { action } = data;

        switch (action) {
            case GameBoard.actions.levelCompleted: {
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
        }
    });

    setInterval(() => {
        var index = Math.floor(Math.random() * 3);
        var types = ['ball', 'coily', 'sam'];
        var type = types[index];

        observable.next({ action: actions.addCharacter, payload: { type } });
    }, 5000);

    return observable;
}