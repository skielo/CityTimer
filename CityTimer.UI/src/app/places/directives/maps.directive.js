(function() {
    'use strict';

    angular
        .module('app.places')
        .directive('gzMaps', gzMaps);

    function gzMaps() {
        return {
            templateUrl: 'app/places/directives/maps.html',
            restrict: 'E',
            controller: MapsController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                user: '='
            }
        };
    }

    MapsController.$inject = ['$rootScope', 'cityTimerService', 'GENERIC_EVENTS'];

    function MapsController($rootScope, cityTimerService, GENERIC_EVENTS) {
        var vm = this;
        vm.makeRequest = makeRequest;
        vm.place = {};

        // Create a map centered in NY
        vm.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 40.7128 , lng: 74.0059},
            zoom: 15
        });

        function makeRequest(place) {
            vm.place = place;
            var request = {
                placeId: place.placeId
            };

            var service = new google.maps.places.PlacesService(vm.map);
            service.getDetails(request, callback);
        }
        // Checks that the PlacesServiceStatus is OK, and adds a marker
        // using the place ID and location from the PlacesService.
        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                var marker = new google.maps.Marker({
                    map: vm.map,
                    position: results.geometry.location,
                    title: results.formatted_address,
                    //icon: vm.place.photoUrl({'maxWidth': 35, 'maxHeight': 35})
                });
                var infowindow = new google.maps.InfoWindow();
                vm.map.setCenter({lat: results.geometry.location.lat(), lng: results.geometry.location.lng()})
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent('<div><img src="'+ vm.place.photoUrl + '" style="width:128px;height:128px;"/></div>');
                    infowindow.open(vm.map, this);
                });
/*

                marker.setPosition();
                marker.setMap();
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                    'Place ID: ' + place.place_id + '<br>' +
                    place.formatted_address + '</div>');
                    infowindow.open(map, this);
                });*/
            }
        }

        $rootScope.$on(GENERIC_EVENTS.selectedPlace, function(event, arg) {
            vm.makeRequest(arg);
        });
    }

})();