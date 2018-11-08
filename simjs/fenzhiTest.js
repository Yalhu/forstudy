// # 初始化分支 from:
var MYAPP={};
MYAPP.event={
    addListerner:null,
    removerListener:null,
}
if(typeof window.addEventListener==='undefined'){
    MYAPP.event.addListerner=function(){

    };
    MYAPP.event.removerListener=function(){

    }
}else{

}

/**一旦执行，再次调用不用再探测浏览器特性了
 * 检查浏览器特性，尽量对一个特性做过多的假设
 * 应该单独检测每个可能会用到的浏览器特性
 */

    /*前面那个必然分支检测，
* 下面代码第一次调用检查，后面不需要
* **/
var MYAPP={};
MYAPP.event={
    addListerner:function(el,type,fn){
        if(typeof el.addEventListener==='function'){
            MYAPP.event.addListerner=function(el,type,fn){

            }
        }else{}
    },
}

