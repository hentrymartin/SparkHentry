angular
    .module('app.home.appService',[])
    .factory('appService', appService);

appService.$inject = ['$http','$log'];

function appService($http,$log) {
    return {
        getApps: getApps
    };

    /*get apps*/
    function getApps() {
        return $http.get('assets/data/product_feed.json')
            .then(getAppComplete)
            .catch(getAppFailed);

        function getAppComplete(response) {
            return response.data;
        }

        function getAppFailed(error) {
            $log.error('XHR Failed for getWeather.' + error.data);
        }
    }
}