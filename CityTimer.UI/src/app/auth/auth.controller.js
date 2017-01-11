(function() {
    'use strict';

    angular
        .module('app.auth')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['$location', 'authService', '$rootScope', 'AUTH_EVENTS'];

    function AuthController($location, authService, $rootScope, AUTH_EVENTS) {
        var vm = this;

        vm.error = null;

        vm.register = register;
        vm.login = login;

        function register(user) {
            return authService.register(user)
                .then(function() {
                    return vm.login(user);
                })
                .then(function() {
                    return authService.sendWelcomeEmail(user.email);
                })
                .catch(function(error) {
                    vm.error = error;
                });
        }

        function login(user) {
            return authService.login(user)
                .then(function() {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {});
                    $location.path('/citytimer');
                })
                .catch(function(error) {
                    vm.error = error;
                });
        }
    }

})();