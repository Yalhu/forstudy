// # mianshiti-laoshi-201604
/*
var f=function(){var a=b=1;};
f();
console.log(b);//1
console.log(a);//报错
*/
/*
var f=function(){var a=b=1;};
setTimeout(f,0);
console.log(b);//报错
//f();
*/
/*
var a,b=0,fn=function(){var a=b=2;};
fn();
console.log(a);//undefined
console.log(b);//2
*/
/*函数currying
function add(n){//n
return function(m){
    n+=m;
    arguments.callee.toString=function(){
    return n;
    }
    return arguments.callee;
        //引用当前正在调用的函数本身
}
}
*/
//alert(add(1)(2)(3)/*.toString()*/);
//alert(add(1)(2)(3)(4)/*.toString()*/);

function work(){
var sum=0;
for(var i=0;
    i<arguments.length&&arguments[0]>0;
    i++){
    sum+=arguments[i]
        +arguments.callee(--arguments[i])
}
return sum;
}
console.log(work(3,2,1));//10