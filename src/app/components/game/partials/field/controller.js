export default function ($scope, $timeout) {
    $timeout(() => {
        console.log($scope.field.getPosition());
    }, 0);
}