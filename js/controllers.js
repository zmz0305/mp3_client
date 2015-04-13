var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('FirstController', ['$scope', 'CommonData'  , function($scope, CommonData) {
  $scope.data = "";
   $scope.displayText = ""

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  };

}]);

demoControllers.controller('SecondController', ['$scope', 'CommonData' , function($scope, CommonData) {
  $scope.data = "";

  $scope.getData = function(){
    $scope.data = CommonData.getData();

  };

}]);


demoControllers.controller('LlamaListController', ['$scope', '$http', 'Llamas', '$window' , function($scope, $http,  Llamas, $window) {

  Llamas.get().success(function(data){
    $scope.llamas = data;
  });


}]);

demoControllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;

  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = $scope.url;
    $scope.displayText = "URL set";

  };

}]);

demoControllers.controller('userListController', ['$scope', '$window', 'Users', function($scope, $window, Users){
    Users.get().success(function(data){
        $scope.users = data.data;
    });
    $scope.refresh = function(){
        Users.get().success(function(data){
            $scope.users = data.data;
        });
    };
    $scope.deleteUser = function(id){
        Users.delete(id).success(function(){
            $scope.refresh();
        });
    };
    $scope.getUserDetail = function (id) {
        $window.sessionStorage.userId = id;
    };


}]);

demoControllers.controller('taskListController', ['$scope', '$http', '$filter', '$window', 'Tasks', function($scope, $http, $filter, $window, Tasks){
    Tasks.get().success(function(data){
        $scope.tasks = data.data;
        $scope.sort();
    });
    $scope.limit = 10;
    $scope.orderValue = "deadline";
    $scope.reverse = false;
    $scope.currentPage = 0;
    $scope.pagedItems = [];
    $scope.filteredItems = [];
    $scope.setReverse = function(flag){
        $scope.reverse = flag;
        $scope.refresh();
    };
    $scope.refresh = function(){
        Tasks.get().success(function(data){
            $scope.tasks = data.data;
            $scope.sort();
        });
        console.log("refreshed");
    };
    $scope.groupToPages = function(){
        //$scope.filteredItems = $filter('filter')($scope.tasks);
        $scope.pagedItems = [];
        for(var i=0; i<$scope.filteredItems.length; i++) {
            if (i % $scope.limit == 0)
                $scope.pagedItems[Math.floor(i / $scope.limit)] = [$scope.filteredItems[i]];
            else
                $scope.pagedItems[Math.floor(i / $scope.limit)].push($scope.filteredItems[i]);
        }
    };
    $scope.sort = function() {
        $scope.filteredItems = [];
        if($scope.orderValue != ''){
            $scope.filteredItems = $filter('orderBy')($scope.tasks, $scope.orderValue, $scope.reverse);
        }
        $scope.groupToPages();
    };
    $scope.prev = function(){
        if($scope.currentPage > 0){
            $scope.currentPage--;
        }
    }
    $scope.next = function(){
        if($scope.currentPage < $scope.pagedItems.length - 1){
            $scope.currentPage++;
        }
    }
    $scope.deleteTask = function(id){
        console.log("delete task: " + $window.sessionStorage.baseurl + "/api/tasks/" + id);
        Tasks.delete(id).
            success(function(){
                $scope.refresh();
            })
    };
}]);

demoControllers.controller('userDetailController', ['$scope', '$http', '$filter', '$routeParams', '$window', 'Users', 'Tasks', function($scope, $http, $filter, $routeparams, $window, Users, Tasks){
    var id = $routeparams.id;
    $scope.showComplete = false;
    $scope.userTasks = [];
    Users.getDetail(id).success(function(data){
        //console.log("get user detail: " + data.data);
        $scope.user = data.data;
        //console.log($scope.user.pendingTasks);
        for(var i =0; i<$scope.user.pendingTasks.length; i++){
            Tasks.getById($scope.user.pendingTasks[i]).success(function (data) {
                $scope.userTasks.push(data.data);
            });
        }
    });
    $scope.showCompleted = function(){
        $scope.showComplete = !$scope.showComplete;
    };

}]);

demoControllers.controller('addUserController', ['$scope', '$http', '$filter', '$routeParams', '$window', 'Users', function($scope, $http, $filter, $routeparams, $window, Users){
    $scope.master = {};
    $scope.update = function(user) {
        $scope.master = angular.copy(user);
        console.log($scope.master);
        Users.addUser($scope.master).success(function(data){
            $scope.msg = data.message;
        }).error(function(err){
            $scope.msg = err.message;
        });
    };



}]);

demoControllers.controller('taskDetailController', ['$scope', '$http', '$filter', '$routeParams', '$window', 'Users', 'Tasks', function($scope, $http, $filter, $routeparams, $window, Users, Tasks){
    var id = $routeparams.id;
    Tasks.getById(id).success(function(data){
        $scope.task = data.data;
    });
}]);

demoControllers.controller('addTaskController', ['$scope', '$http', '$filter', '$routeParams', '$window', 'Users', 'Tasks', function($scope, $http, $filter, $routeparams, $window, Users, Tasks){
    $scope.master = {};
    Users.get().success(function(data){
        $scope.users = data.data;
    });
    $scope.update = function(task){
        if(!task || !task.name || !task.deadline){
            $scope.msg = "fill in the required form first";
        }
        else {
            $scope.master = angular.copy(task);
            console.log($scope.master);
            Tasks.addTask($scope.master).success(function (data) {
                $scope.msg = data.message;
            }).error(function (err) {
                $scope.msg = err.message;
            });
            //$scope.master = angular.copy(task);
            //$scope.user = {};
            //if ($scope.nameAssigned) {
            //    $scope.master["assignedUserName"] = angular.copy($scope.nameAssigned.name);
            //}
            //$http.get($window.sessionStorage.baseurl + '/api/users?where={"name":"' + $scope.master.assignedUserName + '"}').success(function (data) {
            //    $scope.user = data.data[0];
            //    console.log($scope.user);
            //    $scope.master["assignedUser"] = $scope.user._id;
            //    Users.putUser($scope.master["assignedUser"], {pendingTasks: id}).success(function (data) {
            //        console.log("putUser: " + data.message);
            //    })
            //    Tasks.putTask(id, $scope.master).success(function (data) {
            //        $scope.msg = data.message;
            //    }).error(function (err) {
            //        $scope.msg = err.message;
            //    });
            //}).error(function (err) {
            //    $scope.msg = err.message;
            //});
        }
    };
}]);

demoControllers.controller('editTaskController', ['$scope', '$http', '$filter', '$routeParams', '$window', 'Users', 'Tasks', function($scope, $http, $filter, $routeparams, $window, Users, Tasks){
    $scope.master = {};
    var id = $routeparams.id;
    Tasks.getById(id).success(function(data){
        $scope.task = data.data;
    });
    Users.get().success(function(data){
        $scope.users = data.data;
    });
    $scope.update = function(task){
        if(!task.name || !task.deadline){
            $scope.msg = "fill in the required form first";
        }
        else {
            $scope.master = angular.copy(task);
            $scope.user = {};
            if ($scope.nameAssigned) {
                $scope.master["assignedUserName"] = angular.copy($scope.nameAssigned.name);
            }
            $http.get($window.sessionStorage.baseurl + '/api/users?where={"name":"' + $scope.master.assignedUserName + '"}').success(function (data) {
                $scope.user = data.data[0];
                console.log($scope.user);
                $scope.master["assignedUser"] = $scope.user._id;
                $scope.user.pendingTasks.push(id);
                console.log($scope.user);
                Users.putUser($scope.master["assignedUser"], $scope.user).success(function (data) {
                    console.log("putUser: " + data.message);
                }).error(function(err){
                    console.log("pushUser: " + data.message +err.toString());
                });
                Tasks.putTask(id, $scope.master).success(function (data) {
                    $scope.msg = data.message;
                }).error(function (err) {
                    $scope.msg = err.message;
                });
            }).error(function (err) {
                $scope.msg = err.message;
            });
        }
    };
    $scope.assignUser = function(name){
        console.log(name);
        $scope.task.assignedUserName = name;
    }
}]);




