(function() {
    'use strict';

    angular
        .module('app.places')
        .controller('PlacesController', PlacesController);

    PlacesController.$inject = ['$scope', '$rootScope', '$compile', '$log', 'user', 'placesService', 'GENERIC_EVENTS'];

    function PlacesController($scope, $rootScope, $compile, $log, user, placesService, GENERIC_EVENTS) {
        var vm = this;
        vm.user = user;
        vm.places = placesService.getPlacesByUser(user.uid);

    }

})();