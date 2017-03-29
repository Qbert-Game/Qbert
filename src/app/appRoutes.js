import components from 'components';

module.exports = function ($stateProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(false);

    $urlRouterProvider.otherwise('/');

    $stateProvider.state(angular.extend({ name: 'home', url: '/' }, components.home));
}