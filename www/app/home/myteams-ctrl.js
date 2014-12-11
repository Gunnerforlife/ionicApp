/**
 * Created by persi52 on 11/12/14.
 */
(function () {
    'use strict';

    angular.module('ionicApp').controller('MyTeamsCtrl', ['$state', 'myTeamsService', 'eliteApi', myTeamsCtrl]);

    function myTeamsCtrl($state, myTeamsService, eliteApi) {
        var vm = this;

        vm.myTeams = myTeamsService.getFollowedTeams();

        vm.goToTeam = function(team){
            eliteApi.setLeagueId(team.leagueId);
            $state.go("app.team-detail", { id: team.id });
        };
    };
})();