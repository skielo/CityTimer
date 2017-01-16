(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('placesService', placesService);

    placesService.$inject = ['$firebaseArray', 'firebaseDataService', '$firebaseObject', '$rootScope', '$q', '$http'];

    function placesService($firebaseArray, firebaseDataService, $firebaseObject, $rootScope, $q, $http) {

        var places = null;

        var service = {
            Place: Place,
            getPlacesByUser: getPlacesByUser,
            reset: reset
        };

        return service;

        ////////////

        function Place() {
            this.placeName = '';
            this.placeId = '';
            this.userName = '';
            this.userId= '';
            this.photoUrl = '';
        }

        function getPlacesByUser(uid) {
            if (!places) {
                places = $firebaseArray(firebaseDataService.places.orderByChild('userId').equalTo(uid));
            }
            return places;
        }

        function reset() {
            if (places) {
                places.$destroy();
                places = null;
            }
        }
    }

})();