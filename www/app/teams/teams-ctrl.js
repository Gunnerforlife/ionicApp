/**
 * Created by persi52 on 10/12/14.
 */
(function(){
    'use strict';

    angular.module('ionicApp').controller('teamsCtrl',['eliteApi','$scope','$state',function(eliteApi,$scope,$state){
        //var vm = this;
        eliteApi.getLeagueData().then(function(data){
            console.log('in teams control');
            console.log(data);
            $scope.teams = data.teams;
        });
        $scope.loadList = function(forceRefresh){
            eliteApi.getLeagueData(forceRefresh).then(function(data){
                console.log('in teams control');
                console.log(data);
                $scope.teams = data.teams;
            }).finally(function(){
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.loadList(false);
    }
    ]);

})();