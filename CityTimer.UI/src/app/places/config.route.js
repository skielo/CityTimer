(function() {
    'use strict';

    angular
        .module('app.places')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider'];

    function configFunction($routeProvider) {
        $routeProvider.when('/places', {
            templateUrl: 'app/places/places.html',
            controller: 'PlacesController',
            controllerAs: 'vm',
            resolve: { user: resolveUser }
        });
    }

    resolveUser.$inject = ['authService'];

    function resolveUser(authService) {
        return authService.firebaseAuthObject.$requireSignIn();
    }

})();