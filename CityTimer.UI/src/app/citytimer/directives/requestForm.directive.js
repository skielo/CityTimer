(function() {
    'use strict';

    angular
        .module('app.citytimer')
        .directive('gzRequestForm', gzRequestForm);

    function gzRequestForm() {
        return {
            templateUrl: 'app/citytimer/directives/requestForm.html',
            restrict: 'E',
            controller: RequestFormController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                requests: '=',
                user: '='
            }
        };
    }

    RequestFormController.$inject = ['$scope', '$rootScope', 'cityTimerService', 'GENERIC_EVENTS'];

    function RequestFormController($scope, $rootScope, cityTimerService, GENERIC_EVENTS) {
        var vm = this;
        vm.error = '';
        vm.newRequest = new cityTimerService.Request();
        vm.addRequest = addRequest;
        vm.reset = reset;
        vm.locSearch = '';
        vm.locOptions = null;
        vm.locDetails = '';

        function addRequest() {
            var coords = {};
            if (vm.locDetails != '') {
                coords = {
                    'formatted_address': vm.locDetails.formatted_address,
                    'latitude': vm.locDetails.geometry.location.lat(),
                    'longitude': vm.locDetails.geometry.location.lng()
                };
            }
            vm.newRequest.cityName = coords.formatted_address;
            vm.newRequest.timeAtLocation = moment.utc().unix();
            vm.newRequest.userName = vm.user.email;
            cityTimerService.getTimezone(coords, vm.newRequest.timeAtLocation)
                .then(result => {
                    vm.newRequest.timeZoneId = result.timeZoneId;
                    vm.newRequest.timeZoneName = result.timeZoneName;
                    vm.newRequest.dstOffset = result.dstOffset;
                    vm.newRequest.rawOffset = result.rawOffset;
                    vm.newRequest.convertedRequestedTime = moment.unix(vm.newRequest.timeAtLocation).utc().utcOffset(result.rawOffset + result.dstOffset).tz(result.timeZoneId).format('YYYY-MM-DD HH:mm');
                    vm.newRequest.convertedLocalTime = moment.unix(vm.newRequest.timeAtLocation).format('YYYY-MM-DD HH:mm');
                    vm.requests.$add(vm.newRequest);
                    vm.newRequest = new cityTimerService.Request();
                })
                .catch(error => {
                    vm.error = error;
                });
        }

        function reset() {
            vm.newRequest = new cityTimerService.Request();
        }
    }

})();