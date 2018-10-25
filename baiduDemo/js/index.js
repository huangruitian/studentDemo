var oInput = document.getElementsByTagName('input')[0];
var serchBtn = document.getElementsByTagName('input')[1];
var listData = document.getElementsByClassName('list-data')[0];
var form = document.getElementsByTagName('form')[0];
cancelHandler(form);
//可以加防抖功能。
var value = oInput.value.trim();
var str;
oInput.oninput = function () {
    value = this.value;
    var oScript = document.createElement('script');
    oScript.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + value + '&cb=doJson';
    document.body.appendChild(oScript);
    document.body.removeChild(oScript);
}
serchBtn.addEventListener('click', function () {
    var lastValue = oInput.value.trim();
    if (lastValue) {
        var str1 = '<li><a class="active" href=https://www.baidu.com/s?wd=' + lastValue + '>' + lastValue + '</a></li>';
        listData.innerHTML = str1;
        var a = document.getElementsByClassName('active')[0];
        a.click();
    }
}, false)
//百度会把数据塞到这个回调函数
function doJson(data) {
    var s = data.s;
        str = '<li><a class="active" href=https://www.baidu.com/s?wd=' + value + '>' + value + '</a></li>';
    if (s.length) {
        s.forEach(function (ele, index) {
            str += '<li><a href=https://www.baidu.com/s?wd=' + ele + '>' + ele + '</a></li>'
        })
        listData.innerHTML = str;
        listData.style.display = 'block';
    } else {
        listData.style.display = 'none';
    }
}
//封装取消默认事件函数
function cancelHandler(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}
alert('仿百度搜索功能，仅供学习。不做商业用途。');