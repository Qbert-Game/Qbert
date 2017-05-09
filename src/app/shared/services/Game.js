export default function (Observable, GameBoard) {
    var observable = new Observable();
    
    var actions = {
        levelStarted: 'LEVEL_STARTED',
        pointsAdded: 'POINTS_ADDED'
    };

    var level = 0;
    var points = 0;

    observable.actions = actions;

    observable.startLevel = (level_) => {
        level = level_;
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
        }
    });

    return observable;
}