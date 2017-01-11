(function() {
    'use strict';

    angular
        .module('app.citytimer')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider'];

    function configFunction($routeProvider) {
        $routeProvider.when('/citytimer', {
            templateUrl: 'app/citytimer/cityTimer.html',
            controller: 'CityTimerController',
            controllerAs: 'vm',
            resolve: { user: resolveUser }
        });
    }

    resolveUser.$inject = ['authService'];

    function resolveUser(authService) {
        return authService.firebaseAuthObject.$requireSignIn();
    }

})();