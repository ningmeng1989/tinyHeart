/**
 * Created by JIANBO on 2016/11/12.
 */
//海底尘埃
var dustObj=function () {
    this.x=[];  //位置横坐标
    this.y=[];  //位置纵坐标
    this.amp=[];    //振幅
    this.NO=[];     //尘埃图片序号

    this.alpha;
};
dustObj.prototype.num=30;
dustObj.prototype.init=function () {
    for(var i=0;i<this.num;i++){
        this.x[i]=Math.random()*canWidth;
        this.y[i]=Math.random()*canHeight;
        this.amp[i]=20+Math.random()*25;
        this.NO[i]=Math.floor(Math.random()*7);
    }
    this.alpha=0;
};
dustObj.prototype.draw=function(){
    this.alpha+=deltaTime*0.0008;
    var l=Math.sin(this.alpha);
    for(var i=0;i<this.num;i++){
        var no=this.NO[i];
        ctx2.drawImage(dustPic[no],this.x[i]+this.amp[i]*l,this.y[i]);
    }
};