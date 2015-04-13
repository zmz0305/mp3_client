// var demoApp = angular.module('demoApp', ['demoControllers']);

var demoApp = angular.module('demoApp', ['ngRoute', 'demoControllers', 'demoServices', '720kb.datepicker']);

demoApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/firstview', {
    templateUrl: 'partials/firstview.html',
    controller: 'FirstController'
  }).
  when('/secondview', {
    templateUrl: 'partials/secondview.html',
    controller: 'SecondController'
  }).
  when('/settings', {
    templateUrl: 'partials/settings.html',
    controller: 'SettingsController'
  }).
  when('/llamalist', {
    templateUrl: 'partials/llamalist.html',
    controller: 'LlamaListController'
  }).
      when('/userlist', {
          templateUrl: 'partials/userlist.html',
          controller: 'userListController'
      }).
      when('/tasklist', {
          templateUrl: 'partials/tasklist.html',
          controller: 'taskListController'
      }).
      when('/userdetail/:id', {
          templateUrl: 'partials/userdetail.html',
          controller: 'userDetailController'
      }).
      when('/taskdetail/:id', {
          templateUrl: 'partials/taskdetail.html',
          controller:'taskDetailController'
      }).
      when('/adduser', {
          templateUrl: 'partials/adduser.html',
          controller:'addUserController'
      }).
      when('/addtask', {
          templateUrl: 'partials/addtask.html',
          controller: 'addTaskController'
      }).
      when('/edittask/:id', {
          templateUrl: 'partials/edittask.html',
          controller: 'editTaskController'
      }).
  otherwise({
    redirectTo: '/settings'
  });
}]);