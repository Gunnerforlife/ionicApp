/**
 * Created by persi52 on 10/12/14.
 */
(function(){
    'use strict';

    angular.module('ionicApp').controller('gameCtrl',['eliteApi','$scope','$stateParams',function(eliteApi,$scope,$stateParams){
        //var vm = this;
        var gameId = Number($stateParams.id);
        console.log('this is it'+$stateParams.id);
        var data = eliteApi.getLeagueData();
        $scope.game = _.find(data.games, {"id":gameId});
        console.log($scope.game);
    }
    ]);

})();