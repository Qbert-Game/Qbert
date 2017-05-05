export default function (Observable, GameBoard) {
    var observable = new Observable();
    
    var actions = {
        levelStarted: 'LEVEL_STARTED'
    };

    GameBoard.subscribe((data) => {
        var { action } = data;

        if (action === GameBoard.actions.levelCompleted) {
            alert('Level completed!');
        }
    });

    observable.startLevel = (level) => {
        GameBoard.start(level);
        observable.next({ action: actions.levelStarted, payload: { level } });
    }

    return observable;
}