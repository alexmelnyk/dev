/**
 * Created by leha on 06.01.17.
 */
(function(){

    angular
        .module('testDetail', [])
        .controller('testDetail', ['$scope', 'getData', 'testData', function($scope, getData, testData){
            $scope.testData = testData;
            getData.getList().then(function(response){
                $scope.questions = response;
                $scope.done = [];
                $scope.answers = [];
                $scope.questionLength = $scope.questions.length;
                $scope.completeLength = 0;

                //set default data
                $scope.questions.forEach(function(item){
                    $scope.done[item.id] = false;
                    $scope.answers[item.id] = false;
                });

                // set default answers for each object
                $scope.testData.objects.forEach(function(object){
                    object.answers = [];
                    for (var i = 0; i < $scope.questionLength; i++){
                        object.answers.push(true);
                    }
                });

            });

            //check if question is answered
            $scope.isDone = function(questionId){
                $scope.done[questionId] = true;
                $scope.testData.done = $scope.done;
                $scope.completeLength++
                if ($scope.completeLength >= $scope.questionLength){
                    $scope.testData.complete = true;
                }
                $scope.setAnswers(questionId);
            };

            //set current answer for each object
            $scope.setAnswers = function(id){
                $scope.questions[id - 1].ansKey.forEach(function(answer){
                    $scope.testData.objects.forEach(function(object){
                        //this part check if object invalid
                        //checking by boolean AND
                        if (object.id == answer.id){
                            object.status = true; //set status to default if user changed mind
                            object.answers[id - 1] = answer.key[$scope.answers[id]];
                            for (var i = 0; i < $scope.questionLength; i++){
                                object.status = object.status * object.answers[i];
                            }
                        }
                    })
                });
            };

            //previous answer
            $scope.stepBack = function(){
                testData.questionId--;
            };

            //next answer, looped
            $scope.stepForward = function(){
                if (testData.questionId < $scope.questionLength){
                    testData.questionId++;
                } else {
                    testData.questionId = 1;
                }
            };
        }])

})();