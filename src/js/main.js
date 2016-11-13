/**
 * Created by JIANBO on 2016/7/31.
 */
var can1, can2;
var ctx1, ctx2;
var lastTime, deltaTime;
var bgPic = new Image();
var canWidth, canHeight;
var ane;
var fruit;
var mom;
var baby;
var mx,my;

var babyTail=[];
var babyEye=[];
var babyBody=[];

var momTail=[];
var momEye=[];
var momBodyBlue=[];
var momBodyOra=[];

var data;

var wave;
var halo;
var dust;
var dustPic=[];

var play_again_btn;

document.body.onload = game;

function game() {
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();
}
function init() {
    //获得canvas绘图环境
    can1 = document.getElementById("canvas1");//fishes,dust,UI,circle
    ctx1 = can1.getContext("2d");
    can2 = document.getElementById("canvas2");//background,one,fruits
    ctx2 = can2.getContext("2d");

    ctx1.font="30px Verdana";
    ctx1.textAlign="center";

    can1.addEventListener('mousemove',onMouseMove,false);

    play_again_btn = document.getElementById("play_again");

    canWidth = can1.width;
    canHeight = can1.height;

    bgPic.src = "./imgs/background.jpg";

    ane=new aneObj();
    ane.init();

    fruit=new fruitObj();
    fruit.init();

    mom=new momObj();

    baby=new babyObj();

    mx=canWidth*0.5;
    my=canHeight*0.5;

    for(var i=0;i<8;i++){
        babyTail[i]=new Image();
        babyTail[i].src="./imgs/babyTail"+i+".png";
    }

    for(var i=0;i<2;i++){
        babyEye[i]=new Image();
        babyEye[i].src="./imgs/babyEye"+i+".png";
    }

    for(var i=0;i<20;i++){
        babyBody[i]=new Image();
        babyBody[i].src="./imgs/babyFade"+i+".png";
    }

    for(var i=0;i<8;i++){
        momTail[i]=new Image();
        momTail[i].src="./imgs/bigTail"+i+".png";
    }

    for(var i=0;i<2;i++){
        momEye[i]=new Image();
        momEye[i].src="./imgs/bigEye"+i+".png";
    }

    for(var i=0;i<8;i++){
        momBodyOra[i]=new Image();
        momBodyBlue[i]=new Image();
        momBodyOra[i].src="./imgs/bigSwim"+i+".png";
        momBodyBlue[i].src="./imgs/bigSwimBlue"+i+".png";
    }

    for(var i=0;i<7;i++){
        dustPic[i]=new Image();
        dustPic[i].src="./imgs/dust"+i+".png";
    }

    data=new dataObj();

    wave=new waveObj();

    halo=new haloObj();

    dust=new dustObj();
    dust.init();

    resetGame();
}
function resetGame() {
    mom.init();
    baby.init();
    data.reset();
}
function gameloop() {
    requestAnimationFrame(gameloop);
    var now=Date.now();
    deltaTime=now-lastTime;
    lastTime=now;
    if(deltaTime>40) deltaTime=40;
    //console.log(deltaTime);
    drawBackground();
    ane.draw();
    fruitMonitor();
    fruit.draw();
    ctx1.clearRect(0,0,canWidth,canHeight);
    mom.draw();
    baby.draw();
    momFruitCollision();
    momBabyCollision();
    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();
}
function onMouseMove(e){
    if(!data.gameOver){
        if(e.offsetX|| e.layerX){
            mx= e.offsetX==undefined? e.layerX: e.offsetX;
            my= e.offsetY==undefined? e.layerY: e.offsetY;
        }
    }
}
function play_again_show() {
    play_again_btn.className="show";
    play_again_btn.addEventListener('click',play_again_exec,false);
}
function play_again_exec() {
    play_again_btn.className="";
    play_again_btn.removeEventListener('click',play_again_exec);
    resetGame();
}