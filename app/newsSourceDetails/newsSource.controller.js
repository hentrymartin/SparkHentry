'use strict';

angular
    .module('app.news', ['app.news.route', 'app.home.newsFeed'])
    .controller('NewsController', NewsController);

NewsController.$inject = ['newsFeed','$log', '$location', '$sce', '$routeParams'];

function NewsController(newsFeed,$log, $location, $sce, $routeParams) {
    var vm = this;

    //Variable declarations
    vm.pageTitle = "News Source Details";
    vm.newsDetails = [];
    vm.selectedItem = {};
    vm.storyLimit = 3;
    vm.id = $routeParams.id;

    //Moved from the json to here, since that json was deprecated.
    // In the future it may be included in the xml feed or
    //with the real time service to make the functionality work properly
    vm.topVideo = [
        {
            "img":"assets/i/video-placeholder.jpg",
            "name":"The Future of the Next Generation is Big Data"
        },
        {
            "img":"assets/i/video-placeholder.jpg",
            "name":"The Future of the Next Generation is Big Data"
        },
        {
            "img":"assets/i/video-placeholder.jpg",
            "name":"The Future of the Next Generation is Big Data"
        },
        {
            "img":"assets/i/video-placeholder.jpg",
            "name":"The Future of the Next Generation is Big Data"
        },
        {
            "img":"assets/i/video-placeholder.jpg",
            "name":"The Future of the Next Generation is Big Data"
        },
        {
            "img":"assets/i/video-placeholder.jpg",
            "name":"The Future of the Next Generation is Big Data"
        },
        {
            "img":"assets/i/video-placeholder.jpg",
            "name":"The Future of the Next Generation is Big Data"
        },
        {
            "img":"assets/i/video-placeholder.jpg",
            "name":"The Future of the Next Generation is Big Data"
        },
        {
            "img":"assets/i/video-placeholder.jpg",
            "name":"The Future of the Next Generation is Big Data"
        },
        {
            "img":"assets/i/video-placeholder.jpg",
            "name":"The Future of the Next Generation is Big Data"
        }
    ];


    //Method bindings to the controller alias
    vm.goHome =goHome;
    vm.getTrustedHtml = getTrustedHtml;
    vm.seeAllStories = seeAllStories;

    getNewsDetails();

    /*get news details*/
    function getNewsDetails(){
        return getNews().then(function() {
            $log.info('Activated News details View');
        });
    }

    function getNews() {
        return newsFeed.getNewsFeed()
            .then(function(data) {
                var news = data;
                if (news
                    && news.news_feeds
                    && news.news_feeds.news
                    && news.news_feeds.news.length == 0) return news;

                //This is to choose the selected item from the list of feeds
                vm.selectedItem = {};
                for (var index = 0; index < news.news_feeds.news.length; index++) {
                    var item = news.news_feeds.news[index];
                    if (item.id == vm.id) {
                        vm.selectedItem = item;
                        break;
                    }
                }
                if (!vm.selectedItem.id) return news;
                //This gets the source from the feeds/*.xml folder
                newsFeed.getNewsSource(vm.selectedItem.id).then(function(source) {
                    if (!source) return;
                    vm.newsDetails = source.channel.item;
                });
                return news;
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

    /*See all the stories*/
    function seeAllStories() {
        vm.storyLimit = vm.newsDetails.length - 1;
    }

}