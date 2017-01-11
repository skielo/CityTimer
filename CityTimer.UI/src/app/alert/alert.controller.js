(function() {
    'use strict';

    angular
        .module('app.alert')
        .controller('AlertController', AlertController);

    AlertController.$inject = ['$rootScope', '$scope', '$timeout', '$interval'];


    function AlertController($rootScope, $scope, $timeout, $interval) {
        $scope.alerts = [];

        var stop;

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $rootScope.$on('dangerAlert', function(event, arg) {
            $scope.alerts.push({ type: 'alert alert-dismissible alert-danger', message: arg.msg, header: arg.header, icon: 'error' });
            $timeout($scope.clean, 5000);
        });

        $rootScope.$on('successAlert', function(event, arg) {
            $scope.alerts.push({ type: 'alert alert-dismissible alert-success', message: arg.msg, header: arg.header, icon: 'done' });
            $timeout($scope.clean, 3000);
        });
        $rootScope.$on('warningAlert', function(event, arg) {
            $scope.alerts.push({ type: 'alert alert-dismissible alert-warning', message: arg.msg, header: arg.header, icon: 'warning' });
            $timeout($scope.clean, 5000);
        });
        $rootScope.$on('infoAlert', function(event, arg) {
            $scope.alerts.push({ type: 'alert alert-dismissible alert-info', message: arg.msg, header: arg.header, icon: 'priority high' });
            $timeout($scope.clean, 5000);
        });

        $rootScope.$on('clean', function(event, arg) {
            $scope.clean();
        });

        $scope.clean = function() {
            if (angular.isDefined(stop)) return;

            stop = $interval(function() {
                if ($scope.alerts.length > 0) {
                    $scope.alerts.splice(0, 1);
                } else {
                    $scope.stopClean();
                }
            }, 3000);
        };

        $scope.stopClean = function() {
            if (angular.isDefined(stop)) {
                $interval.cancel(stop);
                stop = undefined;
            }
        };
    }

})();