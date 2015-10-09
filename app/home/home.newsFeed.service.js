angular
    .module('app.home.newsFeed',[])
    .factory('newsFeed', newsFeed);

newsFeed.$inject = ['$http','$log'];

function newsFeed($http,$log) {
    return {
        getNewsFeed: getNewsFeed,
        getNewsSource: getNewsSource
    };

    /*get news*/
    function getNewsFeed() {
        return $http.get('assets/data/news_feeds.xml')
            .then(getNewsFeedComplete)
            .catch(getNewsFeedFailed);

        function getNewsFeedComplete(response) {
            return x2js.xml_str2json(response.data);
        }

        function getNewsFeedFailed(error) {
            $log.error('XHR Failed for getNewsFeed.' + error.data);
        }
    }

    /*Gets the news source i.e stories from the folder feeds/*.xml*/
    function getNewsSource(sourceId) {
        return $http.get('assets/data/feeds/' + sourceId + '.xml')
            .then(getNewsSourceComplete)
            .catch(getNewsSourceFailed);

        function getNewsSourceComplete(response) {
            return x2js.xml_str2json(response.data);
        }

        function getNewsSourceFailed(error) {
            $log.error('XHR Failed for getNewsSource.' + error.data);
        }
    }
}