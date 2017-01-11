(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('cityTimerService', cityTimerService);

    cityTimerService.$inject = ['$firebaseArray', 'firebaseDataService', '$firebaseObject', '$rootScope', '$q', '$http'];

    function cityTimerService($firebaseArray, firebaseDataService, $firebaseObject, $rootScope, $q, $http) {

        var requests = null;

        var service = {
            Request: Request,
            getRequestsByUser: getRequestsByUser,
            getTimezone: getTimezone,
            reset: reset
        };

        return service;

        ////////////

        function Request() {
            this.cityName = '';
            this.timeZoneId = '';
            this.timeZoneName = '';
            this.dstOffset = '';
            this.rawOffset = '';
            this.timeAtLocation = '';
            this.convertedRequestedTime = '';
            this.convertedLocalTime = '';
            this.userName = '';
        }

        function getRequestsByUser(uid) {
            if (!requests) {
                requests = $firebaseArray(firebaseDataService.requests.child(uid).child('userRequests'));
            }
            return requests;
        }

        function getTimezone(cityCoords, time) {
            var location = cityCoords.latitude + ',' + cityCoords.longitude;
            var timestamp = time;
            var key = 'AIzaSyANMkLJCoewVllFzxNmh7ynjSfpubCn220';
            return $http.get('https://maps.googleapis.com/maps/api/timezone/json?location=' + location + '&timestamp=' + timestamp + '&key=' + key)
                .then(result => {
                    return result.data;
                })
                .catch(error => {
                    return error;
                });
        }

        function reset() {
            if (requests) {
                requests.$destroy();
                requests = null;
            }
        }
    }

})();