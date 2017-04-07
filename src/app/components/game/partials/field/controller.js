export default function ($scope, $interval) {
    let colors = ["blue", "red", "yellow", "green"];
    let stepsToTarget = 2;

    $scope.visitors = [];
    $scope.qbertVisits = 0;

    $scope.currentColor = colors[$scope.qbertVisits];

    $scope.addVisitor = ({ type, id }) => {

    }

    $scope.removeVisitor = ({ id }) => {

    }

    $scope.changeColor = () => {
        if ($scope.qbertVisits === stepsToTarget) {
            return;
        }

        $scope.currentColor = colors[++$scope.qbertVisits];
        
        if ($scope.qbertVisits === stepsToTarget) {
            console.log('target Reached');
        }
    }
}