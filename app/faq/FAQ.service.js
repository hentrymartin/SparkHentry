angular
    .module('app.faq.faqService',[])
    .factory('FAQService', FAQService);

FAQService.$inject = ['$http','$log'];

function FAQService($http,$log) {
    return {
        getFAQ: getFAQ
    };

    /*get weather info*/
    function getFAQ() {
        return $http.get('assets/data/FAQ.json')
            .then(getFAQComplete)
            .catch(getFAQFailed);

        function getFAQComplete(response) {
            return response.data;
        }

        function getFAQFailed(error) {
            $log.error('XHR Failed for getFAQ.' + error.data);
        }
    }

}