// ## 打乱
var arr=[1,2,3,4,5,6,6];
arr.sort(()=>{return Math.random()>0.5?1:-1})

const shuffle=arr=>{
    let r=arr.map(Math.random)
    return arr.sort((a,b)=>r[a]-r[b])
}
shuffle([1,2,3,,5]) // 


/* =========================================================== */
// \# [034-D js如何在一个数组里随机选出不重复...]
// ## 随机选取数据
var result = [];
var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
// ### 性能优
/**
算法简述：把源数组分成左右两段，左边按顺序递增，保存已选择的随机数；
右侧是剩余可选的数值；每次从右侧选一个，与左侧最后一个位置的数值交换就可以达到目的。

然后考虑把左侧用一个新数组表示，右侧选中的数移入新数组，再将左侧应该交换过来的值移过来……
 */
var count = arr.length;
for (var i = 0; i < 10; i++) {
    var index = ~~(Math.random() * count) + i;
    result[i] = arr[index];
    arr[index] = arr[i];
    count--;
}
console.log(result)
// ### 一般 
var len = arr.length;
while(result.length < 10){
    var idx = parseInt(Math.random()*1000)%len ;
    if(arr[idx]){
        result.push(arr[idx]);
        arr[idx] = undefined;
    }
}
console.log(result)
// ### 性能更差
arr.sort(function(){return 0.5-Math.random();}).slice(0,10);
// ### 用lodash库，或underscore库
/*
var _ = require("underscore");
var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
var newArr = _.shuffle(arr);
console.log(newArr.slice(0,10));
console.log(newArr.slice(0,10).length);

_.shuffle(_.uniq([1,2,3,4]))
*/

/* =========================================================== */
