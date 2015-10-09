'use strict';

angular
    .module('app.story', ['app.story.route', 'app.home.newsFeed'])
    .controller('StoryController', StoryController);

StoryController.$inject = ['newsFeed','$log', '$location', '$sce', '$routeParams'];

function StoryController(newsFeed, $log, $location ,$sce, $routeParams) {
    var vm = this;

    vm.pageTitle = "Story Details";
    vm.storyDetails = [];
    vm.recommenedStories = [];

    vm.goHome = goHome;
    vm.getTrustedHtml = getTrustedHtml;
    console.log($routeParams);

    var currentIndex = $routeParams.index;
    var newsId = $routeParams.id;
    getStoryDetails();

    /*get news details*/
    function getStoryDetails(){
        return getStory().then(function() {
            $log.info('Activated Story View');
        });
    }

    function getStory() {
        return newsFeed.getNewsSource(newsId).then(function(source) {
            console.log(source);
            if (!source) return;
            vm.storyDetails = source.channel.item[currentIndex];
            //This selects the recommended stories as next 3 stories as discussed in the discussion
            for (var startIndex = parseInt(currentIndex) + 1; startIndex < parseInt(currentIndex) + 4; startIndex++) {
                if (!source.channel.item[startIndex]) continue;
                vm.recommenedStories.push(source.channel.item[startIndex]);
            }
            return vm.storyDetails;
        });
    }
    /*goHome*/
    function goHome(){
        $location.path('/home');
    }

    /*getTrustedHtml*/
    function getTrustedHtml(string){
        return $sce.trustAsHtml(string)
    }
}