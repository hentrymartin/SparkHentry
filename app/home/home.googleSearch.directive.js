'use strict';

//This directive is for making the search when user press enter key or in blur action
angular.module('app.home.googleSearch', []).directive('searchGoogle', function() {
    return {
        restrict : 'A',
        link : function(scope, element, attr) {

            function searcher() {
                if (!scope.google) return;
                var url = 'https://www.google.com/?gfe_rd=cr&ei=GfCXVdX3Fqrv8weeyLHAAg&gws_rd=ssl#q=' + scope.google;
                window.open(url);
            }
            //This binding is for enter key press
            $(element).keyup(function(event) {
                if (event.keyCode == 13) {
                    searcher();
                }
            });

            //This binding is for blur action
            $(element).blur(searcher);
        }
    }
})
