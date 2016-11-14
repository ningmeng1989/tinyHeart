/**
 * Created by JIANBO on 2016/7/31.
 */
//定义全局需要的变量
var can1, can2;     //背景和游戏2个CANVAS对象
var ctx1, ctx2;     //2个CANVAS绘图环境
var bgPic = new Image();     //北京图片
var canWidth, canHeight;    //画板宽高

var lastTime, deltaTime;    //动画上一帧时间，时间间隔
var mx,my;      //鼠标位置
var data;       //得分对象
var play_again_btn;     //再来一次按钮

var ane,fruit,mom,baby;     //海葵、果实、大鱼、小鱼对象
var babyEye=[],babyBody=[],babyTail=[];     //小鱼的眼睛、身体、尾巴的序列帧
var momEye=[],momTail=[],momBodyBlue=[],momBodyOra=[];      //大鱼的眼睛、尾巴、身体的序列帧
var wave,halo,dust,dustPic=[];      //大鱼迟到果实的水泡、小鱼喂给小鱼的水泡、海水尘埃、海水尘埃图片

document.body.onload = game;    //主函数

function game() {
    init();     //初始化游戏
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();     //动画循环
}
function init() {
    //获得canvas绘图环境
    can1 = document.getElementById("canvas1");//fishes,dust,UI,circle
    ctx1 = can1.getContext("2d");
    can2 = document.getElementById("canvas2");//background,one,fruits
    ctx2 = can2.getContext("2d");
    canWidth = can1.width;
    canHeight = can1.height;
    // score和gameover的字体和水平居中
    ctx1.font="30px Verdana";
    ctx1.textAlign="center";

    //监听鼠标移动事件
    can1.addEventListener('mousemove',onMouseMove,false);
    mx=canWidth*0.5;
    my=canHeight*0.5;

    play_again_btn = document.getElementById("play_again");

    bgPic.src = "assets/imgs/background.jpg";

    //获得大鱼和小鱼的眼睛、身体、尾巴的序列帧
    for(var i=0;i<8;i++){
        babyTail[i]=new Image();
        babyTail[i].src="assets/imgs/babyTail"+i+".png";
    }
    for(var i=0;i<2;i++){
        babyEye[i]=new Image();
        babyEye[i].src="assets/imgs/babyEye"+i+".png";
    }
    for(var i=0;i<20;i++){
        babyBody[i]=new Image();
        babyBody[i].src="assets/imgs/babyFade"+i+".png";
    }
    for(var i=0;i<8;i++){
        momTail[i]=new Image();
        momTail[i].src="assets/imgs/bigTail"+i+".png";
    }
    for(var i=0;i<2;i++){
        momEye[i]=new Image();
        momEye[i].src="assets/imgs/bigEye"+i+".png";
    }
    for(var i=0;i<8;i++){
        momBodyOra[i]=new Image();
        momBodyBlue[i]=new Image();
        momBodyOra[i].src="assets/imgs/bigSwim"+i+".png";
        momBodyBlue[i].src="assets/imgs/bigSwimBlue"+i+".png";
    }
    for(var i=0;i<7;i++){
        dustPic[i]=new Image();
        dustPic[i].src="assets/imgs/dust"+i+".png";
    }
    // 创建海葵、果实、海水尘埃对象并初始化
    ane=new aneObj();
    ane.init();

    fruit=new fruitObj();
    fruit.init();

    dust=new dustObj();
    dust.init();

    //创建大鱼吃到果实、大鱼喂小鱼的气泡对象，不需要初始化
    wave=new waveObj();
    halo=new haloObj();

    //创建大鱼、小鱼、得分对象，初始化放在 resetGame中,因为再来一局的时候要重新初始化
    mom=new momObj();

    baby=new babyObj();

    data=new dataObj();

    resetGame();
}
//开始游戏和再来一局时，大鱼、小鱼和得分重新初始化
function resetGame() {
    mom.init();
    baby.init();
    data.reset();
}
//显示再来一局
function play_again_show() {
    play_again_btn.className="show";
    play_again_btn.addEventListener('click',play_again_exec,false);
}
//执行再来一局
function play_again_exec() {
    play_again_btn.className="";
    play_again_btn.removeEventListener('click',play_again_exec);
    resetGame();
}
//动画循环
function gameloop() {
    requestAnimationFrame(gameloop);

    var now=Date.now();
    deltaTime=now-lastTime;
    lastTime=now;
    if(deltaTime>40) deltaTime=40;

    ctx2.clearRect(0,0,canWidth,canHeight);     //清除游戏画板之前的内容

    drawBackground();   //背景
    ane.draw();     //海葵
    dust.draw();    //海底尘埃


    fruitMonitor();     //监测果实数量，少于15个话，产生新的果实
    fruit.draw();       //绘制果实

    ctx1.clearRect(0,0,canWidth,canHeight);     //清除游戏画板之前的内容

    mom.draw();     //大鱼
    baby.draw();    //小鱼

    momFruitCollision();    //大鱼吃果实检测
    momBabyCollision();     //大鱼喂小鱼监测
    wave.draw();    //大鱼吃果实水泡
    halo.draw();    //大鱼喂小鱼水泡
    data.draw();    //得分
}
//监听鼠标移动事件，将鼠标位置赋给mx，my
function onMouseMove(e){
    if(!data.gameOver){
        if(e.offsetX|| e.layerX){
            mx= e.offsetX==undefined? e.layerX: e.offsetX;
            my= e.offsetY==undefined? e.layerY: e.offsetY;
        }
    }
}
