angular.module('tumblr')
  .factory('ApiService', function ($http, $q) {

    var ApiService = {};;

    ApiService.fetchPosts = function(term){

      var deferred = $q.defer();

      var start = 0; //offset
      var endpoint = 'http://' + term + '.tumblr.com/api/read/json?num=30';

      $http.get(endpoint)
        .succes(function(response){
          deferred.resolve(data);
        })
        .error(function(error){
          deferred.reject(error);
        })

      return deferred.promise;

    }

    return ApiService;

  });
