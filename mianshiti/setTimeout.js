/* =========================================================== */
// # 36ke 
// ## setTimeout 陷进
function fun(){
    var t=10;
    for(var i=0;i<6;i++){
        setTimeout(function(){ console.log(t,i) }, 0);
    }
}
fun() // 一次性输出 6个 10 6

/* =========================================================== */
// # [Excuse me？这个前端..]
// ## setTimeout 进化
// ### $1 基本陷进
for(var i =0; i <5; i++){
    setTimeout(function(){
      console.log(i);
    },1000* i);
} // 每隔一秒 输出 一个 5   
/* ----------------------------------- */
// ### $2 闭包 改写成 正确的
for(var i =0; i <5; i++){
    (function(i){
        setTimeout(function(){
            console.log(i);
        }, i *1000);
    })(i);
} // 隔一秒一次输出 1，2，3，...
/* ----------------------------------- */
// ### 立即执行函数
for(var i =0; i <5; i++){
    setTimeout((function(i){
      console.log(i);
    })(i), i *1000);
} // 立马输出 0 到 4 
/**
 * setTimeout 可以接受函数或者字符串作为参数，那么这里立即执行函数是个啥呢，应该是个 undefined ，也就是说等价于：
    setTimeout(undefined,...);
    立即执行函数会立即执行，那么应该是立马输出的
 */
/* ----------------------------------- */
// ### 终极：Promise，微/宏 任务
setTimeout(function(){
    console.log(1)
},0);
newPromise(function executor(resolve){
    console.log(2);
    for(var i=0; i<10000; i++){
      i ==9999&& resolve();
    }
    console.log(3);
}).then(function(){
    console.log(4);
});
console.log(5); // “2 3 5 4 1”

/* =================================================================== */
// # [023-D 你应该..]
// ## 对象方法中setTimeout和this
// ### 1
var a = 1;   
var obj = {   
  a: 2,   
  test: function() {   
    setTimeout(function(){   
      console.log(this.a);   
    }, 0);   
  }   
};   
obj.test();  //  1
/* -------------------------- */
var a = 1;   
var obj = {   
  a: 2,   
  test: function() {   
    setTimeout(function(){   
      console.log(this.a);   
    }.bind(this), 0);   
  }   
};   
obj.test();  //  2
/* ---------------------------- */
// ## setTimeout 多个参数
setTimeout(function(a, b){   
    console.log(a);   // 3
    console.log(b);   // 4
},0, 3, 4);


/* ============================================================================== */
// # [0232-D 每隔一秒..]
// ## 用setTimeout实现setInterval的功能（每隔一段时间自动执行函数）
var i=0;
function xilou(){
    i+=1;
    if(i>10){alert(i);return;}
    setTimeout("xilou()",1000);
    //用这个也可以
    //setTimeout(xilou,1000);
}

// ## 在类中使用setTimeout
    // 终于到正题了，其实在类中使用大家遇到的问题都是关于this的，只要解决了这个this的问题就万事无忧了。
function xilou(){
    this.name="xilou";
    this.sex="男";
    this.num=0;
}
xilou.prototype.count=function(){
    this.num+=1;
    alert(this.num);
    if(this.num>10){return;}
    //下面用四种方法测试,一个一个轮流测试。
    setTimeout("this.count()",1000);//A:错误 this指window
    setTimeout("count()",1000);//B:错误显示：缺少对象；实际指的是window
    setTimeout(count,1000);//C:错误显示：'count'未定义；实际指的是window
    //下面是第四种 
    var self=this;
    setTimeout(function(){self.count();},1000);//D:正确
    
}
var x=new xilou();
x.count();

/* ======================================================================= */
// # $_PS: 扩展/MDN  
// ## 1 let 解决开始的陷进，不利用闭包
for(let i=0;i<5;i++){
    setTimeout(function(){console.log(i)},i*1000)
}
// ## 2 this 可以用箭头函数，不利用bind/call，或者包装函数

// ## 3 向setTimeout()传递一个字符串而不是函数会遭受到与使用eval一样的风险.
/*
var timeoutID = scope.setTimeout(function[, delay],param1,param2,...); 
var timeoutID = scope.setTimeout(function[, delay]); 
var timeoutID = scope.setTimeout(code[, delay]);
code:这是一个替代语法，你可以使用字符串代替function ，在delay毫秒之后执行字符串 (使用该语法是不推荐的, 原因和使用 eval()一样，有安全风险)。
delay: 可选，省略-默认为0
*/
// ## -2 实际延时比设定值更久的原因：最小延迟时间>=4ms
// ## -1 最大延时值
/** 
 * 浏览器包括 IE, , Chrome, Safari, Firefox 以32个bit字节存储整数。这就会导致如果一个整数大于 2147483647 (大约24.8 天)时就会溢出，导致定时器将会被立即执行。
 */