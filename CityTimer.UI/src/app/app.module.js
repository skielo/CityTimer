(function() {
    'use strict';
    var config = {
        apiKey: "AIzaSyDcPq_z9vh4CidkzFDyerRK0ZS7gs2Sj14",
        authDomain: "citytimer-90920.firebaseapp.com",
        databaseURL: "https://citytimer-90920.firebaseio.com",
        storageBucket: "citytimer-90920.appspot.com",
        messagingSenderId: "497040832817"
    };
    firebase.initializeApp(config);
    angular
        .module('app', [
            // Angular modules.
            'ngRoute',

            // Third party modules.
            'firebase',
            'ui.bootstrap',
            'ngAutocomplete',


            // Custom modules.
            'app.auth',
            'app.core',
            'app.landing',
            'app.layout',
            'app.citytimer',
            'app.alert'
        ])
        .config(configFunction)
        .run(runFunction);

    configFunction.$inject = ['$routeProvider'];

    function configFunction($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }

    runFunction.$inject = ['$rootScope', '$location'];

    function runFunction($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
            if (error === "AUTH_REQUIRED") {
                $location.path('/');
            }
        });
    }

})();