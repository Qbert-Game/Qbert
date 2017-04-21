export default function (Observable, GameBoard) {
    var observable = new Observable();
    
    var state = {
        gameBoard,
        characters,
        points
    };

    var start = () => {

    }

    var changeState = () => {
        observable.next()
    }
}