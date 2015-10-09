'use strict';

angular
    .module('app.weather', ['app.weather.route','app.home.weatherService'])
    .controller('WeatherController', WeatherController);

WeatherController.$inject = ['weatherService','$log', '$location', '$filter'];

function WeatherController(weatherService,$log, $location, $filter) {
    //Variable declarations
    var vm = this; //Assigning this[scope] to the controller alias name

    vm.pageTitle = "Weather Details";
    vm.weather =[];


    //Moved the just now from the json to here since that json is deprecated,
    // If possible move this to feed xml's in the future
    vm.updateTime = 'just now';

    //Method binding to the controller alias
    vm.goHome =goHome;
    vm.convertTo24HourFormat = convertTo24HourFormat;
    vm.formatDate = formatDate;
    vm.getStatusClass = getStatusClass;

    /*Api call initiation*/
    getWeatherInfo();

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
                vm.weather.locations.location.sfc_ob.sunrise_local = vm.convertTo24HourFormat(vm.weather.locations.location.sfc_ob.sunrise_local);
                return vm.weather;
            });
    }

    /*goHome*/
    function goHome(){
        $location.path('/home');
    }

    /*Converts the 12 hour format to 24 time format*/
    function convertTo24HourFormat(time) {
        var hours = Number(time.match(/^(\d+)/)[1]);
        var minutes = Number(time.match(/:(\d+)/)[1]);
        var AMPM = time.match(/\s(.*)$/)[1];
        if (AMPM == "pm" && hours < 12) hours = hours + 12;
        if (AMPM == "am" && hours == 12) hours = hours - 12;
        var sHours = hours.toString();
        var sMinutes = minutes.toString();
        if (hours < 10) sHours = "0" + sHours;
        if (minutes < 10) sMinutes = "0" + sMinutes;
        return sHours + ":" + sMinutes;
    }

    /*Formats the time in the specified  format*/
    function formatDate(input) {
        return $filter('date')(new Date(input), 'MMM dd') + 'th';
    }

    /*Dynamically assigns class based on status*/
    function getStatusClass(status) {
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