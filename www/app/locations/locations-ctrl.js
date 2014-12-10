/**
 * Created by persi52 on 10/12/14.
 */
(function(){
    'use strict';

    angular.module('ionicApp').controller('LocationsCtrl',['eliteApi','$scope','$state',function(eliteApi,$scope,$state){
        //var vm = this;
        var data = eliteApi.getLeagueData();
        $scope.locations = data.locations;
    }
    ]);

})();