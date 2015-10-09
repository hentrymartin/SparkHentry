angular
    .module('app.home.sparkService',[])
    .factory('sparkService', sparkService);

sparkService.$inject = ['$http','$log'];

function sparkService($http,$log) {
    return {
        getSparks: getSparks
    };

       /*get Sparks*/
    function getSparks() {
        return $http.get('assets/data/mySpark.home.json')
            .then(getSparksComplete)
            .catch(getSparksFailed);

        function getSparksComplete(response) {
            return response.data;
        }

        function getSparksFailed(error) {
            $log.error('XHR Failed for getSpark.' + error.data);
        }
    }
}