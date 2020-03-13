// 运算级优先
var a=2>1&&5  // a=5 

// 没啥意思
(num=>{num||4})() // undefined
(num=>num||4)() // 4
(num=>{return num||4})() // 4