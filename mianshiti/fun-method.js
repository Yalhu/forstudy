/* =========================================================== */
// # mianshiti-laoshi-201604
// ##　isPrime-函数记忆: 让函数记住曾经计算过的参数对应的结果。
var isPrime1=(function(){
    var hash={};
    return function(n){
        if(n<=3){
            return true;
        }else if(hash[n]!==undefined){
            return hash[n];
        }else{
            for(var i=2;i<Math.sqrt(n);i++){
                if(n%i==0){
                    return hash[n]=false;
                }
            }
            return hash[n]=true;
        }
    }
})();
Function.prototype.toMemory=function(){
    var hash={};
    var fun=this;
    return function(n){
        if(hash[n]!==undefined){
            return hash[n];
        }else{
            return hash[n]=fun.call(null,n);
        }
    }
}
function isPrime2(n){
    if(n<=3){
        return true
    }else{
        for(var i=2;i<Math.sqrt(n);i++){
            if(n%i==0){
                return false;
            }
        }
        return true;
    }
}
isPrime2=isPrime2.toMemory();
/*
for(var i=0,arr=[];i<1000000;i++){
    arr.push(parseInt(Math.random()*999));
}
console.time("isPrime1");
for(var i=0;i<arr.length;i++){
    isPrime1(arr[i]);
}
console.timeEnd("isPrime1");

console.time("isPrime2");
for(var i=0;i<arr.length;i++){
    isPrime2(arr[i]);
}
console.timeEnd("isPrime2");
*/
/* ______________________________________________ */
// ## fibonnacii 
function fib(n){
    if(n<=2){
        return 1;
    }else{
        for(var i=3,f1=1,f2=1;i<=n;i++){
            f2=f1+(f1=f2);
        }
        return f2;
    }
}
console.log(fib(10));

for(var i=0,arr=[];i<1000000;i++){
    arr.push(parseInt(Math.random()*999));
}
fib=fib.toMemory();
console.time("fib");
for(var i=0;i<arr.length;i++){
    fib(arr[i]);
}
console.timeEnd("fib");
/* _____________________________ */
// ## $_PS: fibonnacii
// 直接用不作处理的递归求解
const climbStairs = (n) => n < 3 ? n : climbStairs(n-1) + climbStairs(n-2) 
// ### 递推求解。
const climbStairs = (n) => {
// ### 用一个数组保存每一次的结果
  let arr = new Array(n)
  for(let i = 1; i <= n; i++) {
    if(i < 3) {
      arr[i - 1] = i
    } else {
      // 逐一递推得到结果
      arr[i - 1] = arr[i - 2] + arr[i - 3]
    }
  }
  return n <= 0 ? 0 : arr[n - 1]
}
// ### 用下面的改写:交换大小数/重新赋值数据
function climbStairs(n){
    var x1=x2=1;// 
    for(var i=1;i<n;i++){
        x2=x1+x2;
        x1=x2-x1;
    }
    return x2;
}

/* _____________________________ */
// ## arguments.callee
function work(){
    var sum=0;
    for(var i=0;i<arguments.length&&arguments[0]>0;i++){
        sum+=arguments[i]+arguments.callee(--arguments[i])
    }
    return sum;
}
console.log(work(3,2,1));//10
/* _____________________________ */
// ## 柯里化 currying
function add(n){//n
    return function(m){
        n+=m;
        arguments.callee.toString=function(){
            return n;
        }
        return arguments.callee;//引用当前正在调用的函数本身
    }
}
//alert(add(1)(2)(3)/*.toString()*/);
//alert(add(1)(2)(3)(4)/*.toString()*/);

/* =========================================================== */
// ## $_PS:  柯里化
function fn(n){
    var count=n;
    var tem=function(m){
        count=count*m;
        return tem;
    }
    tem.toString=function(){
        return count;
    }
    return tem;
}
console.log(fn(2)(3)(4)) // 24

/* =========================================================== */
// # [10个JavaScript难点..]
/* ______________________________________________ */
// ## 8.柯里化 currying
var add = function(x) {
    return function(y) {
        return x + y;
    };
};
console.log(add(1)(1)); // 输出2
var add1 = add(1);
console.log(add1(1)); // 输出2
var add10 = add(10);
console.log(add10(1)); // 输出11
/* _____________________________ */
// ## 9.Memoization
function memoizeFunction(func){
var cache = {};
    return function(){
        var key = arguments[0];
            if (cache[key]){
            return cache[key];
        }else{
            var val = func.apply(this, arguments);
            cache[key] = val;
            return val;
        }
    };
}
var fibonacci = memoizeFunction(function(n){
    return (n === 0 || n === 1) ?n : fibonacci(n - 1) + fibonacci(n - 2);
});
// console.log(fibonacci(100)); // 输出354224848179262000000
// console.log(fibonacci(100)); // 输出354224848179262000000
/* ______________________________________________ */
// ## 10.函数重载
function addMethod(object, name, f){　　
    var old = object[name];　　
    object[name] = function(){
        // f.length为函数定义时的参数个数
        // arguments.length为函数调用时的参数个数　　　　
        if (f.length === arguments.length){　　
            return f.apply(this, arguments);　　　　
        }else if (typeof old === "function"){
            return old.apply(this, arguments);　　　　
        }　　
    };
}
// 不传参数时，返回所有name
function find0(){　　
    returnthis.names;
}
// 传一个参数时，返回firstName匹配的name
function find1(firstName){　　
    var result = [];　　
    for (var i = 0; i < this.names.length; i++){　　　　
        if (this.names[i].indexOf(firstName) === 0){　　　　　　
            result.push(this.names[i]);　　　　
        }　　
    }　　
    return result;
}
// 传两个参数时，
// 返回firstName和lastName都匹配的name
function find2(firstName, lastName){　
    var result = [];　　
    for (var i = 0; i < this.names.length; i++){　　　　
        if (this.names[i] === (firstName + " " + lastName)){　　　　　　
        result.push(this.names[i]);　　　　
        }　　
    }　　
    return result;
}
var people = {　　
    names: ["Dean Edwards", 
    "Alex Russell", "Dean Tom"]
};
addMethod(people, "find", find0);
addMethod(people, "find", find1);
addMethod(people, "find", find2);
console.log(people.find()); // 输出["Dean Edwards", "Alex Russell", "Dean Tom"]
console.log(people.find("Dean")); // 输出["Dean Edwards", "Dean Tom"]
console.log(people.find("Dean", "Edwards")); // 输出["Dean Edwards"]




/* =========================================================== */
// # [251-S 前端面试中的常见的.. ]
// ## Q1 判断一个单词是否是回文？
function checkPalindrom(str) {      
    return str == str.split('').reverse().join(''); 
}
/* ______________________________________________ */
// ## Q5 不借助临时变量，进行两个整数的交换
function swap(a , b) {   
     b = b - a;  a = a + b;  b = a - b;  return [a,b]; 
}



/* =========================================================== */
// # 36ke 
// ## '1234567898765432123....' 第n位是什么   
/* ______________________________________________ */
// ##  格式化输出字符串: "sds123;a pos198sdfs2342ads23"输出 [123,1982342,23]
var s="sds123;a pos198sdfs2342ads23";
s.match(/([1-9]*)/g) // ["", "", "", "123", "", "", "", "", "", "", "198", "", "", "", "", "2342", "", "", "", "23", ""]



/* =========================================================== */
// ## 字符串的字节长度
function getBytes(str){
    var len=str.length;
    var bytes=len;
    for(var i=0;i<len;i++){
        if(str.charCodeAt(i)>255) bytes++;
    }
    return bytes;
}
console.log(getBytes("你好，as"))

/* ______________________________________________ */
// ## 输入日期格式YYYY-MM-DD，比如2016-05-13
function format(date){
    var Y=date.getFullYear();
    var M=date.getMonth()+1;
    M<10&&(M="0"+M)
    var D=date.getDate();
    D<10&&(D="0"+D)
    var day=date.getDay();
    var week=['日','一','二','三','四','五','六']
    // var 
    return Y+'年'+M+'月';
    // ..
}
console.log(format(new Date()))

/* ______________________________________________ */
// ## 域名解析
// var reg="(\\d{3})(\\d{3})(\\d{1})(\\d{3})"
var str="2502501133"
var zz=[]
for(var i=1;i<4;i++){
    var reg="(\\d{3})(\\d{3})(\\d{"+i+"})(\\d{"+(4-i)+"})"
    var r=new RegExp(reg)
    zz.push(str.replace(r,"$1.$2.$3.$4"))
}
console.dir(zz) // 250.250.1.133 250.250.11.33 250.250.113.3


/* =========================================================== */

