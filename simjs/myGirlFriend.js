// myGirlFriend.js
(function (root, pluginName, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD:
    define(factory()); // define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node:
    module.exports = factory();
    // Use module export as simulated ES6 default export:(��ģ�鵼������ģ��ES6Ĭ�ϵ���)
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

  // ����
  myGirlFriend.name = "XXXX";
  myGirlFriend.age = 18;
  myGirlFriend.boyFriend = "yanmo";
  myGirlFriend.like = ['������', '����', '����'];
  myGirlFriend.character = ['�͵�', '����', '�ɰ�', '����', '����', '�ҳ�'];
  myGirlFriend.looks = "�������㣬�����߻�";
  myGirlFriend.other = ['���˵�', '����ִ', '���Ľ�', '�������ٿ�', '���Ž�', '��ƫִ'];

  myGirlFriend.sayLoveMe = function () {
    alert("Ŷ���װ���" + this.boyFriend + ",�Ұ���");
  }

  return myGirlFriend
}));

// ʹ��
// <script src="myGirlFriend.js"></script>
// <script>
//   // �˴��Ǵ���...
//   console.log(window.myGirlFriend);
//   window.myGirlFriend.sayLoveMe()
// </script>



var girlFriend = (function(money){
   return {
       fuckingTimes: money > 5000 ? parseInt(money/5000) : 0;
   }    
})(money);
