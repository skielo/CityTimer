(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('storageService', storageService);

    storageService.$inject = ['$http', '$firebaseStorage', '$q'];

    function storageService($http, $firebaseStorage, $q) {
        var storageRef = firebase.storage().ref();
        var storage = null;

        var service = {
            getStorage: getStorage
        };

        return service;

        function getStorage(uid, fileName) {
            if(!storage){
                storage = $firebaseStorage(storageRef.child(uid).child(fileName));
            } 
            return storage;  
        }
    }

})();