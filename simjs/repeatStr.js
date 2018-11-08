console.log('debugging ...')
// ## 2 递归
function repeatStr(str,n){
    if(n<2){
        return str;
    }
    return str+=repeatStr(str,--n)
}
// ## 1 循环
/* function repeatStr(str,n){
    if(n<=1) return str;
    var s=str;
    while(--n){
        s+=str;
    }
    return s;
} */
// console.log(repeatStr('s',0))
// console.log(repeatStr('s',2))
console.log(repeatStr('s',4))



// ## polyfill
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
if (!String.prototype.repeat) {
    String.prototype.repeat = function(count) {
      'use strict';
      if (this == null) {
        throw new TypeError('can\'t convert ' + this + ' to object');
      }
      var str = '' + this;
      count = +count;
      if (count != count) {
        count = 0;
      }
      if (count < 0) {
        throw new RangeError('repeat count must be non-negative');
      }
      if (count == Infinity) {
        throw new RangeError('repeat count must be less than infinity');
      }
      count = Math.floor(count);
      if (str.length == 0 || count == 0) {
        return '';
      }
      // 确保 count 是一个 31 位的整数。这样我们就可以使用如下优化的算法。
      // 当前（2014年8月），绝大多数浏览器都不能支持 1 << 28 长的字符串，所以：
      if (str.length * count >= 1 << 28) {
        throw new RangeError('repeat count must not overflow maximum string size');
      }
      var rpt = '';
      for (;;) {
        if ((count & 1) == 1) {
          rpt += str;
        }
        count >>>= 1;
        if (count == 0) {
          break;
        }
        str += str;
      }
      return rpt;
    }
}