/**
 * Created by persi52 on 10/12/14.
 */
(function (){
    'user strict';
    angular.module('ionicApp').factory('eliteApi',['$http','$q','$ionicLoading','DSCacheFactory',eliteApi]);

    function eliteApi($http, $q, $ionicLoading, DSCacheFactory){


        self.leaguesCache = DSCacheFactory.get("leaguesCache");
        self.leaguesDataCache = DSCacheFactory.get("leaguesDataCache");

        self.leaguesCache.setOptions({
            onExpire: function (key, value) {
                getLeagues()
                    .then(function () {
                        console.log("Leagues Cache was automatically refreshed.", new Date());
                    }, function () {
                        console.log("Error getting data. Putting expired item back in the cache.", new Date());
                        self.leaguesCache.put(key, value);
                    });
            }
        });

        self.leaguesDataCache.setOptions({
            onExpire: function (key, value) {
                getLeagueData()
                    .then(function () {
                        console.log("League Data Cache was automatically refreshed.", new Date());
                    }, function () {
                        console.log("Error getting data. Putting expired item back in the cache.", new Date());
                        self.leagueDataCache.put(key, value);
                    });
            }
        });

        self.staticCache = DSCacheFactory.get("staticCache");

        function setLeagueId(leagueId){
            self.staticCache.put("currentLeagueId", leagueId);
        }

        function getLeagueId(){
            var id = self.staticCache.get("currentLeagueId");
            console.log("in get leagueid", id);
            return id;
        }

        function getLeagues(){
            var deferred = $q.defer(),
                cacheKey = "leagues",
                leaguesData = self.leaguesCache.get(cacheKey);

            if(leaguesData){
                console.log("Found inside cache",leaguesData);
                deferred.resolve(leaguesData);
            }else{
                $ionicLoading.show({template:'Loading...'});
                $http.get("http://elite-schedule.net/api/leaguedata")
                    .success(function(data) {
                        self.leaguesCache.put(cacheKey,data);
                        $ionicLoading.hide();
                        deferred.resolve(data);
                    })
                    .error(function() {
                        console.log("Error while making HTTP call.");
                        $ionicLoading.hide();
                        deferred.reject();
                    });
            }

            return deferred.promise;
        }

        function getLeagueData(){
            console.log(getLeagueId());
            var deferred = $q.defer(),
                cacheKey = "leaguesData-"+getLeagueId(),
                leaguesData = self.leaguesDataCache.get(cacheKey);
            if(leaguesData){
                console.log("found data in cache",leaguesData);
                deferred.resolve(leaguesData);
            }else{
                $ionicLoading.show({template:'Loading...'});
                $http.get("http://elite-schedule.net/api/leaguedata/" + getLeagueId())
                    .success(function(data, status) {
                        console.log("Received schedule data via HTTP.", data, status);
                        self.leaguesDataCache.put(cacheKey,data);
                        $ionicLoading.hide();
                        deferred.resolve(data);
                    })
                    .error(function() {
                        console.log("Error while making HTTP call.");
                        $ionicLoading.hide();
                        deferred.reject();
                    });
            }
            return deferred.promise;
        }


        return{
            getLeagues:getLeagues,
            getLeagueData:getLeagueData,
            setLeagueId:setLeagueId
        };
    };

})();