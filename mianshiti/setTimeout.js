// # 36ke 
function fun(){
    var t=10;
    for(var i=0;i<6;i++){
        setTimeout(function(){ console.log(t,i) }, 0);
    }
}
fun() // 6个 10 6

// # [Excuse me？这个前端..]
// ## 
for(var i =0; i <5; i++){
    setTimeout(function(){
      console.log(i);
    },1000* i);
}
// ## 
for(var i =0; i <5; i++){
    (function(i){
        setTimeout(function(){
        console.log(i);
        }, i *1000);
    })(i);
}
// ## 
for(var i =0; i <5; i++){
    (function(i){
      setTimeout(function(){
        console.log(i);
      }, i *1000);
    })(i);
}
// ## 
for(var i =0; i <5; i++){
    setTimeout((function(i){
      console.log(i);
    })(i), i *1000);
}
// ## 
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
console.log(5);
// “2 3 5 4 1”


// # [023-D 你应该..]
var a = 1;   
// ## 2
var obj = {   
  a: 2,   
  test: function() {   
    setTimeout(function(){   
      console.log(this.a);   
    }, 0);   
  }   
};   
obj.test();  //  1
// ## 2
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
// ## 3
setTimeout(function(a, b){   
    console.log(a);   // 3
    console.log(b);   // 4
},0, 3, 4);


// # [0232-D 每隔一秒..]
// ## 2,用setTimeout实现setInterval的功能（每隔一段时间自动执行函数）
var i=0;
function xilou(){
    i+=1;
    if(i>10){alert(i);return;}
    setTimeout("xilou()",1000);
    //用这个也可以
    //setTimeout(xilou,1000);
}
// ## 3,在类中使用setTimeout
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
    setTimeout("this.count()",1000);//A:当下面的x.count()调用时会发生错误：对象不支持此属性或方法。
    setTimeout("count()",1000);//B:错误显示：缺少对象
    setTimeout(count,1000);//C:错误显示：'count'未定义
    //下面是第四种 
    var self=this;
    setTimeout(function(){self.count();},1000);//D:正确
    
}
var x=new xilou();
x.count();