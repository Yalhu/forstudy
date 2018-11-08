// # 5.5.1 prototype和内置类
// #### 自己扩展类的原型
Array.prototype.each=function(fun){
    for(var i=0,n=this.length;i<n;i++){
        fun(this[i],i)
    }
}
Array.prototype.clone=function(){
    var o=[];
    this.each(function(v,k){
        o[k]=v;
    });
    return o;
}
Array.prototype.map=function(fun){
    var o=[];
    this.each(function(v,k){
        o[k]=fun(v,k)
    })
}
//ie delete保留字
Array.prototype.Delete=function(a){
    var o=this.clone();
    for(var i=o.length,n=0;i>n;i--){
        if(o[i]==a){
            o.splice(i,1);
        }
    }
    return o;
}
var a=[1,2,3,2,4,5];
var str="";
a.each(function(v,k){
    str+=k+" : "+v+"\n";
});
console.log(str);

var b=a.map(function(v,k){
    return v*10;
})
console.log(a);
console.log(b);

var c=b.Delete(20);
console.log(c);

// #### 除了扩展，还可以重写 
var a=[1,2,4];
alert(a)//1,2,4
Array.prototype.toString=function(str){
    return "I'm an array"
};
alert(a);//I'm an array
//自动调用a的toString。在需要字符串时，对象会隐式调用toString，包括我们自定义的对象[object Object]  
function Dog(o){
    this.name=o;
}
var myDog=new Dog("wang cai");
alert(myDog);//[object Object]
Dog.prototype.toString=function(){
    return "my name is "+this.name;
}
alert(myDog);//my name is

var me={
    name:"adang",
    email:"csdf@sf.com",
    toString:function(){
        return "I'm adang,my email is"
    }
}
alert(me);//I'm adang,my email is

//#### 5、修改内置类的原型---方便，但有人排斥----污染，多人合作对他人造成影响，修改了游戏规则。
//改进myArray:自定义类，将内置类的实例做为参数传给构造函数；
function myArray(o){
    this.getArray=function(){
        return o;
    }
}
myArray.prototype={
    each:function(fun){
        var o=this.getArray();
        for(var i=0,n=o.length;i<n;i++){
            fun(o[i],i)
        }
    }
};
var a=new myArray([1,2,4]),str="";
a.each(function(v,k){
    str+=k+" : "+v+"\n";
});
console.log(str);
