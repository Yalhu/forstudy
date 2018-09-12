/* =========================================================== */
// # mianshiti-laoshi-201604
// ## unique
var arr=["air","b","clock","air","clock","air"];
//方法一: 使用遍历
function unique1(arr){
    for(var i=0,unique=[];i<arr.length;i++){
        unique.indexOf(arr[i])==-1&&unique.push(arr[i]);
    }
    return unique;
}
//方法二: 使用hash
function unique2(arr){
    for(var i=0,hash={};i<arr.length;i++){
        hash[arr[i]]===undefined?(hash[arr[i]]=1):hash[arr[i]]++;
    }
    //return hash;//统计出现的次数
    //只获取hash中的key组成新数组
    var keys=[];
    var i=0;
    for(keys[i++] in hash);
    return keys;
}
//console.dir(unique2(arr));
//方法三: 使用正则:
function unique3(arr){
    var reg=/(^|,,)([^,]+)(,,\2)*/g;
    return arr.sort()
            .join(",,")
            .replace(reg,"$1$2")
            .split(",,");
}
console.log(unique3(arr));

for(var i=0,arr=[];i<1000000;i++){
    arr.push(parseInt(Math.random()*999));
}
console.time("unique1");
unique1(arr);
console.timeEnd("unique1");
console.time("unique2");
unique2(arr);
console.timeEnd("unique2");
console.time("unique3");
unique3(arr);
console.timeEnd("unique3");


/* =========================================================== */
// # [251-S 前端面试中的常见的.. ]
// ## Q3 统计一个字符串出现最多的字母 
function findMaxDuplicateChar(str) {    
    if(str.length == 1) {   
         return str;  
    }  
    let charObj = {};  
    for(let i=0;i<str.length;i++) {    
        if(!charObj[str.charAt(i)]) {      
            charObj[str.charAt(i)] = 1;    
        }else{      
            charObj[str.charAt(i)] += 1;    
        }  
    }  
    let maxChar = '',      maxValue = 1;  
    for(var k in charObj) {    
        if(charObj[k] >= maxValue) {      
            maxChar = k;      
            maxValue = charObj[k];    
        }  
    }  
    return maxChar; 
}



/* =========================================================== */
// # [034-D 判断数组中是否有重复值..]
// ## 是否有重复值
// ### 1 对数组进行排序后，通过遍历比较，是否有重复的值
function isRepeated1(arr) {
    arr.sort();
    for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] === arr[i + 1]) {
            return true;
        }
    }
    return false;
}
// ### 2 遍历数组，把数组单个值作为对象属性存储，然后判断，该对象中是否包含该属性
function isRepeat2(arr) {
    var hash = {};
    for (var i in arr) {
        if (hash[arr[i]]){
            return true; 
        }
        hash[arr[i]] = true;
    }
    return false;
}

// ### 3 判断某一个值，在数组中首次出现位置和最后一次出现位置是否一致
function arrRepeat1(arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
        //indexOf()和lastIndexOf()请匹配是否包含，即类型和值完全一样
        if (arr.indexOf(arr[i])!==arr.lastIndexOf(arr[i])) {
            return true;
        }
    }
    return false;
}
// ### 4 把数组序列化为字符串，匹配某个值在该字符串中出现的次数。
function  arrRepeat2(arr) {
    var arrStr=JSON.stringify(arr);
    for(var i=0,len=arr.length;i<len;i++){
        if(arrStr.match(new RegExp(arr[i],"g")).length>1){
            return true
        }
    }
    return false;
}