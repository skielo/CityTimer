(function() {
    'use strict';

    angular
        .module('app.places')
        .directive('gzPlacesTable', gzPlacesTable);

    function gzPlacesTable() {
        return {
            templateUrl: 'app/places/directives/placesTable.html',
            restrict: 'E',
            controller: PlacesTableController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                places: '=',
                user: '='
            }
        };
    }

    PlacesTableController.$inject = ['$rootScope', 'placesService', 'GENERIC_EVENTS'];

    function PlacesTableController($rootScope, placesService, GENERIC_EVENTS) {
        var vm = this;

        vm.changePlace = changePlace;

        function changePlace(place) {  
            $rootScope.$broadcast(GENERIC_EVENTS.selectedPlace, place);
        }

    }

})();