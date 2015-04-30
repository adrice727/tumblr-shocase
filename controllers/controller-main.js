angular.module('tumblr')
  .controller('MainCtrl', function ($scope, ApiService) {

    $scope.blog = {
      title: '',
      posts: []
    };
    
    var blogLoaded =false;
    var offset = 0;
    $scope.waiting = false; // Prevent duplicate api calls from infinite scroll
    $scope.loadPosts = function(scroll) {

      // Prevent api call by infinite scroll if no blog loaded
      if ( !blogLoaded && scroll ) { return; }
      $scope.waiting = true;

      // Load called by infinite scroll
      if ( scroll ) {
        offset += 9;  
      } else {
        offset = 0;
      }
      
      ApiService.fetchPosts({blog: $scope.searchText, offset: offset})
      .then(function(data){
          if ( !scroll && data.posts.length === 0 ) {
            $scope.blog.title = 'No posts found . . .';
          } else {
            if ( scroll ) {
              $scope.blog.posts.push.apply($scope.blog.posts, data.posts);
            } else {
              $scope.blog.title = data.tumblelog.title;
              $scope.blog.posts = data.posts;
            }
            blogLoaded = true;
          }
          $scope.waiting = false;
      })
      .catch(function(error) {
        // Initial search or new search after loading blog
        if ( $scope.blog.posts.length === 0 || !scroll ) {
          $scope.blog.title = 'No posts found . . .';
          // Clear current posts if searching for new blog
          if ( !scroll ) { $scope.blog.posts = []; }
        }
      })
    }
  });
