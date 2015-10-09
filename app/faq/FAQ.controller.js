'use strict';

angular
    .module('app.faq', ['app.faq.route','app.faq.faqService'])
    .controller('FAQController', FAQController);

FAQController.$inject = ['FAQService','$log', '$location'];

function FAQController(FAQService,$log, $location) {
    var vm = this;

    vm.pageTitle = "Frequently Asked Questions";
    vm.FAQDetails = [];

    vm.goHome =goHome;

    getFAQDetails();

    /*get news details*/
    function getFAQDetails(){
        return getFAQ().then(function() {
            $log.info('Activated FAQ View');
        });
    }

    function getFAQ() {
        return FAQService.getFAQ()
            .then(function(data) {
                vm.FAQDetails = data;
                return vm.FAQDetails;
            });
    }

    /*goHome*/
    function goHome(){
        $location.path('/home');
    }

}