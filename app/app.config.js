'use strict';

angular
    .module('app')
    .config(config);

function config($routeProvider,$compileProvider) {
    $routeProvider
        .otherwise({
            redirectTo: '/home'
        });

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript|tel):/);
}
