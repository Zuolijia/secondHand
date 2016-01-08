/**
 * Created by Administrator on 2015/12/28 0028.
 */
var app = angular.module('LoginApp', []);
app.controller('loginController', function ($scope, $http, $window) {
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $scope.loginForm = function () {
        $http.post('http://sysuflea.sinaapp.com/login', {
            "account": $scope.user_name,    //使用的是邮箱登录
            "password": $scope.user_password
        }).success(function (data, status, headers, config) {
            /**
             *  RETURN:
             *      userId userName
             *  STATE:
             *      succed:1,incorrect password:2,inexistent user:3
             */
            if (data.state == 1) {
                window.localStorage.setItem("user_id",data.userId);
                window.localStorage.setItem("user_name", data.userName);
                alert("登录成功");
                $window.location.href = "../main.html";
            } else if (data.state == 2) {
                alert("incorrect password");
            } else if (data.state == 3) {
                alert("inexistent user");
            } else {
                alert("未知错误");
            }
        }).error(function (data, status, headers, config) {
            alert("登录错误，请重新尝试");
        });
    }
});