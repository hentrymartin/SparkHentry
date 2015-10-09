'use strict';

angular
    .module('app.news.route', ['ngRoute'])
    .config(config);
/*Routing configuration fot newsSource module*/
function config($routeProvider) {
    $routeProvider
        .when('/newsDetails/:id',{
            templateUrl: 'app/newsSourceDetails/NewsSourceDetails.html',
            controller: 'NewsController',
            controllerAs: 'vm'
        });
}