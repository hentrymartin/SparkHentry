'use strict';

angular
    .module('app.home', [
        'app.home.route',
        'app.home.sparkService',
        'app.home.weatherService',
        'app.home.appService',
        'app.home.newsFeed',
        'app.home.googleSearch'
    ])
    .controller('HomeController', HomeController);

HomeController.$inject = ['sparkService','weatherService','appService','newsFeed','$log'];

function HomeController(sparkService,weatherService,appService,newsFeed,$log) {

    //Variable declarations
    var vm = this;          //assigning this object[scope] to the controller alias
    vm.user = "Jack Jones";
    vm.loginModal = false;

    vm.appUrl = "";

    vm.weather =[];
    vm.apps =[];
    vm.latestNews =[];
    vm.newsFeed =[];
    vm.sparks =[];
    vm.temparatureNotation = 'F';

    //Moved the updated time to here from json since that json is deprecated
    vm.updateTime = 'just now';

    //Method binding to the controller alias
    vm.convertTo24HourFormat = convertTo24HourFormat;
    vm.assignClass = assignClass;

    //Api call initiations
    getWeatherInfo();
    getAppInfo();
    getLatestNewsInfo();
    getNewsFeedInfo();
    getSparkInfo();


    /*get weather info*/
    function getWeatherInfo(){
        return getWeather().then(function() {
            $log.info('Activated Weather View');
        });
    }

    function getWeather() {
        return weatherService.getWeather()
            .then(function(data) {
                vm.weather = data;
                vm.weather.locations.location.sfc_ob.sunset_local = vm.convertTo24HourFormat(vm.weather.locations.location.sfc_ob.sunset_local);
                return vm.weather;
            });
    }

    /*get apps*/
    function getAppInfo(){
        return getApp().then(function() {
            $log.info('Activated App View');
        });
    }

    /*Gets the list of apps from the service*/
    function getApp() {
        return appService.getApps()
            .then(function(data) {
                vm.apps = data;
                /*As the functionality says the app should be sorted based on priority,It is sorted*/
                vm.apps.features.sort(function(a, b) {
                    return a.priority - b.priority;
                });
                return vm.apps;
            });
    }

    /*get latest news*/
    function getLatestNewsInfo(){
        return getLatestNews().then(function() {
            $log.info('Activated Latest News View');
        });
    }

    function getLatestNews() {
        return newsFeed.getNewsFeed()
            .then(function(data) {
                var news = data;
                if (news
                    && news.news_feeds
                    && news.news_feeds.news
                    && news.news_feeds.news.length == 0) return news;
                //This gets the story source from the feeds
                newsFeed.getNewsSource(news.news_feeds.news[0].id).then(function(source) {
                    if (!source) return;
                    vm.latestNews = source.channel.item;
                });
                return news;
            });
    }

    /*get news feed*/
    function getNewsFeedInfo(){
        return getNewsFeed().then(function() {
            $log.info('Activated News Feed View');
        });
    }

    function getNewsFeed() {
        return newsFeed.getNewsFeed()
            .then(function(data) {
                vm.newsFeed = data;
                return vm.newsFeed;
            });
    }

    /*get spark*/
    function getSparkInfo(){
        return getSpark().then(function() {
            $log.info('Activated Spark View');
        });
    }

    function getSpark() {
        return sparkService.getSparks()
            .then(function(data) {
                vm.sparks = data;
                return vm.sparks;
            });
    }

    /*detect mobile browser*/
    vm.isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone | iPad | iPod/i)
        }
    };

    if(vm.isMobile.Android()) {
        vm.appUrl='https://play.google.com/store/apps/details?id='
    }else{
        vm.appUrl ="https://itunes.apple.com/app/"
    }

    /*This is to convert 12 hour time format to 24 hour time format*/
    function convertTo24HourFormat(time) {
        var hours = Number(time.match(/^(\d+)/)[1]);
        var minutes = Number(time.match(/:(\d+)/)[1]);
        var AMPM = time.match(/\s(.*)$/)[1];
        if (AMPM == "PM" && hours < 12) hours = hours + 12;
        if (AMPM == "AM" && hours == 12) hours = hours - 12;
        var sHours = hours.toString();
        var sMinutes = minutes.toString();
        if (hours < 10) sHours = "0" + sHours;
        if (minutes < 10) sMinutes = "0" + sMinutes;
        return sHours + ":" + sMinutes;
    }

    /*Dynamically assigns class based on status*/
    function assignClass(status) {
        var className = '';
        if (status == 'Mostly cloudy') {
            className = 'mostlyCloudy';
        } else if (status == 'Partly cloudy') {
            className = 'partlyCloudy';
        } else if (status == 'Mostly clear') {
            className = 'sunny';
        } else if (status == 'Thunderstorms') {
            className = 'thunderstorm';
        } else if (status == 'Rain showers') {
            className = 'rainy';
        } else if (status == 'Cloudy') {
            className = 'cloudy';
        }
        return className;
    }
}