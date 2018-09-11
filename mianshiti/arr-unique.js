// # mianshiti-laoshi-201604
var arr=["air","b","clock","air","clock","air"];
//方法一: 使用遍历
function unique1(arr){
    for(var i=0,unique=[];
        i<arr.length;
        i++){
    unique.indexOf(arr[i])==-1&&
                    unique.push(arr[i]);
    }
    return unique;
}
//方法二: 使用hash
function unique2(arr){
    for(var i=0,hash={};i<arr.length;i++){
    hash[arr[i]]===undefined?
        (hash[arr[i]]=1):hash[arr[i]]++;
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