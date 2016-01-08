/**
 * Created by Administrator on 2015/12/28 0028.
 */
var app = angular.module('SignupApp', []);

app.directive('pwCheck', [function () {
    return {
        require: "ngModel",
        link: function (scope, ele, attrs, ngModelController) {
            var otherInput = ele.inheritedData("$formController")[attrs.pwCheck];
            ngModelController.$parsers.push(function (value) {
                if (value == otherInput.$viewValue) {
                    ngModelController.$setValidity("repeat", true);
                    return value;
                }
                ngModelController.$setValidity("repeat", false);
            });
            otherInput.$parsers.push(function (value) {
                ngModelController.$setValidity("repeat", value == ngModelController.$viewValue);
                return value;
            });
        }
    };
}]);
app.controller('signupController', function ($scope, $http,$window) {
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    //var data = {
    //    "userName": $scope.user_name,
    //    "password": $scope.user_password,
    //    "phoneNum": $scope.phone_number,
    //    "email": $scope.email,
    //    "location": $scope.address,
    //    "school": $scope.school,
    //    "QQ": $scope.QQ_number
    //};
    $scope.signupForm = function () {
        $http.post('http://sysuflea.sinaapp.com/register',{
            "userName": $scope.user_name,
            "password": $scope.user_password,
            "phoneNum": $scope.phone_number,
            "email": $scope.email,
            "location": $scope.address,
            "school": $scope.school,
            "QQ": $scope.QQ_number
        }).success(function (data, status, headers, config) {
            if (data.state == 1) {
                alert("注册成功");
                $window.location.href="../view/login.html";
            } else if (data.state == 2) {
                alert("email or phoneNUM registered");
            } else if (data.state == 0) {
                alert("注册失败");
            } else {
                alert("未知错误");
            }
        }).error(function (data, status, headers, config) {
            //处理错误
            alert("错误");
        })
    }
});