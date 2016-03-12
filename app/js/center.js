/**
 * Created by Administrator on 2016/1/1 0001.
 */

// Start for center.html controller
/**
 *  /item/collections(get)
 *  PARAMS:
 *      userId(string)
 *  RETURN:
 *      items(list)
 *          itemId(string)
 *          title(string)
 */
app.controller('personCollectionController', function ($scope, $http, $window) {
    /* 获取个人收藏信息条目 */
    var userId = window.localStorage.getItem("user_id");
    $http.get("http://sysuflea.sinaapp.com/item/collections", {params: {"userId": userId}})
        .success(function (data, status, headers, config) {
            if (data.state == 1) {
                var dataObj = new Array(data.items.length);
                for (var i = 0; i < data.items.length; i++) {
                    dataObj[i] = {message: data.items[i][1], id: data.items[i][0]};
                }
                $scope.collections = dataObj;
            } else {
                alert("获取个人收藏信息条目失败");
            }
        }).error(function (data, status, headers, config) {

        });
    //$scope.collections = [
    //    {message: "遮光窗帘八成新", id: "1"},
    //    {message: "网球拍蓝色", id: "2"},
    //    {message: "大学城女装车蓝色，赠锁", id: "3"}
    //];

    $scope.goToGoods = function (id) {
        //alert("goToGoodsID" + id);
        $window.location.href = "detail.html#?id=" + id;
    }
});

/**
 *  /item/sellingProducts(get)
 *  PARAMS:
 *      userId(string)
 *  RETURN:
 *      items(list)
 *          itemId(string)
 *          title(string)
 *          state(int) - 0:selling 1:sold
 */
app.controller('personSaleController', function ($scope, $http, $window) {
    var userId = window.localStorage.getItem("user_id");
    $http.get("http://sysuflea.sinaapp.com/item/sellingProducts", {params: {"userId": userId}})
        .success(function (data, status, headers, config) {
            if (data.state == 1) {
                var dataObj = new Array(data.items.length);
                for (var i = 0; i < data.items.length; i++) {
                    dataObj[i] = {
                        message: data.items[i][1],
                        status: (data.items[i][2] == 0 ? "未卖出" : "已出售"),
                        id: data.items[i][0]
                    };
                }
                $scope.sales = dataObj;
            } else {
                alert("获取个人卖单条目失败");
            }
            //alert(data);
        }).error(function (data, status, headers, config) {

        });
    //$scope.sales = [
    //    {message: "出售托福、GRE考试书籍", status: "未卖出", id: "4"},
    //    {message: "雅思真题7-10转让", status: "未卖出", id: "5"}
    //];

    $scope.goToGoods = function (id) {
        //alert("goToGoodsID" + id);
        $window.location.href = "detail.html#?id=" + id;
    }
});

app.controller('infoTitleCtrl', function ($scope, $http, $rootScope) {
    $scope.btModify = true;
    var person_name = document.getElementById("displayNick");
    var user_id = window.localStorage.getItem("user_id");
    person_name.innerHTML = window.localStorage.getItem("user_name");

    /* 初始化个人信息 */
    $http.get("http://sysuflea.sinaapp.com/user", {params: {"userId": user_id}})
        .success(function (data, status, headers, config) {
            $scope.nickname = data.result.userName;
            $scope.realname = data.result.realName;
            $scope.phone = data.result.phoneNum;
            $scope.qq = data.result.QQ;
            $scope.locate = data.result.location;
            $scope.school = data.result.school;
        }).error(function (data, status, headers, config) {
            alert("获取不到信息");
        });

    $scope.modify = function () {
        $scope.btModify = !$scope.btModify;
    };
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
    $scope.confirmModify = function () {
        $scope.btModify = !$scope.btModify;
        var person_name = document.getElementById("displayNick");
        person_name.innerHTML = $scope.nickname;
        $rootScope.name = $scope.nickname;
        $http.post('http://sysuflea.sinaapp.com/user', {
            "userId": user_id,
            "userName": $scope.nickname,
            "realName": $scope.realname,
            "QQ": $scope.qq,
            "location": $scope.locate,
            "school": $scope.school
        }).success(function (data, status, headers, config) {
            if (data.state == 1) {
                alert("修改成功");
                window.localStorage.setItem("user_name", $scope.nickname);
            }
            else {
                alert("无法修改，未知错误");
            }
        }).error(function (data, status, headers, config) {
            alert("连接失败");
        })
    };
});
// End for center.html controller

// Start for collection.html controller
app.controller('getCollectionOrderCtrl', function ($scope, $http) {
    var userId = window.localStorage.getItem("user_id");
    $http.get("http://sysuflea.sinaapp.com/item/collections", {params: {"userId": userId}})
        .success(function (data, status, headers, config) {
            if (data.state == 1) {
                var dataObj = new Array(data.items.length);
                for (var i = 0; i < data.items.length; i++) {
                    dataObj[i] = {name: data.items[i][1], picPath: data.items[i][2], id: data.items[i][0]};
                }
                $scope.collectionOrders = dataObj;
            } else {
                alert("获取个人收藏信息条目失败");
            }
        }).error(function (data, status, headers, config) {

        });
    $scope.cancelCollect = function (index) {
        /**
         *
         * @type {string}
         */
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        $http.post('http://sysuflea.sinaapp.com/item/removeCollection', {
            "userId": userId,
            "itemId": $scope.collectionOrders[index].id
        }).success(function (data, status, headers, config) {
            if (data.state == 1) {
                alert("已取消收藏");
                $scope.collectionOrders.splice(index,1);
            } else {
                alert("取消收藏失败，未知错误");
            }
        }).error(function (data, status, headers, config) {
            alert("连接失败");
        });
    };
    //$scope.collectionOrders = [
    //    {name: "遮光窗帘八成新", picPath: "../img/窗帘.jpg", id: "1"},
    //    {name: "网球拍蓝色", picPath: "../img/网球拍.jpg", id: "2"}
    //];
});
// End for collection.html controller

// Start for sale.html controller
app.controller('getSaleOrderCtrl', function ($scope) {

    $scope.saleOrders = [
        {name: "出售托福、GRE考试备考资料", picPath: "../img/托福.jpg", status: "未卖出", id: "1"},
        {name: "网球拍蓝色", picPath: "../img/网球拍.jpg", status: "已下架", id: "2"}
    ];
});
// End for sale.html controller