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
          deferred.reject(error);
        })

      return deferred.promise;
    }

    function getEndpoint(data){

      var baseUrl = 'http://' + data.blog + '.tumblr.com/api/read/json';
      var params = '?&callback=JSON_CALLBACK&filter=text&num=9&start=' + data.offset;

      return baseUrl + params;
    }

    return ApiService;

  });
