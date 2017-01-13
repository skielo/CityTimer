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
            sendToDataAnalysis: sendToDataAnalysis,
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
                .then(function(result) {
                    return result.data;
                })
                .catch(function(error) {
                    return error;
                });
        }

        function sendToDataAnalysis(data){
            return $http.post('https://firebasesync.azurewebsites.net/api/HttpTriggerSqlDatabase?code=MoXlt/zXFbx4Cvrq2dvGuyDnIePlW0QxhAHwWOx3NsGWzFzYAtQ71Q==', data)
                .then(function(result) {
                    return result;
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