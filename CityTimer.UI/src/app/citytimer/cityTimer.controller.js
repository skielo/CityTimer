(function() {
    'use strict';

    angular
        .module('app.citytimer')
        .controller('CityTimerController', CityTimerController);

    CityTimerController.$inject = ['$scope', '$rootScope', '$compile', '$log', 'user', 'cityTimerService', 'GENERIC_EVENTS'];

    function CityTimerController($scope, $rootScope, $compile, $log, user, cityTimerService, GENERIC_EVENTS) {
        var vm = this;
        vm.user = user;
        vm.requests = cityTimerService.getRequestsByUser(user.uid);
    }

})();