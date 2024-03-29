var myData = [] ;
//存储数据 , 包括内容为标题 , 图片地址名, 和简介 .
var myDataStr = "1<br>\
<br>\
导演:彼得.杰克逊<br>\
编剧:弗兰.威尔士<br>\
主演:傻逼<br>\
类型:动作<br>\
制片国家:美国<br>\
语言:英语<br>\
上映时间:2015-01-23<br>\
片长:144分钟<br>\
<br>\
<br>\
2<br>\
<br>\
导演:彼得.杰克逊<br>\
编剧:弗兰.威尔士<br>\
主演:傻逼<br>\
类型:动作<br>\
制片国家:美国<br>\
语言:英语<br>\
上映时间:2015-01-23<br>\
片长:144分钟<br>\
<br>\
<br>\
3<br>\
<br>\
导演:彼得.杰克逊<br>\
编剧:弗兰.威尔士<br>\
主演:傻逼<br>\
类型:动作<br>\
制片国家:美国<br>\
语言:英语<br>\
上映时间:2015-01-23<br>\
片长:144分钟<br>\
<br>\
<br>\
4<br>\
<br>\
导演:彼得.杰克逊<br>\
编剧:弗兰.威尔士<br>\
主演:傻逼<br>\
类型:动作<br>\
制片国家:美国<br>\
语言:英语<br>\
上映时间:2015-01-23<br>\
片长:144分钟<br>\
<br>\
<br>\
5<br>\
<br>\
导演:彼得.杰克逊<br>\
编剧:弗兰.威尔士<br>\
主演:傻逼<br>\
类型:动作<br>\
制片国家:美国<br>\
语言:英语<br>\
上映时间:2015-01-23<br>\
片长:144分钟<br>\
<br>\
<br>\
6<br>\
<br>\
导演:彼得.杰克逊<br>\
编剧:弗兰.威尔士<br>\
主演:傻逼<br>\
类型:动作<br>\
制片国家:美国<br>\
语言:英语<br>\
上映时间:2015-01-23<br>\
片长:144分钟<br>\
<br>\
<br>\
7<br>\
<br>\
导演:彼得.杰克逊<br>\
编剧:弗兰.威尔士<br>\
主演:傻逼<br>\
类型:动作<br>\
制片国家:美国<br>\
语言:英语<br>\
上映时间:2015-01-23<br>\
片长:144分钟<br>\
<br>\
<br>\
8<br>\
<br>\
导演:彼得.杰克逊<br>\
编剧:弗兰.威尔士<br>\
主演:傻逼<br>\
类型:动作<br>\
制片国家:美国<br>\
语言:英语<br>\
上映时间:2015-01-23<br>\
<br>\
<br>\
9<br>\
<br>\
导演:彼得.杰克逊<br>\
编剧:弗兰.威尔士<br>\
主演:傻逼<br>\
类型:动作<br>\
制片国家:美国<br>\
语言:英语<br>\
上映时间:2015-01-23<br>\
<br>\
<br>\
10<br>\
<br>\
导演:彼得.杰克逊<br>\
编剧:弗兰.威尔士<br>\
主演:傻逼<br>\
类型:动作<br>\
制片国家:美国<br>\
语言:英语<br>\
上映时间:2015-01-23<br>\
<br>\
<br>\
11<br>\
<br>\
导演:彼得.杰克逊<br>\
编剧:弗兰.威尔士<br>\
主演:傻逼<br>\
类型:动作<br>\
制片国家:美国<br>\
语言:英语<br>\
上映时间:2015-01-23<br>\
"

//定义函数分割myData数据 , myData接收分好组的数据 :以三个连续的<br>\标记为分界

var d = myDataStr.split("<br><br><br>");   //以三个br分出不同大主题
for(var i=0 ;i< d.length;i++){
    var c = d[i].split("<br><br>");
    myData.push(
        {
            img:c[0].replace('.',"")+".jpg",
            caption:c[0].split('.')[1],
            desc:c[1]
        }
    )
}

function $(selector) {
    var method = selector.substr(0, 1) == "." ? "getElementsByClassName" : "getElementById";
    return document[method](selector.substr(1));
}

function turn(elem) {
    var cls = elem.className;
    var n = elem.id.split("_")[1];
    if (!/photo_center/.test(cls)) {
        rsort(n);
        return;
    }
    if (/photo_front/.test(cls)) {
        cls = cls.replace('photo_front', 'photo_back');
        $('.i')[n].className = $('.i')[n].className.replace(/i_current/, 'i_back');
    } else if (/photo_back/.test(cls)) {
        cls = cls.replace('photo_back', 'photo_front');
        $('.i')[n].className = $('.i')[n].className.replace(/i_back/, 'i_current');
    }
    return elem.className = cls;
}


//遍历myData数据长度 , 写入html ;加载图片的时候 , 还顺带加上对应数量的导航:
function addMyData() {
    var template = $("#wrap").innerHTML;  //取出wrap里面的值,作为模板,  留待后面替换
    var oHtml = [];                   //存储要替换的内容
    var oNav = [];
    for (var i = 0; i < myData.length; i++) {
        var _html = template.replace('{{index}}', i)
            .replace('{{alt}}', myData[i].caption)
            .replace('{{img}}', myData[i].img)
            .replace('{{caption}}', myData[i].caption)
            .replace('{{desc}}', myData[i].desc)
        oHtml.push(_html);
        oNav.push('<span id="nav_' + i + '" class="i" onclick ="turn($(\'#photo_' + i + '\'))"></span>');
    }
    //遍历创建完成之后 , 不但要把图片传禁区 , 还要把对应 的nav导航条假如:
    oHtml.push('<div class="nav" id="nav">' + oNav.join("") + '</div>');
    $("#wrap").innerHTML = oHtml.join("");
    //图片加载后调用一下随机抽取居中图片:
    rsort(random([0, myData.length - 1]));
}

addMyData();       //调用函数 , 载入图片 .

//取得在特定范围内随机的值:
function random(range) {
    var min = Math.min(range[0], range[1]);
    var max = Math.max(range[0], range[1]);
    var diff = max - min + 1;//[3,5]
    var n = Math.floor(diff * Math.random()) + min;
    return n;
}

//取得左右区域图片的取值活动范围:
function range() {
    //定义json数组格式:返回对象
    var range = {
        left: {
            x: [], y: []
        },
        right: {
            x: [], y: []
        }
    }
    var wrap = {
        w: $("#wrap").clientWidth,
        h: $("#wrap").clientHeight
    }
    var photo = {
        w: $(".photo")[0].clientWidth,
        h: $(".photo")[0].clientHeight
    }
    range.wrap = wrap;            //向json里面添加json元素.
    range.photo = photo;

    //定义left的xy值范围 , 和right的xy范围值.
    range.left.x = [0 - photo.w / 2, wrap.w / 2 - photo.w / 2];                     //定义json数组中的元素 , 用.方法.
    range.left.y = [0 - photo.h / 2, wrap.h - photo.w / 2];

    range.right.x = [wrap.w / 2 - photo.w / 2, wrap.w - photo.w / 2];                     //定义json数组中的元素 , 用.方法.
    range.right.y = [0 - photo.h / 2, wrap.h - photo.w / 2];

    return range;
}

//随机选取一个作为中间的特殊元素,及两边排序.
function rsort(n) {
    //获取所有的photo , 准备排序
    var _photo = $(".photo");
    var photos = [];
    for (var i = 0; i < _photo.length; i++) {
        _photo[i].className = _photo[i].className.replace(/\s*photo_center\s*/, " ");
        _photo[i].className = _photo[i].className.replace(/\s*photo_front\s*/, " ");
        _photo[i].className = _photo[i].className.replace(/\s*photo_back\s*/, " ");

        _photo[i].className += " photo_front ";
        _photo[i].style.left = "";
        _photo[i].style.top = "";
        _photo[i].style['-webkit-transform'] = "rotate(360deg) scale(1.3)";

        photos.push(_photo[i]);
    }
    //定义一张随机图片居中显示:
    var photo_center = $("#photo_" + n);
    photo_center.className += " photo_center ";

    //剔除掉居中显示图片 :
    photo_center = photos.splice(n, 1);
    //定义变量存储数据值
    var ranges = range();
    var photos_left = photos.splice(0, Math.ceil(photos.length / 2));
    var photos_right = photos;
    //通过随机的left和top值 , 随意排列图片:
    for (var j = 0; j < photos_left.length; j++) {
        photos_left[j].style.left = random(ranges.left.x) + "px";
        photos_left[j].style.top = random(ranges.left.y) + "px";
        photos_left[j].style["-webkit-transform"] = "rotate(" + random([-150, 150]) + "deg) scale(1)";
    }

    for (var s = 0; s < photos_right.length; s++) {
        photos_right[s].style.left = random(ranges.right.x) + "px";
        photos_right[s].style.top = random(ranges.right.y) + "px";
        photos_right[s].style["-webkit-transform"] = "rotate(" + random([-150, 150]) + "deg) scale(1)";
    }
    //图片排序后 , 顺带选出当前选中按钮:
    var navs = $('.i');
    for (var i = 0; i < navs.length; i++) {
        //统一先清空:

        navs[i].className = navs[i].className.replace(/\s*i_current\s*/, '');
        navs[i].className = navs[i].className.replace(/\s*i_back\s*/, '');
    }
    navs[n].className += " i_current ";
}