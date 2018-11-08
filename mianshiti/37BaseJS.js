// # 37个JavaScript基本面试问题和解答
// ## 3 this
var myObject = {    
    foo: "bar",    
    func: function() { 
        var self = this;        
        console.log("outer func:  this.foo = " + this.foo);   //bar $PS:undefined  
        console.log("outer func:  self.foo = " + self.foo);    // bar    
        (function() {          
            console.log("inner func:  this.foo = " + this.foo);  // undefined   
            console.log("inner func:  self.foo = " + self.foo);   // bar     
        }());    
    } 
}; 
myObject.func();

// ## 11 
console.log(sum(2,3));   // Outputs 5
console.log(sum(2)(3)); // Outputs 5
function sum(x) {  
    if (arguments.length == 2) {    
        return arguments[0] + arguments[1];  
    } else {  
      return function(y) { return x + y; };  
    } 
}

function sum(x, y){  
    if (y !== undefined) {
        return x + y;  
    } else {    
        return function(y){ return x + y; };  
    } 
}

// ## 4
var arr1 = "john".split('');
var arr2 = arr1.reverse();
var arr3 = "jones".split(''); 
arr2.push(arr3); 
console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1)); // array 1: length=5 last=j,o,n,e,s
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1)); // array 2: length=5 last=j,o,n,e,s
// arr1和arr2是相同的（即['n'，'h'，'o'，'j'，['j'，'o'，'n'，'e'，'s']]）
// $PS: console.log 中 使用数组的 toString 打散输出


// ## 16、如果数组列表太大，以下递归代码将导致堆栈溢出。你如何解决这个问题，仍然保留递归模式？
var list = readHugeList();
var nextListItem = function(){    
    var item = list.pop();    
    if (item) {      
        // process the list item...        
        nextListItem();    
    } 
};
// 解决
var nextListItem = function(){   
    var item = list.pop();    
    if (item) {   
        // process the list item...        
        setTimeout( nextListItem, 0);    
    } 
};
/**
 * 堆栈溢出被消除，因为事件循环处理递归，而不是调用堆栈。
 * 当nextListItem运行时，如果item不为null，则将超时函数（nextListItem）推送到事件队列，并且函数退出，从而使调用堆栈清零。
 * 当事件队列运行超时事件时，将处理下一个项目，并设置一个计时器以再次调用nextListItem。
 * 因此，该方法从头到尾不经过直接递归调用即可处理，因此调用堆栈保持清晰，无论迭代次数如何。
 */

// ## 23
(function(x) {    return (function(y) {        console.log(x);    })(2) })(1); // 1



//## 24
var hero = {    
    _name: 'John Doe',    
    getSecretIdentity: function (){      
      return this._name;    
    } 
};
var stoleSecretIdentity = hero.getSecretIdentity;
console.log(stoleSecretIdentity());  // undefined
console.log(hero.getSecretIdentity());  // John Doe
// 修复stoleSecretIdentity（）函数的一种方法
// var stoleSecretIdentity = hero.getSecretIdentity.bind(hero);


// ## 25 25、创建一个函数，给定页面上的DOM元素，将访问元素本身及其所有后代（不仅仅是它的直接子元素）。
// 对于每个访问的元素，函数应该将该元素传递给提供的回调函数。
/**
 * 访问树中的所有元素（DOM）是[经典的深度优先搜索算法]Depth-First-Search algorithm应用程序。
 */
function Traverse(p_element,p_callback){   
    p_callback(p_element);   
    varlist = p_element.children;  
    for (var i = 0; i < list.length; i++) {       
        Traverse(list[i],p_callback);  // recursive call   
    } 
}

//## 27 
var length = 10;
function fn() {   
    console.log(this.length); 
}
var obj = { 
    length: 5,  
    method: function(fn) {    
        fn();    
        arguments[0]();  
    } 
}; 
obj.method(fn, 1); // 10,3 //  $PS: 5，？ 
/**
 * 当在内部方法中调用fn（）时，该函数在全局级别作为参数传递，this.length将有权访问在Object obj中定义的var length = 10（全局声明）而不是length = 5。
   $_PS: 此时fn的调用方式和 ## 3 时是不一样：这里fn定义在全局，## 3 是对象的方法，所以this指向调用者 
    
 * 现在，我们知道我们可以使用arguments []数组访问JavaScript函数中的任意数量的参数。
    因此arguments[0]只不过是调用fn（）。在fn里面，这个函数的作用域成为参数数组，并且记录参数[]的长度将返回2。
 */

//## 28 
(function () {    
    try {        
        throw new Error();    
    } catch (x) {        
        var x = 1, y = 2;        
        console.log(x);    // 1
    }    
    console.log(x);    // undefined
    console.log(y); // 2
})();
/**
 * var语句被挂起（没有它们的值初始化）到它所属的全局或函数作用域的顶部，即使它位于with或catch块内。
 * 但是，错误的标识符只在catch块内部可见。它相当于：
 */

// ## 36 
console.log(typeof typeof 1); // string

// ## 35 区分大小写,包括null   
typeof undefined == typeof NULL // true: typeof Null // "undefined",单独输出NULL 会报错
typeof undefined == typeof null // false: typeof null // "object"




// ## 34
var a = [1, 2, 3];
a[10] = 99;
console.log(a[6]); // undefined

// ## 32
console.log(1 < 2 < 3);  // true
console.log(3 > 2 > 1);  // false
/**
 * 第二个返回false是因为引擎如何针对<和>的操作符关联性工作。
 * 它比较从左到右，所以3> 2> 1 JavaScript翻译为true> 1. true具有值1，因此它比较1> 1，这是错误的。
 */

