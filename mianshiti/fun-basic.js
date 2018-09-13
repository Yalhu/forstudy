/* =========================================================== */
// # mianshiti-laoshi-201604
// ## 变量声明/提升
// ### 1
var f=function(){var a=b=1;};
f();
console.log(b);//1
console.log(a);//报错
// ### 2
var f=function(){var a=b=1;};
setTimeout(f,0);
console.log(b);//报错
f();
// ### 3
var a,b=0,fn=function(){var a=b=2;};
fn();
console.log(a);//undefined
console.log(b);//2

/* _____________________________ */
// ## 闭包
// ### 1 
function fun(n,o){
    console.log(o);
    return {
        fun:function(m){
            return fun(m,n);
        }
    };
}
var a=fun(0);//undefined
a.fun(1);//0
a.fun(2);//0
a.fun(3);//0
var b=fun(0).fun(1).fun(2).fun(3); //undefined   0      1      2
var c=fun(0).fun(1); //undefined   0
c.fun(2);//1
c.fun(3);//1
//### 2
var a=0,b=0;
function A(a){
    A=function(b){alert(a+b++)};
    alert(a);
}
A(1);//1
//A: function(b){(a=1)alert(a+b++)};
A(12);//13

/* =========================================================== */
// # [10个JavaScript难点..]
/* ______________________________________________ */
// ## 2 闭包
function f1(){
    var N = 0; 
    // N是f1函数的局部变量
    // f2是f1函数的内部函数，是闭包
    function f2() {
        N += 1; 
        // 内部函数f2中使用了外部函数f1中的变量N
        console.log(N);
    }
    return f2;
}
var result = f1();
result(); // 输出1
result(); // 输出2
result(); // 输出3
/* ______________________________________________ */
// ## 3. 使用闭包定义私有变量
function Product() {
var name;
    this.setName = function(value) {
        name = value;
    };
    this.getName = function() {
        return name;
    };
}
var p = new Product();
p.setName("Fundebug");
console.log(p.name);// 输出undefined
console.log(p.getName()); // 输出Fundebug
/* ______________________________________________ */
// ## 4. prototype
function Rectangle(x, y){
    this._length = x;
    this._breadth = y;
}
Rectangle.prototype.getDimensions = function(){
    return {
        length: this._length,
        breadth: this._breadth
    };
};
var x = new Rectangle(3, 4);
var y = new Rectangle(4, 3);
console.log(x.getDimensions()); // { length: 3, breadth: 4 }
console.log(y.getDimensions()); // { length: 4, breadth: 3 }
/* ______________________________________________ */
// ## 5. 模块化
var module = (function() {
    var N = 5;
    function print(x) {
        console.log("The result is: " + x);
    }
    function add(a) {
        var x = a + N;
        print(x);
    }
    return {
        description: "This is description",
        add: add
    };
})();
console.log(module.description); // 输出"this is description" 
module.add(5);  // 输出“The result is: 10”


/* =========================================================== */
// # [024-D 函数节流与函数防.. ]
// ## 函数节流和防抖
// 函数节流: 指定时间间隔内只会执行一次任务；
// 函数防抖: 任务频繁触发的情况下，只有任务触发的间隔超过指定间隔的时候，任务才会执行。
function throttle(fn, wait) {
    var previous = 0
    var timer = null
    return function () {
        var context = this
        var args = arguments
        if (!previous) {
            previous = Date.now()
            fn.apply(context, args)
        } else if (previous + wait >= Date.now()) {
            if (timer) {
                // console.log(timer)
                clearTimeout(timer)
                timer = null
            }
            // console.log(timer)
            timer = setTimeout(function () {
                // console.log(timer)
                previous = Date.now()
                fn.apply(context, args)
            }, wait)
        } else {
            previous = Date.now()
            fn.apply(context, args)
        }
    }
}
// 节流：间隔一定时间触发回调来控制函数调用频率  // 拖拽功能，射击游戏，计算鼠标移动的距离，Canvas 模拟画板功能，搜索联想
    // 监听滚动事件判断是否到页面底部自动加载更多：给 scroll 加了 debounce 后，只有用户停止滚动后，才会判断是否到了页面底部；
       // 如果是 throttle 的话，只要页面滚动就会间隔一段时间判断一次
// 去抖：对于连续的事件响应我们只需要执行一次回调 //  resize/scroll 触发统计事件，文本输入的验证（
function debounce(fn, wait) {
    var timer = null;
    return function () {
        var context = this
        var args = arguments
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(function () {
            fn.apply(context, args)
        }, wait)
    }
}




/* =========================================================== */
// \# [js使用记录]
// ## parseInt(string, radix) radix:可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。
[1,2,3].map(parseInt)//[1, NaN, NaN]
[10,10,10].map(parseInt) // [10, NaN, 2]
// ## numObj.toString([radix])  radix: 指定要用于数字到字符串的转换的基数(从2到36)。如果未指定 radix 参数，则默认值为 10。
(8).toString(2) //1000
// ## unicode
'a'.charCodeAt(0); /*97*/
'a'.charCodeAt().toString(16); /*61*/
'\u0061'  /* 'a' */
'a'.length /* 1 */
'中'.length /* 1 */
// ## 随机字符串
Math.random().toString(36).substr(2); // 
(Math.random()*Math.pow(2,64)).toString(36) 
("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4)  


