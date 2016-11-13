/**
 * Created by JIANBO on 2016/8/6.
 */
var fruitObj= function () {
    this.alive=[];
    this.x=[];
    this.y=[];
    this.l=[];
    this.aneNO=[];
    this.spd=[];
    this.fruitType=[];
    this.orange=new Image();
    this.blue=new Image();
};
fruitObj.prototype.num=30;
fruitObj.prototype.init= function () {
    for(var i=0;i<this.num;i++){
        this.alive[i]=false;
        this.x[i]=0;
        this.y[i]=0;
        this.l[i]=0;
        this.spd[i]=Math.random()*0.017+0.003;//[0.003,0.02]
        //this.born(i);
        this.fruitType[i]="";
    }
    this.orange.src="./imgs/fruit.png";
    this.blue.src="./imgs/blue.png";

};
fruitObj.prototype.draw=function(){
    for(var i=0;i<this.num;i++){
        //draw
        //find an ane,grow,fly up
        if(this.alive[i]){
            if(this.fruitType[i]=="orange"){
                var pic=this.orange;
            }else{
                var pic=this.blue;
            }
            if(this.l[i]<=14){
                this.l[i]+=this.spd[i]*deltaTime;
                this.x[i]=ane.headx[this.aneNO[i]];
                this.y[i]=ane.heady[this.aneNO[i]];
            }else{
                this.y[i]-=this.spd[i]*7*deltaTime;
            }
            ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
            if(this.y[i]<10){
                this.alive[i]=false;
            }
        }
    }
};
fruitObj.prototype.born= function (i) {
    // var aneId=Math.floor(Math.random()*ane.num);
    // this.x[i]=ane.x[aneId];
    // this.y[i]=canHeight-ane.len[aneId];
    // this.x[i]=ane.headx[aneId];
    // this.y[i]=ane.heady[aneId];
    this.aneNO[i]=Math.floor(Math.random()*ane.num);
    this.l[i]=0;
    this.alive[i]=true;
    var ran=Math.random();
    if(ran<0.7){
        this.fruitType[i]="orange";
    }else{
        this.fruitType[i]="blue";
    }
};
fruitObj.prototype.dead= function (i) {
    this.alive[i]=false;
};
function fruitMonitor(){
    var num=0;
    for(var i=0;i<fruit.num;i++){
        if(fruit.alive[i]) num++;
    }
    if(num<15){
        sendFruit();
        return;
    }
}
function sendFruit(){
    for(var i=0;i<fruit.num;i++){
        if(!fruit.alive[i]){
            fruit.born(i);
            return;
        }
    }
}

//fruitObj.prototype.update= function () {
//    var num=0;
//    for(var i=0;)
//}