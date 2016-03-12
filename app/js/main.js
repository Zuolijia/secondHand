/**
 * Created by Administrator on 2015/12/1 0001.
 */
var app = angular.module('app', []);

//top_bar的控制器，负责定位城市，判断登录状态显示右上角信息
app.controller('GetCityController', function ($scope, $window, $rootScope) {
    $scope.name = "";
    var x = document.getElementById("mycity");
    x.innerHTML = "定位中...";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function getSuccess(position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                var map = new BMap.Map("allmap");
                var point = new BMap.Point(longitude, latitude);
                var gc = new BMap.Geocoder();
                gc.getLocation(point, function (rs) {
                    var addComp = rs.addressComponents;
                    //alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                    x.innerHTML = addComp.city;
                });
            },
            function getError(error) {
                switch (error.code) {
                    case error.TIMEOUT:
                        alert('获取信息超时');
                        break;
                    case error.PERMISSION_DENIED:
                        alert('位置服务被拒绝');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert('暂时获取不到位置信息');
                        break;
                    default:
                        alert('未知错误');
                        break;
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
    }
    else {
        x.innerHTML = "广州";//default值
    }

    var cBox = this;
    cBox.provinceArr = provinceArr;//省份数据
    cBox.cityArr = cityArr;         //城市数据
    cBox.getCityArr = cBox.cityArr[0];//默认省份
    cBox.getCityIndexArr = ['0', '0'];//索引数组，根据切换得出切换的索引就可以得到省份及城市

    //改变省份触发的事件[根据索引更改城市数据]
    cBox.provinceChange = function (index) {
        cBox.getCityArr = cBox.cityArr[index];
        cBox.getCityIndexArr[1] = '0';
        cBox.getCityIndexArr[0] = index;
        //输出查看数据
        console.log(cBox.getCityIndexArr, provinceArr[cBox.getCityIndexArr[0]], cityArr[cBox.getCityIndexArr[0]][cBox.getCityIndexArr[1]]);
    };

    //改变城市触发事件
    cBox.cityChange = function (index) {
        cBox.getCityIndexArr[1] = index;
        //输出查看数据
        console.log(cBox.getCityIndexArr, provinceArr[cBox.getCityIndexArr[0]], cityArr[cBox.getCityIndexArr[0]][cBox.getCityIndexArr[1]]);
        x.innerHTML = cityArr[cBox.getCityIndexArr[0]][cBox.getCityIndexArr[1]];
    };

    $scope.exit = function () {
        window.localStorage.setItem("user_name", "");
        window.localStorage.setItem("user_id", "");
        $window.location.reload();
        alert("已退出");
    };

    var name = window.localStorage.getItem("user_name");
    var sig = document.getElementById("signupAndLogin");
    var detail = document.getElementById("myDetail");
    if (name != null && name != "") {
        $rootScope.name = name;
        sig.style.display = "none";
        detail.style.display = "block"
    }
    else {
        detail.style.display = "none";
        sig.style.display = "block";
    }
    //alert("参数为："+ $location.search().test + $location.search().id);

});

//Start for main.html controller
app.controller('GetMainInfCtr', function ($scope, $window, $http) {
    $http.get('http://sysuflea.sinaapp.com/page/front')
        .success(function (data, status, headers, config) {
            // Abroad Hots Information get
            var foreignBooks = new Array(data.foreignBooks.length);
            for (var i = 0; i < data.foreignBooks.length; i++) {
                var cvtdate = (data.foreignBooks[i][2][1] < 9 ? ("0" + data.foreignBooks[i][2][1]) : data.foreignBooks[i][2][1]) + "-" + (data.foreignBooks[i][2][2] < 9 ? ("0" + data.foreignBooks[i][2][2]) : data.foreignBooks[i][2][2]);
                foreignBooks[i] = {message: data.foreignBooks[i][1], date: cvtdate, id: data.foreignBooks[i][0]};
                //alert(foreignBooks[i].date);
            }
            $scope.abroad_hots = foreignBooks;

            // Teaching Hots Information get
            var proMaterials = new Array(data.professionalMaterials.length);
            for (var i = 0; i < data.professionalMaterials.length; i++) {
                var cvtdate = (data.professionalMaterials[i][2][1] < 9 ? ("0" + data.professionalMaterials[i][2][1]) : data.professionalMaterials[i][2][1]) + "-" + (data.professionalMaterials[i][2][2] < 9 ? ("0" + data.professionalMaterials[i][2][2]) : data.professionalMaterials[i][2][2]);
                proMaterials[i] = {
                    message: data.professionalMaterials[i][1],
                    date: cvtdate,
                    id: data.professionalMaterials[i][0]
                };
            }
            $scope.teaching_hots = proMaterials;

            // Bike Hots Information get
            var bikecycles = new Array(data.bikecycles.length);
            for (var i = 0; i < data.bikecycles.length; i++) {
                var cvtdate = (data.bikecycles[i][2][1] < 9 ? ("0" + data.bikecycles[i][2][1]) : data.bikecycles[i][2][1]) + "-" + (data.bikecycles[i][2][2] < 9 ? ("0" + data.bikecycles[i][2][2]) : data.bikecycles[i][2][2]);
                bikecycles[i] = {message: data.bikecycles[i][1], date: cvtdate, id: data.bikecycles[i][0]};
            }
            $scope.bike_hots = bikecycles;

            // Ele Hots Information get
            var appliances = new Array(data.appliances.length);
            for (var i = 0; i < data.appliances.length; i++) {
                var cvtdate = (data.appliances[i][2][1] < 9 ? ("0" + data.appliances[i][2][1]) : data.appliances[i][2][1]) + "-" + (data.appliances[i][2][2] < 9 ? ("0" + data.appliances[i][2][2]) : data.appliances[i][2][2]);
                appliances[i] = {message: data.appliances[i][1], date: cvtdate, id: data.appliances[i][0]};
            }
            $scope.ele_hots = appliances;
            $scope.electricals = appliances;

            // Books Information get
            var books = new Array(data.books.length);
            for (var i = 0; i < data.books.length; i++) {
                var cvtdate = (data.books[i][2][1] < 9 ? ("0" + data.books[i][2][1]) : data.books[i][2][1]) + "-" + (data.books[i][2][2] < 9 ? ("0" + data.books[i][2][2]) : data.books[i][2][2]);
                books[i] = {message: data.books[i][1], date: cvtdate, id: data.books[i][0]};
            }
            $scope.books = books;

            // Transportations Information get
            var transp = new Array(data.transportations.length);
            for (var i = 0; i < data.transportations.length; i++) {
                var cvtdate = (data.transportations[i][2][1] < 9 ? ("0" + data.transportations[i][2][1]) : data.transportations[i][2][1]) + "-" + (data.transportations[i][2][2] < 9 ? ("0" + data.transportations[i][2][2]) : data.transportations[i][2][2]);
                transp[i] = {message: data.transportations[i][1], date: cvtdate, id: data.transportations[i][0]};
            }
            $scope.traffics = transp;

            // Groceies Information get
            var groceries = new Array(data.groceries.length);
            for (var i = 0; i < data.groceries.length; i++) {
                var cvtdate = (data.groceries[i][2][1] < 9 ? ("0" + data.groceries[i][2][1]) : data.groceries[i][2][1]) + "-" + (data.groceries[i][2][2] < 9 ? ("0" + data.groceries[i][2][2]) : data.groceries[i][2][2]);
                groceries[i] = {message: data.groceries[i][1], date: cvtdate, id: data.groceries[i][0]};
            }
            $scope.dailyUses = groceries;

            // Entertainments Information get
            var entertainments = new Array(data.entertainments.length);
            for (var i = 0; i < data.entertainments.length; i++) {
                var cvtdate = (data.entertainments[i][2][1] < 9 ? ("0" + data.entertainments[i][2][1]) : data.entertainments[i][2][1]) + "-" + (data.entertainments[i][2][2] < 9 ? ("0" + data.entertainments[i][2][2]) : data.entertainments[i][2][2]);
                entertainments[i] = {message: data.entertainments[i][1], date: cvtdate, id: data.entertainments[i][0]};
            }
            $scope.sport = entertainments;
        }).error(function (data, status, headers, config) {
            alert('error');
        });
    //$scope.abroad_hots = [
    //    {message: "出售托福、GRE考试书籍", date: "09-23", id: "1"},
    //    {message: "雅思真题7-10转让", date: "09-23", id: "2"},
    //    {message: "托福词汇8成新", date: "09-21", id: "3"},
    //    {message: "GMAT复习资料整套，中珠", date: "09-21", id: "4"},
    //    {message: "雅思整套考试资料7成新", date: "09-19", id: "5"}
    //];
    // $scope.teaching_hots = [
    //     {message: "司法考试全套复习题大学城", date: "09-23", id: ""},
    //     {message: "大英二级班整套教材8成新", date: "09-23", id: ""},
    //     {message: "中大行政管理自考书籍", date: "09-23", id: ""},
    //     {message: "10本考研政治辅导用书", date: "09-21", id: ""},
    //     {message: "高数数一教材，附考试福利", date: "09-19", id: ""}
    // ];
    // $scope.bike_hots =[
    //     {message: "上海凤凰牌女装车7成新", date: "09-23", id: ""},
    //     {message: "山地车 中珠交易", date: "09-23", id: ""},
    //     {message: "可折叠小轮车", date: "09-21", id: ""},
    //     {message: "大学城女装车蓝色，赠锁", date: "09-21", id: ""}
    // ];
    // $scope.ele_hots = [
    //     {message: "上海凤凰牌女装车7成新", date: "09-23", id: ""},
    //     {message: "山地车 中珠交易", date: "09-23", id: ""},
    //     {message: "可折叠小轮车", date: "09-21", id: ""},
    //     {message: "大学城女装车蓝色，赠锁", date: "09-21", id: ""}
    // ];
    // $scope.books = [
    //     {message: "出售托福、GRE考试书籍", date: "09-23", id: ""},
    //     {message: "雅思真题7-10转让", date: "09-23", id: ""},
    //     {message: "托福词汇8成新", date: "09-21", id: ""},
    //     {message: "GMAT复习资料整套，中珠", date: "09-21", id: ""},
    //     {message: "雅思整套考试资料7成新", date: "09-19", id: ""},
    //     {message: "司法考试全套复习题大学城", date: "09-23", id: ""},
    //     {message: "大英二级班整套教材8成新", date: "09-23", id: ""},
    //     {message: "中大行政管理自考书籍", date: "09-23", id: ""},
    //     {message: "10本考研政治辅导用书", date: "09-21", id: ""},
    //     {message: "高数数一教材，附考试福利", date: "09-19", id: ""}
    // ];
    //$scope.traffics = [
    //    {message: "上海凤凰牌女装车7成新", date: "09-23", id: ""},
    //    {message: "山地车 中珠交易", date: "09-23", id: ""},
    //    {message: "可折叠小轮车", date: "09-21", id: ""},
    //    {message: "大学城女装车蓝色，赠锁", date: "09-21", id: ""}
    //];
    //$scope.dailyUses = [
    //    {message: "遮光床帘八成新", date: "09-23", id: ""},
    //    {message: "史努比床帘大学城", date: "09-21", id: ""},
    //    {message: "dior香水迷你版，用过一次", date: "09-21", id: ""}
    //];
    //$scope.electricals = [
    //    {message: "收音机8成新，比学校的好", date: "09-23", id: ""},
    //    {message: "学校大众款收音机", date: "09-23", id: ""},
    //    {message: "小天鹅洗衣机，无故障7成新", date: "09-21", id: ""},
    //    {message: "", date: "", id: ""}
    //];
    //$scope.sports = [
    //    {message: "网球拍蓝色", date: "09-23", id: ""},
    //    {message: "羽毛球拍凯胜", date: "09-21", id: ""},
    //    {message: "瑜伽垫", date: "09-21", id: ""},
    //    {message: "", date: "", id: ""}
    //];
    $scope.goToGoods = function (id) {
        $window.location.href = "view/detail.html#?" + id;
    }
});

// End for main.html controller

// Start for detail.html controller
app.controller('getGoodsDetailCtrl', function ($scope, $http, $location) {
    var userId = window.localStorage.getItem("user_id");
    var itemId = $location.search().id;
    //alert("itemId:" + itemId);
    /**
     *  get itemGood detail
     *  /item
     *  item:
     *      itemId userId userName title catalogo sub price IsBargin tradelocate recency description postDate trademethod status 5imgs
     *      postDate(tm_year,tm_mon,tm_mday,tm_hour,tm_min,tm_sec,tm_wday,tm_yday,tm_isdst)
     *  user:
     *      userId userName phone QQ
     * @type {{name: string, IsBargin: string, price: string, locate: string, method: string, salePerson: string, phone: string, qq: string, date: string, description: string, picPaths: string[]}}
     */
    $http.get('http://sysuflea.sinaapp.com/item', {params: {"itemId": itemId}})
        .success(function (data, status, headers, config) {
            $scope.goods.name = data.item[3];
            $scope.goods.IsBargin = data.item[7] == 1 ? "可议价" : "不可议价";
            $scope.goods.price = data.item[6] + "元";
            //$scope.goods.locate = data.item[8];
            switch(data.item[8]){
                case 0:
                    $scope.goods.locate="中珠";
                    break;
                case 1:
                    $scope.goods.locate="南校";
                    break;
                case 2:
                    $scope.goods.locate="大学城";
                    break;
                case 3:
                    $scope.goods.locate="北校";
                    break;
                case 4:
                    $scope.goods.locate="北师珠";
                    break;
                case 5:
                    $scope.goods.locate="UIC";
                    break;
                default :
                    $scope.goods.locate="无法获取";
            }
            $scope.goods.method = data.item[12] == 1 ? "面对面交易" : (data.item[12] == 2 ? "快递" : "面对面、快递");
            $scope.goods.salePerson = data.item[2];
            $scope.goods.phone = data.user[2];
            $scope.goods.qq = data.user[3];
            $scope.goods.date = (data.item[11][1] > 9 ? data.item[11][1] : ("0" + data.item[11][1])) + "-" + (data.item[11][2] > 9 ? data.item[11][2] : ("0" + data.item[11][2]));
            $scope.goods.description = data.item[10];
            $scope.goods.id = data.item[0];
            var picLen = 0;
            for (var i = 0; i < 5; i++) {
                if (data.item[14 + i] == "") {
                    break;
                }
                picLen++;
            }
            var picArray = new Array(picLen);
            for (var i = 0; i < picLen; i++) {
                picArray[i] = data.item[14 + i];
            }
            $scope.goods.picPaths = picArray;
        }).error(function (data, status, headers, config) {

        });
    /**
     * /item/collect(post)
     * PARAMs:
     *      itemId userId
     * STATE:
     *      1:success 0:failed
     */
    $scope.addCollection = function (id) {
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        $http.post('http://sysuflea.sinaapp.com/item/collect', {
            "userId": userId,
            "itemId": id
        }).success(function (data, status, headers, config) {
            if (data.state == 1) {
                alert("添加收藏成功");
            }
            else {
                alert("无法添加，未知错误");
            }
        }).error(function (data, status, headers, config) {
            alert("连接失败");
        })
    };
    $scope.goods = {
        name: "test",
        IsBargin: "不可议价",
        price: "0元",
        locate: "test",
        method: "面对面交易，可支持快递",
        salePerson: "猪小其",
        phone: "13631251234",
        qq: "601942677",
        date: "2015.9.23",
        description: "因为考完试了所以出售备考书籍托福听力特训，GRE-OG,TOFEL-OG,TOFEL全真题解，这基本是全新的，其他的有些是二手买回来的或者是有笔记在上面的，但是都有8成新以上。最好是广州大学城面交啦~联系我时，请说是在跳蚤市场上看到的，谢谢",
        picPaths: [
            //"../img/3.jpg",
            //"../img/1.jpg",
            //"../img/2.jpg"
        ],
        id: "0"
    };
});
// End for detail.html controller

// Start for list_*.html controller
app.controller('listContentCtrl', function ($scope, $location, $http) {
    $scope.curPage = 1;
    //Get from Server then
    $scope.allCount = 2001;
    var b = (($scope.allCount % 10) != 0);
    $scope.allPage = parseInt($scope.allCount / 10) + (b ? 1 : 0);
    $scope.fir = false;
    $scope.last = true;
    $scope.firstPage = function () {
        $scope.curPage = 1;
        $scope.fir = false;
        $scope.last = ($scope.curPage == $scope.allPage ? false : true);
    };
    $scope.prePage = function () {
        if ($scope.curPage != 1) {
            $scope.curPage = $scope.curPage - 1;
        }
        $scope.fir = ($scope.curPage == 1 ? false : true);
        $scope.last = ($scope.curPage == $scope.allPage ? false : true);
    };
    $scope.nextPage = function () {
        if ($scope.curPage != $scope.allPage) {
            $scope.curPage = $scope.curPage + 1;
        }
        $scope.fir = ($scope.curPage == 1 ? false : true);
        $scope.last = ($scope.curPage == $scope.allPage ? false : true);
    };

    $scope.lastPage = function () {
        $scope.curPage = $scope.allPage;
        $scope.fir = ($scope.curPage == 1 ? false : true);
        $scope.last = false
    };

    $scope.goToPage = function () {
        if ($scope.whichPage <= $scope.allPage && $scope.whichPage > 0) {
            $scope.curPage = $scope.whichPage;
            $scope.fir = ($scope.curPage == 1 ? false : true);
            $scope.last = ($scope.curPage == $scope.allPage ? false : true);
        }
    };
    //判断所处的url 断定分类
    var absUrl = $location.absUrl();
    //$location.host();
    //$location.port();
    //$location.protocol();
    //$location.url();
    //?#name=ccccc
    //$location.search().name;  ？后面要加上#作为url参数
    //$location.search()['name'];
    var categoryId = 1;
    if (absUrl.indexOf("list_book") != -1) {
        categoryId = 1;
    } else if (absUrl.indexOf("list_daily") != -1) {
        categoryId = 3;
    } else if (absUrl.indexOf("list_elec") != -1) {
        categoryId = 4;
    } else if (absUrl.indexOf("list_entertainment") != -1) {
        categoryId = 5;
    } else if (absUrl.indexOf("list_traffic") != -1) {
        categoryId = 2;
    } else {
        //alert("无法获取分类");
    }

    $http.get('http://sysuflea.sinaapp.com/page/browsing', {
        params: {
            "categoryId": categoryId,
            "page": $scope.curPage,
            "numberItems": 10,
            "sorting": 0
        }
    })
        .success(function (data, status, headers, config) {
            alert("success");
        }).error(function (data, status, headers, config) {
            alert("error");
        });
});
// End for list_*.html controller

// Start for password.html controller
app.controller('modifyPwdCtrl', function ($scope, $http) {
    var userId = window.localStorage.getItem("user_id");
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $scope.modifyPwdForm = function () {
        if ($scope.newPwd != $scope.rePwd) {
            $scope.modifyMessage = "两次密码输入不一致，请核对"
            $scope.newPwd = "";
            $scope.rePwd = "";
        } else {
            $http.post('http://sysuflea.sinaapp.com/user/password', {
                "userId": userId,
                "oldPwd": $scope.oldPwd,
                "newPwd": $scope.newPwd
            }).success(function (data, status, headers, config) {
                if (data.state == 1) {
                    $scope.oldPwd = "";
                    $scope.newPwd = "";
                    $scope.rePwd = "";
                    alert("密码修改成功");
                } else if (data.state == 0) {
                    $scope.modifyMessage = "原密码不正确，请核对"
                    $scope.oldPwd = "";
                    $scope.newPwd = "";
                    $scope.rePwd = "";
                }
            }).error(function (data, status, headers, config) {
                alert("连接失败");
            })
        }
    }
});
// End for password.html controller