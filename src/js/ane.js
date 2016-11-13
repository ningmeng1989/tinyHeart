/**
 * Created by JIANBO on 2016/7/31.
 */
var aneObj=function(){
    // this.x=[];
    // this.len=[];

    this.rootx=[];
    this.headx=[];
    this.heady=[];
    this.amp=[];
    this.alpha=0;
};
aneObj.prototype.num=50;
aneObj.prototype.init= function () {
    for(var i=0;i<this.num;i++){
        // this.x[i]=i*16+Math.random()*20;
        // this.len[i]=200+Math.random()*50;

        this.rootx[i]=i*16+Math.random()*20;
        this.headx[i]=this.rootx[i];
        this.heady[i]=canHeight-250+Math.random()*50;
        this.amp[i]=Math.random()*50+50;
    }
};
aneObj.prototype.draw=function(){
    this.alpha+=deltaTime*0.0008;
    var l=Math.sin(this.alpha);
    ctx2.save();
    ctx2.globalAlpha=0.6;
    ctx2.lineWidth=20;
    ctx2.lineCap="round";
    ctx2.strokeStyle="#3b154e";
    for(var i=0;i<this.num;i++){
        //beginPath,moveTo,lineTo,stroke,strokeStyle,lineWidth,lineCap,globalAlpha
        ctx2.beginPath();

        // ctx2.moveTo(this.x[i],canHeight);
        // ctx2.lineTo(this.x[i],canHeight-this.len[i]);

        this.headx[i]=this.rootx[i]+this.amp[i]*l;
        ctx2.moveTo(this.rootx[i],canHeight);
        ctx2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i]);

        ctx2.stroke();
    }
    ctx2.restore();
};

