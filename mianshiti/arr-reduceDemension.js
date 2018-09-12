/* =========================================================== */
// \# mianshiti-laoshi-201604
// ## 数组降维
var arr=[
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
];
/* ### 1. 遍历二维数组
  for(var r=0,res=[];r<arr.length;r++){
    for(var c=0;c<arr[r].length;c++){
      res.push(arr[r][c]);
    }
  }
*/
/* ### 2. concat
  for(var r=0,res=[];r<arr.length;r++){
    res=res.concat(arr[r]);
  }
*/
/* ### 3. concat+apply
  var res=[].concat.apply([],arr);
*/
console.dir(res);

// ### $_PS: ES6
// arr.flat(Infinity) // chrome 也没有实现



