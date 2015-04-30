angular.module('tumblr')
  .factory('ApiService', function ($http, $q) {

    var ApiService = {};

    function getEndpoint(data){

      var base = 'http://api.tumblr.com/v2/blog/';
      var blog =  data.blog + '.tumblr.com'
      var params = '/posts?&callback=JSON_CALLBACK' + '&limit=15&offset=' + data.offset;
      var key = '&api_key=0dNpXFzkovKe7qBnN0hNoVaU7ArLUnCFARNALGgWv36NzxOQAS'

      return base + blog + params + key;

    }

    ApiService.fetchPosts = function(params){

      var deferred = $q.defer();

      var endpoint = getEndpoint(params);

      $http.jsonp(endpoint)
        .success(function(data){
          deferred.resolve(data.response);
        })
        .error(function(error){
          deferred.reject(error);
        })

      return deferred.promise;

    }

    return ApiService;

  });
