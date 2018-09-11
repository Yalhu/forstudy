// # 颗粒函数
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

// # 36ke   
// ## '1234567898765432123....' 第n位是什么
// ##  "sds123;a pos198sdfs2342ads23"输出 [123,1982342,23]
var s="sds123;a pos198sdfs2342ads23";
s.match(/([1-9]*)/g) // ["", "", "", "123", "", "", "", "", "", "", "198", "", "", "", "", "2342", "", "", "", "23", ""]

// # 字符串的字节长度
function getBytes(str){
    var len=str.length;
    var bytes=len;
    for(var i=0;i<len;i++){
        if(str.charCodeAt(i)>255) bytes++;
    }
    return bytes;
}
console.log(getBytes("你好，as"))
// # 输入日期格式YYYY-MM-DD，比如2016-05-13
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



// 
// var reg="(\\d{3})(\\d{3})(\\d{1})(\\d{3})"
var str="2502501133"
var zz=[]
for(var i=1;i<4;i++){
    var reg="(\\d{3})(\\d{3})(\\d{"+i+"})(\\d{"+(4-i)+"})"
    var r=new RegExp(reg)
    zz.push(str.replace(r,"$1.$2.$3.$4"))
}
console.dir(zz) // 250.250.1.133 250.250.11.33 250.250.113.3

