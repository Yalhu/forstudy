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