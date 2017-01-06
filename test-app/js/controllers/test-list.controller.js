/**
 * Created by leha on 06.01.17.
 */
(function(){

    angular
        .module('testList', [])
        .controller('testList', ['$scope','getData', 'testData', function($scope, getData, testData){

            $scope.testData = testData;
            getData.getList().then(function(response){
                $scope.questions = response;
            });

            $scope.setId = function(id){
                testData.questionId = id;
            };

        }]);

})();