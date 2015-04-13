// js/services/todos.js
angular.module('demoServices', [])
        .factory('CommonData', function(){
        var data = "";
        return{
            getData : function(){
                return data;
            },
            setData : function(newData){
                data = newData;                
            }
        }
    })
    .factory('Llamas', function($http, $window) {      
        return {
            get : function() {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/api/llamas');
            }
        }
    })
    .factory('Users', function($http, $window){
        return {
            get : function(){
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl + '/api/users');
            },
            delete: function(id){
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.delete((baseUrl + '/api/users/' + id));
            },
            getDetail : function(id) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get((baseUrl + '/api/users/' + id));
            },
            addUser : function(data) {
                var baseUrl = $window.sessionStorage.baseurl;
                console.log(data)
                //return $http({
                //    url: baseUrl+'/api/users',
                //    method: "POST",
                //    data: data,
                //    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                //});
                return $http.post(baseUrl + '/api/users', data);

            },
            putUser: function(id, data) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http({
                    url: baseUrl + '/api/users/' + id,
                    method: "put",
                    data: data
                });
            }
        }
    })
    .factory('Tasks', function($http, $window){
        return {
            get : function(){
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get((baseUrl + '/api/tasks'));
            },
            delete: function(id){
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.delete((baseUrl + '/api/tasks/' + id));
            },
            getById: function(id) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get((baseUrl + '/api/tasks/' + id));
            },
            addTask: function(data) {
                var baseUrl = $window.sessionStorage.baseurl;
                console.log(data);
                return $http.post(baseUrl + '/api/tasks', data);
            },
            putTask: function(id, data) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http({
                    url: baseUrl + '/api/tasks/' + id,
                    method: "put",
                    data: data
                });
            }
        }
    })
    .factory('UserDetail', function($http, $window){
        return {
            getDetail : function(id) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get((baseUrl + '/api/users/' + id));
            }
        }
    })
    ;
