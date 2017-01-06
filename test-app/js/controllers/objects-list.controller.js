/**
 * Created by leha on 06.01.17.
 */
(function(){

    angular
        .module('objectsList', [])
        .controller('objectsList', ['$scope','getData', 'testData', function($scope, getData, testData){

            $scope.testData = testData;
            getData.getList().then(function(response){
                $scope.questions = response;
            });

            $scope.objects = [
                {
                    id: 1,
                    status: true
                },
                {
                    id: 2,
                    status: true
                },
                {
                    id: 3,
                    status: true
                },
                {
                    id: 4,
                    status: true
                },
                {
                    id: 5,
                    status: true
                },
                {
                    id: 6,
                    status: true
                },
                {
                    id: 7,
                    status: true
                },
                {
                    id: 8,
                    status: true
                },
                {
                    id: 9,
                    status: true
                }
            ];

        }]);

})();