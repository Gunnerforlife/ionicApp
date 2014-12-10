/**
 * Created by persi52 on 10/12/14.
 */
(function(){
    'use strict';

    angular.module('ionicApp').controller('LeaguesCtrl',['eliteApi','$scope',function(eliteApi,$scope){
        //var vm = this;

        var leagues = eliteApi.getLeagues();
        $scope.leagues = leagues;
    }
    ]);

})();