// myGirlFriend.js
(function (root, pluginName, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD:
    define(factory()); // define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node:
    module.exports = factory();
    // Use module export as simulated ES6 default export:(将模块导出用作模拟ES6默认导出)
    module.exports.default = module.exports;
  } else {
    // Browser:
    if (root === undefined) {
      root = typeof global !== "undefined" ? global : window
    }
    root[pluginName] = factory();
  }
}(this, 'myGirlFriend', function () {
  'use strict';

  var myGirlFriend = {};

  // 属性
  myGirlFriend.name = "XXXX";
  myGirlFriend.age = 18;
  myGirlFriend.boyFriend = "yanmo";
  myGirlFriend.like = ['正经书', '跳舞', '音乐'];
  myGirlFriend.character = ['贤德', '善良', '可爱', '爱人', '体贴', '忠诚'];
  myGirlFriend.looks = "沉鱼落雁，闭月羞花";
  myGirlFriend.other = ['不浪荡', '不固执', '不滥交', '不罗曼蒂克', '不信教', '不偏执'];

  myGirlFriend.sayLoveMe = function () {
    alert("哦，亲爱的" + this.boyFriend + ",我爱你");
  }

  return myGirlFriend
}));

// 使用
// <script src="myGirlFriend.js"></script>
// <script>
//   // 此处是代码...
//   console.log(window.myGirlFriend);
//   window.myGirlFriend.sayLoveMe()
// </script>



var girlFriend = (function(money){
   return {
       fuckingTimes: money > 5000 ? parseInt(money/5000) : 0;
   }    
})(money);
