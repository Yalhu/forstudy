

// # 几种继承写法
// ## 构造函数
// ## 原型
// ## 组合



// # mianshiti-laoshi-201604
class Flyer{
constructor(name,speed){
    this.name=name;
    this.speed=speed;
}
fly(){//Flyer.prototype.fly
    console.log("飞行");
}
}
class Plane extends Flyer{
constructor(name,speed,score){
    super(name,speed);
    this.score=score;
}
getScore(){//Plane.prototype.getScore
    console.log("得分");
}
}
var f16=new Plane("F16",1000,20);
f16.fly();
f16.getScore();
console.dir(f16)
console.log(
Flyer.prototype.isPrototypeOf(
    Plane.prototype
)
);

// # 几种创建写法



// # 
function Foo(){
    getName = function(){ console.log("1"); }
    return this;
}
Foo.getName = function(){
    console.log("2");
}
Foo.prototype.getName = function(){
    console.log("3");
}
var getName = function(){
    console.log("4");
}
function getName(){
    console.log("5");
}
Foo.getName(); //2
getName(); //4
Foo().getName(); //1
getName(); //1
new Foo.getName(); //2 => new (Foo.getName)() new无参数列表
new Foo().getName(); // 3 => (new Foo()).getName(); //new有参数列表
new new Foo().getName(); //3 => new ((new Foo()).getName)() //new有参数列表


