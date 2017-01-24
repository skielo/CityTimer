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
            vm.storageRef = storageService.getStorage(vm.user.uid, vm.file.name);
            vm.uploadTask = vm.storageRef.$put(vm.file);

            vm.uploadTask.$progress(function(snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    vm.progress = 'Upload is ' + progress + '% done';
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED:
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING:
                            console.log('Upload is running');
                            break;
                    }
            }); 
            vm.uploadTask.$complete(function(snapshot) {
                vm.newPlace.photoUrl = snapshot.downloadURL;
                vm.places.$add(vm.newPlace);
                $rootScope.$broadcast('successAlert', { header: 'Well done.', msg: 'Your request has been process successfully.' });
            });
            vm.uploadTask.$error(function(error) {
                var msg = '';
                switch (error.code) {
                    case 'storage/unauthorized':
                    msg = 'User does not have permission to access the object.';
                    break;
                    case 'storage/canceled':
                    msg = 'User canceled the upload.';
                    break;
                    case 'storage/unknown':
                    msg = ' Unknown error occurred, Please try later.';
                    break;
                }
                $rootScope.$broadcast('dangerAlert', { header: 'Oh snap!', msg: msg });
            });
        }

        function pause() {
            if(vm.uploadTask){
                uploadTask.$pause();
            }
        }

        function reset() {
            vm.newPlace = new placesService.Place();
        }
    }

})();