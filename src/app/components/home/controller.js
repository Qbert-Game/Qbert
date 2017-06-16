export default function ($scope, $state, SoundEnabled) {
    $scope.soundEnabled = SoundEnabled.get();

    $scope.play = () => {
        var { soundEnabled } = $scope;
        SoundEnabled.set(soundEnabled);
        
        $state.go('game');
    }
}