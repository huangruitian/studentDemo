//单击开始游戏--》startPage消失--》游戏开始
//随机出现食物，出现三节蛇开始运动
//按上下左右--》改变方向运动
//判断是不是吃到食物--》食物消失，蛇长度加一
//判断游戏结束，弹出框。

//init()
//取map地图。
//this.mapW = parseInt(getComputedStyle(content).width);
var startP = document.getElementById('startP');
var startPage = document.getElementById('startPage');
var loserScore = document.getElementById('loserScore');
var lose = document.getElementById('lose');
var scoreBox = document.getElementById('score');
var content = document.getElementById('content');
var startPage = document.getElementById('startPage');
var snakeMove;
var close = document.getElementById('close');
var startBtn = document.getElementById('startBtn');
var speed = 200;
var startGameBool = true;
var startPaushBool = true;
var showMusic = document.getElementById("showMusic");
init();
function init() {
    //取地图宽高
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height);
    this.mapDiv = content;
    //食物属性
    this.foodW = 20;
    this.foodH = 20;
    //食物初始坐标
    this.foodX = 0;
    this.foodY = 0;
    //蛇属性
    this.snakeW = 20;
    this.snakeH = 20;
    //初始化表示的坐标，X,Y
    this.snakeBody = [
        [3, 1, 'head'],
        [2, 1, 'body'],
        [1, 1, 'body']
    ];
    //初始化游戏属性
    this.direction = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    this.score = 0;
    bindEvent();
}
//开始游戏
function startGame() {
    //点击开始游戏
    startPage.style.display = 'none';//开始按钮隐藏
    startP.style.display = 'block';//暂停按钮显示
    //生成食物和蛇
    food();
    snake();
}
//生成食物
function food() {
    var food = document.createElement('div');
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    //先让食物定位改成absolute,然后再通过地图的宽高/食物的宽高拿到坐标动态插入地图
    food.style.position = 'absolute';
    this.foodX = Math.floor(Math.random() * (this.mapW / 20));
    this.foodY = Math.floor(Math.random() * (this.mapH / 20));
    food.style.top = this.foodY * 20 + 'px';
    food.style.left = this.foodX * 20 + 'px';
    this.mapDiv.appendChild(food).setAttribute('class', 'food');
}
//生成蛇
function snake() {
    for (var i = 0; i < this.snakeBody.length; i++) {
        //根据蛇的长度，生成DIV
        var snake = document.createElement('div');
        snake.style.width = this.snakeW + 'px';
        snake.style.height = this.snakeH + 'px';
        //
        snake.style.position = 'absolute';
        //取出蛇的每一节[i],[i][0]每一节的X轴,[i][1]每一节的Y轴
        snake.style.left = this.snakeBody[i][0] * 20 + 'px';
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';
        //取出蛇的标记位，根据标记的蛇头蛇身加载不一样的类名。
        snake.classList.add(this.snakeBody[i][2]);
        //把蛇插入到地图里面去。
        this.mapDiv.appendChild(snake).classList.add('snake');
        //改变方向的时候蛇头也改变方向
        switch (this.direction) {
            case 'right':
                break;
            case 'up':
                snake.style.transform = 'rotate(270deg)';
                break;
            case 'left':
                snake.style.transform = 'rotate(180deg)';
                break;
            case 'down':
                snake.style.transform = 'rotate(90deg)';
                break;
            default:
                break;
        }
    }
}
//蛇移动
function move() {
    //从最后一位开始，往前移动。
    for (var i = this.snakeBody.length - 1; i > 0; i--) {
        //每一位的X值等于前一位的X值
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    switch (this.direction) {//改变蛇头的坐标，左右是X轴改变。上下是Y轴改变。
        case 'right':
            this.snakeBody[0][0] += 1;
            break;
        case 'up':
            this.snakeBody[0][1] -= 1;
            break;
        case 'left':
            this.snakeBody[0][0] -= 1;
            break;
        case 'down':
            this.snakeBody[0][1] += 1;
            break;
        default:
            break;
    }
    //把旧的蛇删了
    removeClass('snake');
    //再根据新的坐标渲染蛇
    snake();
    //蛇吃到食物
    if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
        switch (this.direction) {
            case 'right':
                this.snakeBody.push([snakeEndX + 1, snakeEndY, 'body']);
                break;
            case 'up':
                this.snakeBody.push([snakeEndX, snakeEndY - 1, 'body']);
                break;
            case 'left':
                this.snakeBody.push([snakeEndX - 1, snakeEndY, 'body']);
                break;
            case 'down':
                this.snakeBody.push([snakeEndX, snakeEndY + 1, 'body']);
                break;
            default:
                break;
        }
        //吃到一个加速。
        clearInterval(snakeMove);
        snakeMove = setInterval(function () {
            move();
        }, speed);
        this.speed = this.speed * 0.95;
        //
        this.score += 1;
        scoreBox.innerHTML = this.score;
        removeClass('food');
        food();
    }
    //判断蛇是不是咬到自己或者碰到墙壁，利用坐标。
    if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW / 20) {
        reloadGame();
        showMusic.setAttribute('src', './music/end.mp3');
        showMusic.removeAttribute('loop');
    }
    if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH / 20) {
        reloadGame();
        showMusic.setAttribute('src', './music/end.mp3');
        showMusic.removeAttribute('loop');
    }
    var snakeHX = this.snakeBody[0][0];
    var snakeHY = this.snakeBody[0][1];
    for (var i = 1; i < this.snakeBody.length; i++) {
        if (snakeHX == snakeBody[i][0] && snakeHY == snakeBody[i][1]) {
            reloadGame();
            showMusic.setAttribute('src', './music/end.mp3');
            showMusic.removeAttribute('loop');
        }
    }
}
//重新开始游戏
function reloadGame() {
    removeClass('snake');
    removeClass('food');
    clearInterval(snakeMove);
    this.snakeBody = [
        [3, 1, 'head'],
        [2, 1, 'body'],
        [1, 1, 'body']
    ];
    this.direction = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    lose.style.display = 'block';
    loserScore.innerHTML = this.score;
    this.score = 0;
    scoreBox.innerHTML = 0;
    startGameBool = true;
    startPaushBool = true;
    startP.setAttribute('src', './images/start.png');
    this.speed = 150;
}
//移出传入的类名节点
function removeClass(className) {
    var ele = document.getElementsByClassName(className);
    while (ele.length > 0) {
        //我找到我的爸爸，我爸爸又不要我了。
        ele[0].parentNode.removeChild(ele[0]);
    }
}
//蛇的运动方向。
function setDerict(code) {
    switch (code) {
        case 37:
            if (this.left) {
                this.direction = 'left';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 38:
            if (this.up) {
                this.direction = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 39:
            if (this.right) {
                this.direction = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 40:
            if (this.down) {
                this.direction = 'down';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        default:
            break;
    }
}
//绑定开始，结束事件。
function bindEvent() {
    close.onclick = function () {
        lose.style.display = 'none';
    }
    startBtn.onclick = function () {
        startAndPaush();
    }
    startP.onclick = function () {
        startAndPaush();
        showMusic.setAttribute('src', './music/load.mp3');
        showMusic.setAttribute('loop', 'loop');
    }
}
//控制整个游戏的运行逻辑。
function startAndPaush() {
    if (startPaushBool) {
        if (startGameBool) {
            startGame();
            startGameBool = false;
        }
        startP.setAttribute('src', './images/pause.png');
        document.onkeydown = function(e) {
            var code = e.keyCode;
            setDerict(code);
        }
        snakeMove = setInterval(function () {
            move();
        }, this.speed);
        startPaushBool = false;
    } else {
        startP.setAttribute('src', './images/start.png');
        clearInterval(snakeMove);
        document.onkeydown = function(e) {
            e.returnValue = false;
            return false;
        };
        startPaushBool = true;
    }
}

///轮播
$(function() {
    //$("#toright").hide();
    //$("#toleft").hide();
    $('#toright').hover(function() {
        $("#toleft").hide()
    }, function() {
        $("#toleft").show()
    })
    $('#toleft').hover(function() {
        $("#toright").hide()
    }, function() {
        $("#toright").show()
    })
})
//////////////////////////////////////////////////////////////////////
var t;
var index = 0;
/////自动播放
t = setInterval(play, 3000)

function play() {
    index++;
    if (index > 4) {
        index = 0
    }
    // console.log(index)
    $("#lunbobox ul li").eq(index).css({
        "background": "#999",
        "border": "1px solid #ffffff"
    }).siblings().css({
        "background": "#cccccc",
        "border": ""
    })

    $(".lunbo a ").eq(index).fadeIn(1000).siblings().fadeOut(1000);
};

///点击鼠标 图片切换
$("#lunbobox ul li").click(function() {

    //添加 移除样式
    //$(this).addClass("lito").siblings().removeClass("lito"); //给当前鼠标移动到的li增加样式 且其余兄弟元素移除样式   可以在样式中 用hover 来对li 实现
    $(this).css({
        "background": "#999",
        "border": "1px solid #ffffff"
    }).siblings().css({
        "background": "#cccccc"
    })
    var index = $(this).index(); //获取索引 图片索引与按钮的索引是一一对应的
    // console.log(index);

    $(".lunbo a ").eq(index).fadeIn(1000).siblings().fadeOut(1000); // siblings  找到 兄弟节点(不包括自己）
});

/////////////上一张、下一张切换
$("#toleft").click(function() {
    index--;
    if (index <= 0) //判断index<0的情况为：开始点击#toright  index=0时  再点击 #toleft 为负数了 会出错
    {
        index = 4
    }
    console.log(index);
    $("#lunbobox ul li").eq(index).css({
        "background": "#999",
        "border": "1px solid #ffffff"
    }).siblings().css({
        "background": "#cccccc"
    })

    $(".lunbo a ").eq(index).fadeIn(1000).siblings().fadeOut(1000); // siblings  找到 兄弟节点(不包括自己）必须要写
}); // $("#imgbox a ")获取到的是一个数组集合 。所以可以用index来控制切换

$("#toright").click(function() {
    index++;
    if (index > 4) {
        index = 0
    }
    console.log(index);
    $(this).css({
        "opacity": "0.5"
    })
    $("#lunbobox ul li").eq(index).css({
        "background": "#999",
        "border": "1px solid #ffffff"
    }).siblings().css({
        "background": "#cccccc"
    })
    $(".lunbo a ").eq(index).fadeIn(1000).siblings().fadeOut(1000); // siblings  找到 兄弟节点(不包括自己）
});
$("#toleft,#toright").hover(function() {
        $(this).css({
            "color": "black"
        })
    },
    function() {
        $(this).css({
            "opacity": "0.3",
            "color": ""
        })
    })
///

///////鼠标移进  移出
$("#lunbobox ul li,.lunbo a img,#toright,#toleft ").hover(
    ////////鼠标移进
    function() {
        $('#toright,#toleft').show()
        clearInterval(t);

    },
    ///////鼠标移开
    function() {
        //$('#toright,#toleft').hide()
        //alert('aaa')
        t = setInterval(play, 3000)

        function play() {
            index++;
            if (index > 4) {
                index = 0
            }
            $("#lunbobox ul li").eq(index).css({
                "background": "#999",
                "border": "1px solid #ffffff"
            }).siblings().css({
                "background": "#cccccc"
            })
            $(".lunbo a ").eq(index).fadeIn(1000).siblings().fadeOut(1000);
        }
    })