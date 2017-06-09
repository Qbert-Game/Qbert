export default function ($rootScope, $state) {
    $rootScope.directions = { 
        upRight: 'UP_RIGHT',
        upLeft: 'UP_LEFT',
        downRight: 'DOWN_RIGHT', 
        downLeft: 'DOWN_LEFT'
    };

    document.addEventListener('deviceready', () => {
        document.addEventListener('backbutton', () => {
            switch ($state.current.name) {
                case 'game': {
                    let goBack = confirm('Are you sure?');
                    
                    if (goBack) {
                        $state.go('home');
                    }

                    break;
                }
            }
        });
    });
}