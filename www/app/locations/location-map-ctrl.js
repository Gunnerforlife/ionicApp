/**
 * Created by persi52 on 11/12/14.
 */
(function(){
    'use strict';

    angular.module('ionicApp').controller('LocationMapCtrl',['eliteApi','$scope','$stateParams',function(eliteApi,$scope,$stateParams){
        //var vm = this;

        $scope.locationId = Number($stateParams.id);
        console.log($scope.locationId);
        $scope.map = {
            center:{
                latitude:38.897677,
                longitude:-77.036530
            },
            zoom:12
        };

        $scope.marker = {}

        eliteApi.getLeagueData().then(function(data){

            $scope.location = _.find(data.locations, { id: $scope.locationId });
            $scope.marker = {
                coords:{
                    latitude: $scope.location.latitude,
                    longitude: $scope.location.longitude
                },
                options:{
                    title:$scope.location.name + "<br/>(Tap for directions)"
                },
                showWindow: true,
                key:$scope.locationId
            };

            $scope.map.center.latitude = $scope.location.latitude;
            $scope.map.center.longitude = $scope.location.longitude;
        });

        $scope.locationClicked = function(marker){
            window.location = "geo:" + marker.latitude + "," + marker.longitude + ";u=35";
        };

    }]);

})();


