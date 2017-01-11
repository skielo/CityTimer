(function() {
    'use strict';

    angular
        .module('app.citytimer')
        .directive('gzRequestTable', gzRequestTable);

    function gzRequestTable() {
        return {
            templateUrl: 'app/citytimer/directives/requestTable.html',
            restrict: 'E',
            controller: RequestTableController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                requests: '=',
                user: '='
            }
        };
    }

    RequestTableController.$inject = ['$rootScope', 'cityTimerService', 'GENERIC_EVENTS'];

    function RequestTableController($rootScope, cityTimerService, GENERIC_EVENTS) {
        var vm = this;

        vm.removeParty = removeParty;
        vm.sendTextMessage = sendTextMessage;
        vm.toggleDone = toggleDone;
        vm.convertTime = convertTime;

        function removeParty(party) {
            vm.parties.$remove(party).then(function(ref) {
                partyService.getPartiesByUser(vm.user.uid).$remove(ref.key);
                $rootScope.$broadcast(GENERIC_EVENTS.removePartySuccess, { id: ref.key });
            });
        }

        function sendTextMessage(party) {
            textMessageService.sendTextMessage(party, vm.parties);
        }

        function sendEmailMessage(party) {
            textMessageService.sendEmailMessages(party, vm.parties);
        }

        function toggleDone(party) {
            vm.parties.$save(party);
        }

        function convertTime(unixTime) {
            return moment(unixTime);
        }
    }

})();