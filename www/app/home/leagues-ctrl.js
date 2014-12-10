/**
 * Created by persi52 on 10/12/14.
 */
(function(){
    'use strict';

    angular.module('ionicApp').controller('LeaguesCtrl',['eliteApi','$scope','$state',function(eliteApi,$scope,$state){
        //var vm = this;

        eliteApi.getLeagues().then(function(data){
            $scope.leagues = data;
        });
        $scope.selectLeague = function(leagueId){
            eliteApi.setLeagueId(leagueId);
            $state.go("app.teams");
        };
    }
    ]);

})();