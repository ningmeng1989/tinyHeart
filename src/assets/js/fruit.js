/**
 * Created by JIANBO on 2016/8/6.
 */
var fruitObj= function () {
    this.alive=[];  //果实生命状态
    this.x=[];      //位置横坐标
    this.y=[];      //位置纵坐标
    this.l=[];      //果实直径
    this.aneNO=[];  //果实产生在的海葵的序号
    this.spd=[];    //速度
    this.fruitType=[];      //果实类型
    this.orange=new Image();
    this.blue=new Image();
};
fruitObj.prototype.num=30;  //果实数量
fruitObj.prototype.init= function () {
    for(var i=0;i<this.num;i++){
        this.alive[i]=false;
        this.x[i]=0;
        this.y[i]=0;
        this.l[i]=0;
        this.spd[i]=Math.random()*0.017+0.003;//[0.003,0.02]
        this.fruitType[i]="";
    }
    this.orange.src="assets/imgs/fruit.png";
    this.blue.src="assets/imgs/blue.png";
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
                //果实长在海葵上，所以生长过程中，位置与所出生的海葵一致
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
    //果实出生时，记录下所出生的海葵的序号
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
//果实数量检测
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
//发送果实
function sendFruit(){
    for(var i=0;i<fruit.num;i++){
        if(!fruit.alive[i]){
            fruit.born(i);
            return;
        }
    }
}