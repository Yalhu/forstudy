// # 第六章 继承
// 2018.1.7 六 13:00--14:00
// ## 6.1 原型链
function Shape(){}
Shape.prototype.name='shape'
Shape.prototype.toString=function(){return this.name}

function TwoDShape(){}
TwoDShape.prototype=new Shape()
TwoDShape.prototype.constructor=TwoDShape
//扩展原型对象前先完成，相关的继承关系，构建
TwoDShape.prototype.name='2D shape'

function Triangle(side,height){
    this.side=side
    this.height=height
}
Triangle.prototype=new TwoDShape()
Triangle.prototype.constructor=Triangle
//扩展原型对象前先完成，相关的继承关系，构建
Triangle.prototype.name='Triangle'
Triangle.prototype.getArea=function(){return this.side*this.height/2}



// ## 6.2 只继承于原型 
TwoDShape.prototype=Shape.prototype
TwoDShape.prototype.constructor=TwoDShape
//new Shape()会将Shape的属性设定为对象自身的属性，这样的代码是不可重用的
// 临时构造器 new F()
var F=function(){}
F.prototype=Shape.prototype
TwoDShape.prototype=new F()
TwoDShape.prototype.constructor=TwoDShape

// ## 6.3 uber————子对象访问父对象的方式
Shape.prototype.toString=function(){
    var result=[]
    if(this.constructor.uber){
        result[result.length]=this.constructor.uber.toString()
    }
    result[result.length]=this.name
    return result.join(', ')
}
TwoDShape.uber=Shape.prototype
// ## 6.4 将继承部分封装成函数-- extend
function extend(Child,Parent){
    var F=function(){}
    F.prototype=Parent.prototype;
    Child.prototype=new F();
    Child.prototype.constructor=Child;
    Child.uber=Parent.prototype;
}
// ## 6.5 属性拷贝 extend2
function extend2(Child,Parent){
    var p=Parent.prototype;
    var c=Child.prototype;
    for(var i in p){
        c[i]=p[i];
    }
    c.uber=p;
}
// ## 6.6 小心处理引用拷贝

// ## 6.7 对象之间的继承
function extendCopy(p){
    var c={};
    for(var i in p){
        c[i]=p[i];
    }
    c.uber=p;
    return c;
}


// ## 6.8 深拷贝
function deepCopy(p,c){
    var c=c||{};
    for(var i in p){
        if(typeof p[i]==='object'){
            c[i]=(p[i].constructor===Array)?[]:{};
            deepCopy(p[i],c[i]);
        }else{
            c[i]=p[i];
        }
    }
    c.uber=p;
    return c;
}

// 2018.1.7 18:30
// ## 6.9 object() 
 //函数使用与extendCopy()基本相同：
        //传给某个对象，并创建新对象。再对新对象扩展处理
function object(o){
    var n;
    function F(){};
    F.prototype=o;
    n= new F();
    n.uber=o;
    return n ;
}   

// ## 6.10 原型继承与属性拷贝混合应用

// ## 6.11 多重继承
// 混合插入

// ## 6.12 寄生式继承

// ## 6.13 构造器借用 

// ## 6.14 本章小结
// 两类：基于构造器工作，基于对象
// 或者：是否使用原型，是否执行属性拷贝，两者都有（执行原型属性拷贝）


// ## 6.15 案例学习：图形绘制
// ## 6.16 练习题






function log(){
    console.log.apply(console,arguments)
    // console.log.call(console,arguments)//输出一个数组
        //log(2): [2, callee: ƒ, Symbol(Symbol.iterator): ƒ]
}
// log(2)
// log([1,2])

console.log(Math.max.apply(Math,[1,2,4,6,3,2]))