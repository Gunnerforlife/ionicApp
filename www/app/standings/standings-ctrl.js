/**
 * Created by persi52 on 10/12/14.
 */
(function(){
    'use strict';

    angular.module('ionicApp').controller('standingsCtrl',['eliteApi','$scope','$state',function(eliteApi,$scope,$state){
        //var vm = this;
        eliteApi.getLeagueData().then(function(data){
            console.log(data);
            $scope.standings = data.standings;
        });
    }
    ]);

})();