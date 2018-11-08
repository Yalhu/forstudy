/* =========================================================== */
// # 36ke 
var myObject={
  foo:"bar",
  func:function(){
      var self=this;
      console.log("outer func: this.foo="+this.foo) // bar
      console.log("outer func: self.foo="+self.foo) // bar 
      ;(function(){
          console.log("inner func: this.foo="+this.foo) // undefined
          console.log("inner func: self.foo="+self.foo) // bar 
      }())
  }
}
myObject.func()


/* =========================================================== */
// # maida shuzi
var name="global"
var oo={
  name:"oo",
  getNameFunc:function(){
      return function(){
          return this.name;
      }
  }
}
console.log(oo.getNameFunc()()) // "global"
var ooo={
  name:"ooo",
  getName:oo.getNameFunc()
}
console.log(ooo.getName()) // 'ooo'

/* =========================================================== */
// # [记Javascript一道题的理解..]
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

/* =========================================================== */
// # mianshiti-laoshi-201604
// ## day02
window.a=300;
function fn1(){
  this.a=100;
  this.b=200;
  return function(){
    alert(this.a);
  }.call(arguments[0]);
}
function fn2(){
  this.a=new fn1();
}
var a=new fn1().b;//300
  //a:200
var v=new fn1(fn2());//200
  //a:{a:100,b:200}
                      //[object Object]
/* _____________________________ */
//如果构造函数结尾返回一个引用类型的对象，则不再创建新对象。
function Human(){
  var c=function(){var a=200;}
  return c;
}
var kang=new Human();
var feng=Human();
var x=Human();
console.log(feng==x);//false
console.log(kang===feng);//false
/* _____________________________ */
var arr=[];
function fun(){
  for(var i=0;i<4;i++){
    var x={};
    x.no=i;
    x.text=arr[i];
    x.fun=function(){alert(i)};
    arr.push(x);
  }//i=4
}
//arr:[
  //{fun:function(){alert(i)}},
  //{fun:function(){alert(i)}},
  //{fun:function(){alert(i)}},
  //{fun:function(){alert(i)}},
//]
fun();
arr[0].fun();//4
arr[1].fun();//4
arr[2].fun();//4
arr[3].fun();//4
/* _____________________________ */
var setObj=function(o){
  o.name="xiaoming";
  o={};
  o.name="xiaohong";
}
var p={name:"xixi",age:24};
setObj(p);
console.dir(p);//xiaoming 24
/* _____________________________ */
var number=2;//4
var obj={
  number:4,//8
  fn1:(function(){
    this.number*=2;
    number*=2;
    var number=3;
    return function(){
      this.number*=2;
      number*=3;
      alert(number);
    }
  })()
  //fn1:function(){(number=27)
    //this.number*=2;
    //number*=3;
    //alert(number);
  //}
}
 
var fn1=obj.fn1;
alert(number);//4
fn1();//9
//number:8
obj.fn1();//27
alert(window.number);//8
alert(obj.number);//8

/* _____________________________ */
// ## day03
var x=5,o={
x:10,
doit:function doit(){
    var x=20;
    setTimeout(
    function(){alert(this.x)},10
    )
}
}
alert(o.doit());//undefined
//function(){alert(this.x)} //5
/* _____________________________ */
function Foo(){
    getName=function(){alert(1);};
    return this;
}
Foo.getName=function(){alert(2);}
Foo.prototype.getName=
function(){alert(3)};
var getName=function(){alert(4);};
function getName(){alert(5);}
Foo.getName();//2
getName();//4
Foo().getName();//1
//getName:function(){alert(1);};
//window.getName();
getName();//1
new Foo.getName();//2
new Foo().getName();//3
    //obj.getName();
new new Foo().getName();//3
    //new obj.getName()
/* _____________________________ */
var a=1;
var b={
    a:2,
    b:function(){
        console.log(this.a);//1
    }(),
    //b:undefined,
    f:this.f=function(){
        console.log(this.a);
    }
    //f:function(){console.log(this.a)}
};
//对象直接量中不属于任何方法的this，默认都指window
function f(){console.log(3);}
//f:function(){console.log(this.a);}
f();//1
b.f();//2
(b.f)();//2
(0,b.f)();//1  //逗号表达式的结果，是最后一个表达式的值
/* _____________________________ */
var foo=function(){//0x9091
  console.log(this.a);
}
var obj={a:2,foo:foo};//0x9091
var a=10;
var bar=obj.foo;//0x9091
var bar2=foo.bind(obj);
bar();//10
bar2();//2
foo();//10
obj.foo();//2
setTimeout(bar,0);//10
/* _____________________________ */
function MyObj(){
  this.p.pid++;
}
MyObj.prototype.p={pid:0};
MyObj.prototype.getNum=function(num){
  return this.p.pid+num;
}
var _obj1=new MyObj();
var _obj2=new MyObj();
console.log(_obj1.getNum(1)+_obj2.getNum(2));//7


/* =========================================================== */
// # 对象方法中 window.name 
window.name="window"
var obj={
    name:"obj",
    getName:function(){
        console.log(name)
    }
}
obj.getName()// window



/* =========================================================== */
// # 几种创建对象写法


/* =========================================================== */
function Ctor(){}
var baseConvert=function(prototype){
    Ctor.prototype=prototype
    var result=new Ctor()

    console.log(Ctor.prototype,"xx") // {sname: "21"} "xx"
    // Ctor.prototype=null
    Ctor.prototype={name:23}
    console.log(result.__proto__,"yy") // {sname: "21"} "xx", $PS:已经实现继承,指针指向 {sname:21}的地址. 后面修改的才会更新
    var result2=new Ctor()
    console.log(result2.__proto__) // {name: 23}
    return result
}
var obj=baseConvert({"sname":"21"})
