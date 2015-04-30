angular.module('tumblr')
  .factory('ApiService', function ($http, $q) {

    var ApiService = {};

    ApiService.fetchPosts = function(params){

      var deferred = $q.defer();
      var endpoint = getEndpoint(params);

      $http.jsonp(endpoint)
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(error){
          console.log('xoxoxo', error);
          deferred.reject(error);
        })

      return deferred.promise;
    }

    function getEndpoint(data){

      var baseUrl = 'http://' + data.blog + '.tumblr.com/api/read/json?&callback=JSON_CALLBACK';
      var params = '&filter=text&num=9&start=' + data.offset;

      return baseUrl + params;
    }

    return ApiService;

  });
