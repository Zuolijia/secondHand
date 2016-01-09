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
    cBox.getCityIndexArr = ['0','0'];//索引数组，根据切换得出切换的索引就可以得到省份及城市

    //改变省份触发的事件[根据索引更改城市数据]
    cBox.provinceChange = function(index){
        cBox.getCityArr = cBox.cityArr[index];
        cBox.getCityIndexArr[1] ='0';
        cBox.getCityIndexArr[0]=index;
        //输出查看数据
        console.log(cBox.getCityIndexArr,provinceArr[cBox.getCityIndexArr[0]],cityArr[cBox.getCityIndexArr[0]][cBox.getCityIndexArr[1]]);
    };

    //改变城市触发事件
    cBox.cityChange = function(index) {
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
app.controller('hotAbroadContentController', function ($scope) {
    $scope.hots = [
        {message: "出售托福、GRE考试书籍", date: "09-23", id: "1"},
        {message: "雅思真题7-10转让", date: "09-23", id: "2"},
        {message: "托福词汇8成新", date: "09-21", id: "3"},
        {message: "GMAT复习资料整套，中珠", date: "09-21", id: "4"},
        {message: "雅思整套考试资料7成新", date: "09-19", id: "5"}
    ];
});

app.controller('hotTeachingContentController', function ($scope) {
    $scope.hots = [
        {message: "司法考试全套复习题大学城", date: "09-23", id: ""},
        {message: "大英二级班整套教材8成新", date: "09-23", id: ""},
        {message: "中大行政管理自考书籍", date: "09-23", id: ""},
        {message: "10本考研政治辅导用书", date: "09-21", id: ""},
        {message: "高数数一教材，附考试福利", date: "09-19", id: ""}
    ];
});

app.controller('hotBikeContentController', function ($scope) {
    $scope.hots = [
        {message: "上海凤凰牌女装车7成新", date: "09-23", id: ""},
        {message: "山地车 中珠交易", date: "09-23", id: ""},
        {message: "可折叠小轮车", date: "09-21", id: ""},
        {message: "大学城女装车蓝色，赠锁", date: "09-21", id: ""}
    ];
});

app.controller('hotElectricalContentController', function ($scope) {
    $scope.hots = [
        {message: "收音机8成新，比学校的好", date: "09-23", id: ""},
        {message: "学校大众款收音机", date: "09-23", id: ""},
        {message: "小天鹅洗衣机，无故障7成新", date: "09-21", id: ""}
    ];
});

app.controller('bookContentController', function ($scope) {
    $scope.books = [
        {message: "出售托福、GRE考试书籍", date: "09-23", id: ""},
        {message: "雅思真题7-10转让", date: "09-23", id: ""},
        {message: "托福词汇8成新", date: "09-21", id: ""},
        {message: "GMAT复习资料整套，中珠", date: "09-21", id: ""},
        {message: "雅思整套考试资料7成新", date: "09-19", id: ""},
        {message: "司法考试全套复习题大学城", date: "09-23", id: ""},
        {message: "大英二级班整套教材8成新", date: "09-23", id: ""},
        {message: "中大行政管理自考书籍", date: "09-23", id: ""},
        {message: "10本考研政治辅导用书", date: "09-21", id: ""},
        {message: "高数数一教材，附考试福利", date: "09-19", id: ""}
    ];
});

app.controller('trafficContentController', function ($scope) {
    $scope.traffics = [
        {message: "上海凤凰牌女装车7成新", date: "09-23", id: ""},
        {message: "山地车 中珠交易", date: "09-23", id: ""},
        {message: "可折叠小轮车", date: "09-21", id: ""},
        {message: "大学城女装车蓝色，赠锁", date: "09-21", id: ""}
    ];
});

app.controller('dailyUseContentController', function ($scope) {
    $scope.dailyUses = [
        {message: "遮光床帘八成新", date: "09-23", id: ""},
        {message: "史努比床帘大学城", date: "09-21", id: ""},
        {message: "dior香水迷你版，用过一次", date: "09-21", id: ""}
    ];
});

app.controller('electricalContentController', function ($scope) {
    $scope.electricals = [
        {message: "收音机8成新，比学校的好", date: "09-23", id: ""},
        {message: "学校大众款收音机", date: "09-23", id: ""},
        {message: "小天鹅洗衣机，无故障7成新", date: "09-21", id: ""},
        {message: "", date: "", id: ""}
    ];
});

app.controller('sportContentController', function ($scope) {
    $scope.sports = [
        {message: "网球拍蓝色", date: "09-23", id: ""},
        {message: "羽毛球拍凯胜", date: "09-21", id: ""},
        {message: "瑜伽垫", date: "09-21", id: ""},
        {message: "", date: "", id: ""}
    ];
});

app.controller('hotCtrl', function ($scope, $window) {
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
            $scope.goods.locate = data.item[8];
            $scope.goods.method = data.item[12] == 1 ? "面对面交易" : (data.item[12] == 2 ? "快递" : "面对面、快递");
            $scope.goods.salePerson = data.item[2];
            $scope.goods.phone = data.user[2];
            $scope.goods.qq = data.user[3];
            $scope.goods.date = (data.item[11][1] > 9 ? data.item[11][1] : ("0" + data.item[11][1])) + "-" + (data.item[11][2] > 9 ? data.item[11][2] : ("0" + data.item[11][2]));
            $scope.goods.description = data.item[10];
            $scope.goods.id = data.item[0];
            var picLen = 0;
            for (var i = 0; i < 5; i++) {
                if (data.item[14 + i] != "") {
                    picLen++;
                }
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
        name: "[全新]出售托福、GRE考试书籍",
        IsBargin: "不可议价",
        price: "250元",
        locate: "广州大学城、中大南校区",
        method: "面对面交易，可支持快递",
        salePerson: "猪小其",
        phone: "13631251234",
        qq: "601942677",
        date: "2015.9.23",
        description: "因为考完试了所以出售备考书籍托福听力特训，GRE-OG,TOFEL-OG,TOFEL全真题解，这基本是全新的，其他的有些是二手买回来的或者是有笔记在上面的，但是都有8成新以上。最好是广州大学城面交啦~联系我时，请说是在跳蚤市场上看到的，谢谢",
        picPaths: [
            "../img/3.jpg",
            "../img/1.jpg",
            "../img/2.jpg"
        ],
        id: "1"
    };
});
// End for detail.html controller

// Start for list_*.html controller
app.controller('listContentCtrl', function ($scope, $location) {
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
    if (absUrl.indexOf("list_book") != -1) {
        //alert("书籍分类");
    } else if (absUrl.indexOf("list_daily") != -1) {
        //alert("日用品分类");
    } else if (absUrl.indexOf("list_elec") != -1) {
        //alert("数码电器分类");
    } else if (absUrl.indexOf("list_entertainment") != -1) {
        //alert("文体娱乐分类");
    } else if (absUrl.indexOf("list_traffic") != -1) {
        //alert("交通工具分类");
    } else {
        //alert("无法获取分类");
    }
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