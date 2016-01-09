// JavaScript Document
/**
 *二级联动选择
 **/
var subcate = [
    ["留学资料", "考研复习", "公选公必", "专业教材", "工具书", "小说读物", "杂志期刊"],
    ["自行车", "电动车"],
    ["窗帘", "床帘", "衣服", "鞋子", "护肤品", "化妆品"],
    ["收音机", "洗衣机", "手机", "相机", "台灯", "笔记本"],
    ["羽毛球拍", "排球", "瑜伽垫", "乒乓球拍", "网球拍", "跆拳道服"]
];
var subcateVal = [
    [11,12,13,14,15,16,17],
    [21,22],
    [31,32,33,34,35,36],
    [41,42,43,44,45,46],
    [51,52,53,54,55,56]
];
function getcategory() {
    //获得一级分类下拉框的对象
    var cateId = document.frm.categoryId;
    //获得二级分类下拉框的对象
    var subCateId = document.frm.subcategoryId;
    //得到对应一级分类的二级分类数组
    var linkCate = subcate[cateId.selectedIndex - 1];
    var linkCateVal = subcateVal[cateId.selectedIndex - 1];
    //清空二级分类下拉框，仅留提示选项
    subCateId.length = 1;
    //将二级分类数组中的值填充到二级下拉框中
    for (var i = 0; i < linkCate.length; i++) {
        subCateId[i + 1] = new Option(linkCate[i], linkCateVal[i]);
    }
}

/*
 *处理服务器返回的json数据
 */

//jquery表单提交
function newprd_add() {
    var title = $("#title").val();
    var categoryId = $("#categoryId").val();
    var subcategoryId = $("#subcategoryId").val();
    var recency = $("#recency").val();
    var a = document.getElementsByClassName("arguable");
    var arguable = a.value;
    var price = $("#price").val();
    var tradeVenue = $("#tradeVenue").val();
    var description = $("#description").val();
    var delivery = $("#delivery").val();
    //alert($("#fileImage").val());

    var para = {
        'userId':window.localStorage.getItem("user_id"),
        'title': title,
        'categoryId': categoryId,
        'subcategoryId': subcategoryId,
        'recency': recency,
        'arguable': arguable,
        'price': price,
        'tradeVenue': tradeVenue,
        'description': description,
        'delivery':delivery
    };

    $.post("http://sysuflea.sinaapp.com/item", para, function (data, status) {
        console.info(data);
        alert(data);
    });

}
			
		