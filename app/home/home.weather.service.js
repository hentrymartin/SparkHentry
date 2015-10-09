angular
    .module('app.home.weatherService',[])
    .factory('weatherService', weatherService);

weatherService.$inject = ['$http','$log'];

function weatherService($http,$log) {
    return {
        getWeather: getWeather
    };


    /*get weather info*/
    function getWeather() {
        return $http.get('assets/data/wx_mega_call.xml')
            .then(getWeatherComplete)
            .catch(getWeatherFailed);

        function getWeatherComplete(response) {
            return x2js.xml_str2json(response.data);
        }

        function getWeatherFailed(error) {
            $log.error('XHR Failed for getWeather.' + error.data);
        }
    }
}