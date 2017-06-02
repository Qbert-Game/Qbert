export default function ($scope, $stateParams, $state, Game, GameBoard, $location) {
    $scope.gameEffect = $stateParams.effect;

    $scope.playAgain = () => {
        $state.go('game', {});
    };
}