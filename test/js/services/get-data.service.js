/**
 * Created by leha on 06.01.17.
 */
(function(){

    angular
        .module('getData', [])
        .service('getData', function($http){
            return {
                getList: function(){
                    return $http.get('tsconfig.json').then(function (response) {
                        if (response.data.error) {
                            return null;
                        } else {
                            return response.data;
                        }
                    });
                }
            };
        })
        .service('testData', function(){
            return{
                questionId : 1,
                done: [],
                complete: false,
                objects : [
                {
                    id: 1,
                    logo: 'demeevka.jpg',
                    status: true
                },
                {
                    id: 2,
                    logo: 'gatne.jpg',
                    status: true
                },
                {
                    id: 3,
                    logo: 'malahit.jpg',
                    status: true
                },
                {
                    id: 4,
                    logo: 'nyvky.jpg',
                    status: true
                },
                {
                    id: 5,
                    logo: 'parkovi.jpg',
                    status: true
                },
                {
                    id: 6,
                    logo: 'teremky.jpg',
                    status: true
                },
                {
                    id: 7,
                    logo: 'tradytsia.jpg',
                    status: true
                },
                {
                    id: 8,
                    logo: 'vidradny.jpg',
                    status: true
                },
                {
                    id: 9,
                    logo: 'yaskravy.jpg',
                    status: true
                }
            ]
            }
        });

})();