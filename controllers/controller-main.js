angular.module('tumblr')
  .controller('MainCtrl', function ($scope, ApiService) {

    $scope.posts = [];
    var currentBlog = ''
    var offset = 0;
    var waiting = false;

    $scope.loadPosts = function(scroll) {

      // Load called by infinite scroll
      if ( scroll ) {
        offset += 20;
      } else {
        offset = 0;
      }
      
      ApiService.fetchPosts({blog: $scope.blogName, offset: offset}).then(
        function(data){
          console.log('data HEREHEHR', data);
        },
        function(error){

        })

    }
  });
