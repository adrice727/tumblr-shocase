angular.module('tumblr')
  .controller('MainCtrl', function ($scope, ApiService) {

    $scope.blog = {
      title: '',
      posts: []
    };
    
    var blogLoaded =false;
    var offset = 0;
    var waiting = false;

    $scope.loadPosts = function(scroll) {

      // Prevent api call by infinite scroll if no blog
      if ( !blogLoaded && scroll ) { return; }

      // Load called by infinite scroll
      if ( scroll ) {
        offset += 9;  
      } else {
        offset = 0;
      }
      
      ApiService.fetchPosts({blog: $scope.searchText, offset: offset}).then(
        function(data){
          if ( data.length === 0 ) {
            $scope.blog.title = 'No posts found . . .';
          } else {
            if ( scroll ) {
              $scope.blog.posts.push.apply($scope.blog.posts,data.posts);
            } else {
              $scope.blog.title = data.blog.title;
              $scope.blog.url = data.blog.url;
              $scope.blog.posts = data.posts;
            }
            blogLoaded = true;
          }
        },
        function(error){
        })

    }
  });
