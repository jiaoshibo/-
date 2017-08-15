var ulBox = document.getElementById("ulBox");
var start = document.getElementById("start");
var timeOut = document.getElementById("timeOut");
var bgm = document.getElementById("bgm");
var eat = document.getElementById("eat");
var dead = document.getElementById("dead");
var max = document.getElementById("max");
var now = document.getElementById("now");
var level = document.getElementById("level")
var speed = 500;
var fangxiang = 39 //39 右； 40 下； 37 左； 38 上；

// var str="";
// for(var i=0;i<400;i++){
//     str+="<li></li>"
// }
// ulBox.innerHTML=str;
var lis=[];
var snake=[{pos:0,color:"#666"},{pos:1,color:"blue"},{pos:2,color:"green"},{pos:3,color:"red"},{pos:4,color:"#82286c"}]//初始化蛇的位置以及长度

//蛇的食物
var food={pos:0,color:"red"}

//初始化最高分
var score = localStorage.getItem("score")||0;
max.innerHTML=score;

//创建的格子。即蛇的活动场所
function initSpace(){
    var frag=document.createDocumentFragment();
    for(var i=0;i<400;i++){
        var lidom=document.createElement("li");
       
        ulBox.appendChild(lidom);
    }
    ulBox.appendChild(frag)
    lis=ulBox.children
}

//创建随机颜色的蛇
function randColor(){
    return "rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")";
}

//蛇的状态
function initSnake(){
    for(var i=0;i<snake.length;i++){
        lis[snake[i].pos].style.backgroundColor=snake[i].color;
    }
}
//判定 food 的值在不在 snake 里
function isinSnake(index){
    for(var i=0;i<snake.length;i++){
        if(snake[i].pos===index){
            return true;
            break;
        }
    }return false;
}

//初始化蛇的食物
function initFood(){
    var index = Math.floor(Math.random()*400);
    //判定：如果 food 的值在 snake 的数组里，则直接生成一个新的随机值
    while(isinSnake(food)){
        index=Math.floor(Math.random()*400);
    }
    food={pos:index,color:randColor()};
    lis[food.pos].style.backgroundColor=food.color;
}
initSpace()
initSnake()
initFood()
function gameover(){
    var l=snake.length;
    if((l-5)>score){
        localStorage.setItem("score",l-5);
    }

    dead.play();
    alert("GAME OVER!!!");
    //location.href=location.href;//浏览器刷新
    location.reload();
    return false;
}

//蛇的运动
function snakeMove(){
    var snakeHead = snake.slice(-1)[0].pos;
    //墙的碰撞检测
    if((snakeHead+1)%20==0&&fangxiang==39){//右边界的判断
        gameover();
    }else if((snakeHead+20)>399&&fangxiang==40){//下边界的判断
        gameover()
    }else if(snakeHead<20&&fangxiang==38){//上边界的判断
        gameover()
    }else if(snakeHead%20==0&&fangxiang==37){
        gameover()
    }


    // 蛇的运动
    var snakeTail = snake.slice(0,1)[0].pos;
    lis[snakeTail].style.backgroundColor="#fff";
    for(var i=0,l=snake.length;i<l-1;i++){
        snake[i].pos=snake[i+1].pos;
    }
    
    //控制蛇的运动方向
    if(fangxiang==40){//down
        snake[l-1].pos=snake[l-1].pos+20
    }else if(fangxiang==37){//left
        snake[l-1].pos=snake[l-1].pos-1
    }else if(fangxiang==38){//up
        snake[l-1].pos=snake[l-1].pos-20
    }else if(fangxiang==39){//right
        snake[l-1].pos=snake[l-1].pos+1
    }
    snakeHead=snake[l-1].pos;
    //蛇吃食物
    if(snakeHead==food.pos){
        snake.unshift({pos:snakeTail,color:food.color});
        eat.play();
        now.innerHTML=snake.length-5;
        initFood();
    }
    //蛇的自我身体碰撞
    for(var i=0,l=snake.length;i<l-1;i++){
        if(snake[i].pos==snakeHead){
            gameover()
        }
    }
    initSnake();
}
var timer=null
start.onclick=function(){//开始游戏
    //难度等级
    speed=level.value;
    //蛇的运动
    clearInterval(timer);
    timer=setInterval(snakeMove,speed);
    //背景音乐
    bgm.play();
}
timeOut.onclick=function(){//暂停游戏
    clearInterval(timer);
}
//键位的绑定
document.addEventListener("keydown",function(a){
    a = a||window.event;
    switch(a.keyCode){
        case 37:{
            //left
            if(fangxiang==39)return false;
            fangxiang=a.keyCode;
            console.log("left")
            break;
            
        }
        case 38:{
            //up
            if(fangxiang==40)return false;
            fangxiang=a.keyCode;
            console.log("up")
            break;
        }
        case 39:{
            //right
            if(fangxiang==37)return false;
            fangxiang=a.keyCode;
            console.log("right")
            break;
        }
        case 40:{
            //down
            if(fangxiang==38)return false;
            fangxiang=a.keyCode;
            console.log("down")
            break;
        }
    }
},false);