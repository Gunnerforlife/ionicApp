/**
 * Created by persi52 on 10/12/14.
 */
(function (){
    'use strict';
    angular.module('ionicApp').controller('teamDetailCtrl',['$stateParams',teamDetailCtrl]);
    function teamDetailCtrl($stateParams){
        console.log('wtf!!');
        console.log("$stateParams", $stateParams);
    };

})();