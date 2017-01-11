(function() {
    'use strict';
    var alertDirective = function($compile) {

        'use strict';

        return {
            restrict: 'E',
            scope: {
                ngModel: '='
            },
            templateUrl: 'app/alert/directives/alert.html',
            link: function(scope, element, attrs, controllers) {

                $compile(element.contents())(scope);
            }
        };
    };

    angular
        .module('app.alert')
        .directive('alert', alertDirective);

    alertDirective.$inject = ['$compile'];

})();