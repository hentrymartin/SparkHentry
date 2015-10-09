'use strict';

angular
    .module('app.faq.route', ['ngRoute'])
    .config(config);

function config($routeProvider) {
    $routeProvider
        .when('/faq',{
            templateUrl: 'app/faq/FAQ.html',
            controller: 'FAQController',
            controllerAs: 'vm'
        });
}