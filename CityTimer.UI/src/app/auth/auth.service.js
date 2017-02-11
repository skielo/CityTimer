(function() {
    'use strict';

    angular
        .module('app.auth')
        .factory('authService', authService);

    authService.$inject = ['$firebaseAuth', 'firebaseDataService', 'cityTimerService'];

    function authService($firebaseAuth, firebaseDataService, cityTimerService) {
        var authObject = firebase.auth();
        var firebaseAuthObject = $firebaseAuth(authObject);
        var ui = new firebaseui.auth.AuthUI(authObject);

        var service = {
            firebaseAuthObject: firebaseAuthObject,
            authObject: authObject,
            firebaseUI: ui,
            register: register,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            sendWelcomeEmail: sendWelcomeEmail
        };

        return service;

        ////////////

        function register(user) {
            return firebaseAuthObject.$createUserWithEmailAndPassword(user.email, user.password);
        }

        function login(user) {
            return firebaseAuthObject.$signInWithEmailAndPassword(user.email, user.password);
        }

        function logout() {
            cityTimerService.reset();
            firebaseAuthObject.$signOut();
        }

        function isLoggedIn() {
            return firebaseAuthObject.$getAuth();
        }

        function sendWelcomeEmail(emailAddress) {
            firebaseDataService.emails.push({
                emailAddress: emailAddress
            });
        }

    }

})();