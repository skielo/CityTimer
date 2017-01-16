(function() {
    'use strict';

    angular
        .module('app.places')
        .directive('gzPlacesForm', gzPlacesForm);

    function gzPlacesForm() {
        return {
            templateUrl: 'app/places/directives/placeForm.html',
            restrict: 'E',
            controller: PlaceFormController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                places: '=',
                user: '='
            }
        };
    }

    PlaceFormController.$inject = ['$scope', '$rootScope', 'placesService','storageService', 'GENERIC_EVENTS'];

    function PlaceFormController($scope, $rootScope, placesService, storageService, GENERIC_EVENTS) {
        var vm = this;
        vm.error = '';
        vm.newPlace = new placesService.Place();
        vm.addPlace = addPlace;
        vm.reset = reset;
        vm.locSearch = '';
        vm.locOptions = null;
        vm.locDetails = '';
        vm.file = {};

        function addPlace() {
            var coords = {};
            if (vm.locDetails != '') {
                coords = {
                    'formatted_address': vm.locDetails.formatted_address,
                    'latitude': vm.locDetails.geometry.location.lat(),
                    'longitude': vm.locDetails.geometry.location.lng()
                };
            }

            vm.newPlace.placeName = vm.locDetails.formatted_address;
            vm.newPlace.placeId = vm.locDetails.place_id;
            vm.newPlace.userName = vm.user.email;
            vm.newPlace.userId= vm.user.uid;
            vm.newPlace.photoUrl = '';
            storageService.Upload(vm.file, vm.user.uid, vm.file.name)
                    .then(function(data) {
                        vm.newPlace.photoUrl = data;
                        vm.places.$add(vm.newPlace);
                        $rootScope.$broadcast('successAlert', { header: 'Well done.', msg: 'Your request has been process successfully.' });
                    })
                    .catch(function(error) {
                        $rootScope.$broadcast('dangerAlert', { header: 'Oh snap!', msg: error });
                    });
        }

        function reset() {
            vm.newPlace = new placesService.Place();
        }
    }

})();