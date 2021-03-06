/**danmu 2017.11.09：整个弹幕是基于字体大小的，也就是说实例化后，就不可以再修改了 
 * 0.基于字体大小，计算出每行的高度，maxrows；
 * 1.行数是默认的，可以通过setP函数设置，包括全屏字幕；并不是通过设置弹幕区域
 * 2.通过style函数，可以设置字幕的位置，背景等；
 * 如果强行设置字体大小，字幕的行高没有变化，多行之间可能会叠在一起；需要dans数组，并且重新计算，绘制html
 * 3.改变行数后，需要等当前弹幕结束才可以看到效果；
 * 如果样式改变后要马上看到效果，原dans数组还要在，需要重新计算，绘制html
 * 4.重绘好像也简单了：把当前弹幕消息取出来，重新实例化，取出来的消息添加进去；
 * 缺点：重新绘制的时候，之前的消息会一起涌出
 * 5.不是一个p走完，删除；添加字幕，再追加。
 * 如果当前弹幕行数大于设置的弹幕行数，后面中间某一个移除后，后面的行会跳上去
 * 6.争议：背景设在了外面的div，p没有删除，所以没有弹幕，背景也一直再。
 * 原因：span绝对定位，没法自动撑开p的高度；
 * 7.后续：1重绘的实现
 *  2style,方法两个参数，dom和css，这样就可以给任意的dom设置样式了，包括p,span,container
 *  3add,方法，可以给一个msg，一个css，结合style，这样弹幕的样式也可以更改了
 *  4add，方法，能否同时添加多条消息，即参数是按一个对象，还是一个对象数组，或者灵活变动单个msg也是可以得
 *  5设置弹幕的滚动时间，即添加定时器参数
**************************************************/
/* $_20180917:默认移动完已经销毁了，还以为没有做销毁呢 */

function Danmu(dom,rows,css){
    this.dans=[];
    this.wrapper=dom;
    this.rows=rows||4;//传一个小于0的数字就gg了
    this.maxrows=0;
    this.css=$.extend({},this._css,css);
}
Danmu.prototype={
    pheight:0,
    //_rows:4,
    _css:{
        position:'absolute',
        top:0,
        // maxHeight:'100%',//ie8
        // height:'100px',
        width:'100%',
        color:'#000',
        fontSize:'14px',
    },
    ped:function(dom,n){ //
        var arr=[];
        $(dom).children('p:lt('+n+')').each(function(k,val){
            var value=0;
            var last=$(val).children('span').last();
            //if($(val).children('span').length!=0){
            if(last.length!=0){
                var lastw=last.width();
                var lastl=last.css('left');
                value=lastw+parseFloat(lastl);
            }
            arr.push({ped:$(val),value:value});
        });
        arr.sort(function(a,b){
            return a.value-b.value; 
        });
        //console.log(arr);
        return arr[0].ped;
    },
    add:function(msg,color){//单条添加消息
        var _this=this;
        var left=$(this.wrapper).width();
        var s='<span';
        s+=' style="position:absolute;left:'+left+'px;color:'+color+';">';
        s+=msg;
        s+='</span>';
        var dandom=$(s);
        $(this.ped(this.wrapper+' .dancontainer',this.rows)).append(dandom);
        
        var id=0;
        var danwidth=dandom.width();//先加入dom才可以有宽度，或者给一个大的width
        var dan={dom:dandom,width:danwidth,id:id++};//大数溢出就gg了
        this.dans.push(dan);

        this.danmove(dan); 
        
        dandom.hover(function(){
            $(this).stop();
        },function(){
            _this.danmove(dan);  
        }); 
    },
    addArray:function(dans){//待完成，添加一个数组，或者带颜色数组休息。能够提过重绘功能
        var _this=this;
        $.each(dans,function(k,v){
            _this.add(v);
        })
    },
    repaint:function(){//待完成
        $(this.wrapper).html('');
        addArray(this.dans);
    },
    danmove:function(dan){
        var _this=this;
        dan.dom.animate({left:-dan.width},5000,function(){
            var index=_this.dans.indexOf(dan);
            // _this.dans.shift();//不是第一个弹出，而是当前对象弹出，需要id唯一
            _this.dans.splice(index,1);
            var parent=$(this).parent('p');
            $(this).remove();
            if(parent.index()>=_this.rows){//每一次移动完都需要做一次判断
                //如果前面的行弹幕先移除，下面的行会跳上去
                parent.children('span').length==0&&parent.remove();
            }
        }); 
    },
    pause:function(){
        $.each(this.dans,function(i,v){
            v.dom.stop();
        });
    },
    move:function(){
        var _this=this;
        $.each(this.dans,function(i,v){
            _this.danmove(v);
        });
    },
    style:function(css){//可以修改透明度，位置；字体大小不可以再设置了
        $(this.wrapper+' .dancontainer').css(css);
    },
    setP:function(rows){
        if(this.rows>this.maxrows){return false;}
        if(rows<=0||rows>this.maxrows){
            rows=this.maxrows;
        }
        var crows=$(this.wrapper+'>div>p').length;
        if(rows>crows){//如果大于当前/实际行数
            var addrows=rows-crows;
            this.addP(addrows);
        }else{
            $(this.wrapper+'>div>p:gt('+(rows-1)+')').each(function(k,v){
                $(v).children('span').length==0&&$(v).remove();
            });
            //crows=rows;//立即移除
        }
        this.rows=rows;
    },
    addP:function(rows){
        for(var i=0;i<rows;i++){
            $(this.wrapper+' .dancontainer').append('<p style="position:relative;"></p>');
        }
        $(this.wrapper+' .dancontainer>p').css({height:this.pheight+'px',whiteSpace:'nowrap'});
    },
    init:function(){//初始化:根据字体大小，设置行高，确立显示弹幕的行数；
                        //style:改变字体大小的时候，弹幕行数已经确定，不可以修改了，虽然字体可以变大
        this.pheight=parseFloat(this.css.fontSize)+8;
        //this.rows=parseInt(parseFloat(this.css.height)/this.pheight);
        this.maxrows=parseInt(parseFloat($(this.wrapper).css('height'))/this.pheight);

        var dancontainer=$('<div class="dancontainer"></div>');
        $(this.wrapper).html(dancontainer);
        this.addP(this.rows);
        $.extend(this.css,{lineHeight:this.pheight+'px'});
        //$(this.wrapper+' .dancontainer').css(this.css);
        this.style(this.css);
    }
}


/* polyfill ie8 */
if (!Array.prototype.indexOf){
    Array.prototype.indexOf = function(elt /*, from*/){
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0)
                ? Math.ceil(from)
                : Math.floor(from);
        if (from < 0)
            from += len;
        for (; from < len; from++){
            if (from in this &&
                this[from] === elt)
            return from;
        }
        return -1;
    };
}
if(!String.prototype.trim){//$.trim()
    String.prototype.trim=function(){
        return this.replace(/^\s+|\s+$/g,'');
    }
}
