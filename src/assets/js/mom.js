/**
 * Created by JIANBO on 2016/8/6.
 */
//大鱼对象
var momObj=function(){
    this.x;     //位置横坐标
    this.y;     //位置纵坐标
    this.angle;     //角度

    this.momTailTimer=0;    //尾巴序列帧计数，等间隔循环播放
    this.momTailCount=0;

    this.momEyeTimer=0;     //眼睛序列帧计数，闭着的时间间隔默认1s
    this.momEyeCount=0;
    this.momEyeInterval=1000;

    this.momBodyCount=0;    //尾巴序列帧计数
};
momObj.prototype.init=function(){
    this.x=canWidth*0.5;
    this.y=canHeight*0.5;
    this.angle=0;

    this.momBodyCount=0;    //初始化时身体序列帧重设为0
};
momObj.prototype.draw=function(){
    this.x=lerpDistance(mx,this.x,0.99);
    this.y=lerpDistance(my,this.y,0.99);

    var deltaY=my-this.y;
    var deltaX=mx-this.x;
    var beta=Math.atan2(deltaY,deltaX)+Math.PI;

    this.angle=lerpAngle(beta,this.angle,0.6);

    //tail count
    this.momTailTimer+=deltaTime;
    if(this.momTailTimer>50){
        this.momTailCount=(this.momTailCount+1)%8;
        this.momTailTimer%=50;
    }
    //mom eye count
    this.momEyeTimer+=deltaTime;
    if(this.momEyeTimer>this.momEyeInterval){
        this.momEyeCount=(this.momEyeCount+1)%2;
        this.momEyeTimer%=this.momEyeInterval;
        if(this.momEyeCount===0){
            this.momEyeInterval=Math.random()*1500+2000;
        }else{
            this.momEyeInterval=200;
        }
    }

    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);

    var momTailCount=this.momTailCount;
    var momEyeCount=this.momEyeCount;
    var momBodyCount=this.momBodyCount;

    ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);

    if(data.double===1){
        ctx1.drawImage(momBodyOra[momBodyCount],-momBodyOra[momBodyCount].width*0.5,-momBodyOra[momBodyCount].height*0.5);
    }else{
        ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height*0.5);
    }
    ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5+30,-momTail[momTailCount].height*0.5);

    ctx1.restore();
};