// ## 0 过程：闭包
function quhaoji(num=0){
    // var num=0
    return function(){
        return ++num
    }
}
var quhao=quhaoji()
quhao() // 1
quhao() // 2

var quhao1=quhaoji(100)
quhao1() // 101
quhao1() // 102


// ## 1.1 OOP : 构造函数
function Quhaoji(num=0){
    this.num=num;
}
Quhaoji.prototype.quhao=function(){return ++this.num}
var quhaoji1=new Quhaoji()
quhaoji1.quhao()// 1
var quhaoji2=new Quhaoji(100)
quhaoji2.quhao(); // 101

// ## 1.2 OOP : Class
class Quhaoqi {
    constructor(num){
        this.num=num;
    }
    quhao(){
        return this.num;
    }
}
var quhaoji1=new Quhaoqi()
quhaoji1.quhao()// 1
var quhaoji2=new Quhaoqi(100)
quhaoji2.quhao(); // 101

// ## 1.3 OOP : 字面量
var quhaoji={
    num:0,
    init:function(num){
        this.num=num;
    },
    quhao:function(){
        return ++this.num
    }
}
quhaoji.quhao();
var quhaoji2=Object.assign({},quhaoji,{num:100})
quhaoji2.quhao();

/** myArray */
var myArr=function(){}
myArr.prototype=new Array()
myArr.prototype.construtor=myArr

var mine=new myArr()
mine.push(1,23)
mine.length
mine instanceof Array  // true
mine instanceof myArr   // ture