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

        vm.callback = function(currentUser, credential, redirectUrl) {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {});
                $location.path('/citytimer');
                return false;
            };

        // FirebaseUI config.
        var uiConfig = {
            callbacks: {
            signInSuccess: vm.callback,
                uiShown: function() {
                    document.getElementById('loader').style.display = 'none';
                }
            },
            redirectUrl: '',
            credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
            queryParameterForWidgetMode: 'mode',
            signInFlow: 'popup',
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ]
        };

        
        // The start method will wait until the DOM is loaded.
        authService.firebaseUI.start('#firebaseui-auth-container', uiConfig);

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