
/* # 栈  from:  
0数组是计算机科学中最常用的数据结构，上一章我们学习了如何创建和使用它。我们知道，
    可以在数组的任意位置上删除或添加元素。
1然而，有时候我们还需要一种在添加或删除元素时有更多控制的数据结构。
1.1有两种数据结构类似于数组，但在添加和删除元素时更为可控。它们就是栈和队列。
1.2栈是一种遵从后进先出（LIFO）原则的有序集合。新添加的或待删除的元素都保存在栈的
    末尾，称作栈顶，另一端就叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。
*/
// ## 定义
function Stack(){
    var items = [];
    this.push = function(element){
        items.push(element);
    };
    this.pop = function(){
        return items.pop();
    };

    this.peek = function(){
        return items[items.length-1];
    };

    this.isEmpty = function(){
        return items.length == 0;
    };

    this.size = function(){
        return items.length;
    };

    this.clear = function(){
        items = [];
    };

    this.print = function(){
        console.log(items.toString());
    };
}
//一些测试。。。
var stack = new Stack();
console.log(stack.isEmpty());

// ## 2.1 实例，转换成二进制
function divideBy2(decNumber){
    var remStack=new Stack(),
            rem,
            binaryString='';
    while(decNumber>0){
        rem=Math.floor(decNumber%2)
        remStack.push(rem)
        decNumber=Math.floor(decNumber/2)
    }
    while(!remStack.isEmpty()){
        binaryString+=remStack.pop().toString();
    }
    return binaryString;
}
console.log(divideBy2(5))


// ## 2.2 转换成任意进制
function baseConverter(decNumber, base){
    var remStack = new Stack(),
            rem,
            baseString = '',
            digits = '0123456789ABCDEF'; //{6}
    while (decNumber > 0){
        rem = Math.floor(decNumber % base);
        remStack.push(rem);
        decNumber = Math.floor(decNumber / base);
    }

    while (!remStack.isEmpty()){
        baseString += digits[remStack.pop()]; //{7}
    }

    return baseString;
}
console.log(baseConverter(100345, 8)); //输出303771

