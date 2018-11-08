
// ## 几种继承写法
/* =========================================================== */
// # [js面向对象编程（二）：构造函数的继承..]
function Animal(){
    this.species = "动物";
}
function Cat(name,color){
    this.name = name;
    this.color = color;
}
// ## 一、 构造函数绑定  6-13_stealingInherit.html 构造器借用
    /** 继承了id属性，但并没有继承父对象原型中的其他任何东西
     * 因为没有调用new Shape()创建任何一个实例，自然其原型也没有用的
     * 
     */
function Cat(name,color){
    Animal.apply(this, arguments);
    this.name = name;
    this.color = color;
}
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
// ## 1 二、 prototype模式  6-1_GouZao-Inherit.html 构造函数继承
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物

// ## 2 三、 直接继承prototype   6-2_onlyProtoInherit.html 只继承于原型
    // 我们也可以让Cat()跳过 Animal()，直接继承Animal.prototype。
    /* 1如前面可重用的添加到原型。若好习惯，仅仅依靠原型完成继承关系
     （原型中所有代码都是可重用的）Shape.prototype比继承自new Shape()创建的实体好的多
     毕竟new Shape()，会将Shape的属性设为对象自身的属性，这样的代码是不可重用的 
    */

function Animal(){ }
Animal.prototype.species = "动物";
Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat;
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
/**与前一种方法相比，这样做的优点是效率比较高（不用执行和建立Animal的实例了），比较省内存。
 * 缺点是 Cat.prototype和Animal.prototype现在指向了同一个对象，
 * 那么任何对Cat.prototype的修改，都会反映到Animal.prototype。 
 */
// ## 3 uber-子对象访问父对象的方式 
// ## 4 四、 利用空对象作为中介  6-2_onlyProtoInherit.html  只继承于原型 
var F = function(){};
F.prototype = Animal.prototype;
Cat.prototype = new F();
Cat.prototype.constructor = Cat;
// 封装成函数
function extend(Child, Parent) {
    var F = function(){};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.uber = Parent.prototype;
}
extend(Cat,Animal);

// ## 5 五、拷贝继承 6-5_extend2.html  属性拷贝 
/** 
 * 构建可重用的继承代码是，也可以简单将父对象的属性拷贝给子对象；
    已经完成对child的原型扩展，不再需要重置Child.prototype.constructor。是正确的
    
    //略逊一筹，逐一拷贝，而非简单的原型链查询
        //仅适用与只包含基本数据类型的对象，所有的对象类型（函数，数组）都是不可复制的-- 
*/
function extend2(Child, Parent) {
    var p = Parent.prototype;
    var c = Child.prototype;
    for (var i in p) {
        c[i] = p[i];
    }
    c.uber = p;
}
extend2(Cat,Animal);

/* =========================================================== */
// # [js面向对象编程（三）：非构造函数的继承..]
var Chinese = {
    nation:'中国'
};
var Doctor ={
    career:'医生'
}
// ## 9 object()方法 6-9_object().html 也称为原型继承，因为将父对象设为子对象的原型
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}
//若需要访问uber属性
function object(o){
    var n;
    function F(){};
    F.prototype=o;
    n= new F();
    n.uber=o;
    return n ;
}
// ## 7 浅拷贝  6-7_inheritInObj.html 对象之间的继承
function extendCopy(p) {
    var c = {};
    for (var i in p) { 
        c[i] = p[i];
    }
    c.uber = p;
    return c;
}
// ## 8 深拷贝 6-8_deepCopy.html
    // 目前，jQuery库使用的就是这种继承方法。 
function deepCopy(p, c) {
    var c = c || {};
    for (var i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            deepCopy(p[i], c[i]);
        } else {
            c[i] = p[i];
        }
    }
    return c;
}

/* =========================================================== */
// # github/forstudy/OOP-proto&Inherit/  
// ## 6.6 小心处理引用拷贝  
// ## 6.10 原型继承与属性拷贝混合应用  6-10_hybrisInherit.html
/* 使用原型继承的方式克隆clone现存对象
 而对其他对象使用属性拷贝copy的方式 
 */
function objectPlus(o,stuff){
    var n;
    function F(){};
    F.prototype=o;
    n=new F();
    n.uber=o;
    for(var i in stuff){
        n[i]=stuff[i];
    }
    return n;
}
// ## 6.11 多重继承  6-11_multiInherit.html 
//混合插入 mixins ，如Ruby
    //不建立相关继承关系树的情况下获得对象的功能
function multi(){
    var n={},stuff,j= 0,len=arguments.length;
    for(var j=0;j<len;j++){
        stuff=arguments[j];
        for(var i in stuff){
            n[i]=stuff[i];
        }
    }
    return n;
}
var shape={
    name:'shape',
    toString: function () {
        return this.name;
    }
}
var twoDee={
    name:'2D shape',
    dimensions:2
}
var triangle=multi(shape,twoDee,{
    name:'Triangle',
    getArea:function(){},
    side:5,
    height:10
});

// ## 6.12 寄生式继承 6-12_jishengInherit.html 
function object(o){
    var n;
    function F(){};
    F.prototype=o;
    n= new F();
    n.uber=o;
    return n ;
}
var twoDee={
    name:'2D shape',
    dimensions:2
};
//twoD对象克隆进that（object,或全属性拷贝），，
function triangle(s,h){
    var that=object(twoDee);
    that.name='Triangle';
    that.getArea=function(){
        return this.side*this.height/2;
    }
    that.side=s;
    that.height=h;
    return that;
}
// ## 6.13 构造器借用 

// ## 6.14 本章小结
// 两类：基于构造器工作，基于对象
// 或者：是否使用原型，是否执行属性拷贝，两者都有（执行原型属性拷贝）


// ## 6.15 案例学习：图形绘制
// ## 6.16 练习题


/* =========================================================== */
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
console.log(Flyer.prototype.isPrototypeOf(Plane.prototype));





