angular.module('tumblr')
  .controller('MainCtrl', function ($scope, ApiService) {

    $scope.posts = [];

    $scope.findPosts = function() {
      
      ApiService.fetchPosts($scope.name).then(
        function(data){

        },
        function(error){

        })
    }


  });
