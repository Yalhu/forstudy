// # mianshiti-laoshi-201604
// ##　函数记忆: 让函数记住曾经计算过的参数对应的结果。
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
    if(n<=3){return true}
    else{
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
function fib(n){
    if(n<=2){return 1;}
    else{
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

// ## 闭包
 /*
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
*/
var a=0,b=0;
function A(a){
    A=function(b){alert(a+b++)};
    alert(a);
}
A(1);//1
//A: function(b){(a=1)alert(a+b++)};
A(12);//13