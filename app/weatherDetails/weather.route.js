'use strict';

angular
    .module('app.weather.route', ['ngRoute'])
    .config(config);
/*Routing configuration for weather details module*/
function config($routeProvider) {
    $routeProvider
        .when('/weatherDetails',{
            templateUrl: 'app/weatherDetails/WeatherDetails.html',
            controller: 'WeatherController',
            controllerAs: 'vm'
        });
}