(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('firebaseDataService', firebaseDataService);

    function firebaseDataService() {
        var root = firebase.database().ref();

        var service = {
            root: root,
            requests: root.child('requests'),
            places: root.child('places')
        };

        return service;
    }

})();