'use strict';
/*The app module declaration*/
angular
    .module('app', [
        'ngSanitize',
        'ngAnimate',
        'ngTouch',
        'ui.bootstrap',
        'app.home',
        'app.weather',
        'app.news',
        'app.story',
        'app.faq'
    ]);

