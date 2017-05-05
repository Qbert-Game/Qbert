export default function ($scope, $rootScope, $timeout, Timer, GameBoard) {
    $scope.gameboard = GameBoard.get();
    $scope.position = {
        row: 4,
        column: 2
    }

    $scope.isJumping = false;

    var id = 'qbert';
    var type = 'qbert';

    var updateViewPosition = () => {
        var { row, column } = $scope.position;
        var position = $scope.gameboard[row][column].getPosition();

        $scope.isJumping = true;

        $scope.top = position.top;
        $scope.left = position.left;

        // $timeout(() => { $scope.isJumping = false }, 5000)
    }

debugger
    GameBoard.registerCharacter({ id, type, position: $scope.position })

    $timeout(() => {
        console.log($scope.position)
       updateViewPosition();
    }, 0);

    // Timer.subscribe(() => {
    //     if ($scope.position.row >= $scope.gameboard.length - 1) {
    //         return;
    //     }

    //     var getRandomDirection = () => { 
    //         var keys = Object.keys($rootScope.directions);
    //         var random = Math.floor(Math.random() * 4);
    //         var key = keys[random];

    //         return $rootScope.directions[key];
    //     }

    //     var direction = getRandomDirection();
    //     // GameBoard.move({ id, direction });

    //     updateViewPosition();
    // });
}