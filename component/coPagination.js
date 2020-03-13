/** 
 * @author: COF:coa
 * @date: 20190529
 * @description: 功能仿照element ui的分页器，默认样式为榜单分页样式。
 *    封装采用cc jQuery3.4 的UMD风格；没有ES6 的模块导出 export，加在这里会多余/不正确.
 *    因为项目原因，本文件编码为 gbk
 *    this file chartset='gbk' , cause of project.  
*/
// cc from jquery: <https://code.jquery.com/jquery-3.4.1.js>
;( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "CoPagination requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {


/**
 * @param {string} param0.hideOnSinglePage - 只有一页时是否隐藏. $_NEXT
 * @param {string} param0.pagerCount - 显示页码按钮的数量，当总页数超过该值时会折叠。大于等于 5 且小于等于 21 的奇数  $PS: 不知道为啥小于21
 * @param {Array} param0.layout - 要展示的内容。limits, prev, pager, next, jumper,  total,count 
 */
function CoPagination({ele='.co-pagination',hideOnSinglePage=false,curr=1,count=1,limit=10,limits=[5,10,15,20],pagerCount=7,prevText='<',nextText='>',layout=['prev','pager','next','jumper']}={}){
    this.dom=document.querySelectorAll(ele)[0]
    if(hideOnSinglePage&&count==1){
        return this.dom.style.display='none'
        this.layout=[]
    }
    this.curr=curr
    
    pagerCount%2==0&&(pagerCount+=1)
    pagerCount<7&&(pagerCount=7)

    this.count=count
    this.limit=limit
    this.limits=limits
    this.pagerCount=pagerCount
    this.prevText=prevText
    this.nextText=nextText
    this.layout=layout
    

    this.init()
}
CoPagination.prototype={
    constructor:CoPagination,
    init:function(){
        if(this.hideOnSinglePage&&count==1) return 
        this.renderHtml()

        this.dom.querySelector('.co-pagination-jumper>span').addEventListener('click',()=>{
            console.log('确定点击')
            var curr=this.dom.querySelector('.co-pagination-jumper>input').value-0
            if(!Number.isInteger(curr)) return alert('页码必须是1~'+this.count+'的整数')
            // if(curr%1!==0) return alert('页码必须是1~'+this.count+'的整数')
            this.changeCurr(curr)
        })
        this.dom.querySelector('.co-pagination-prev').addEventListener('click',()=>{
            if(this.curr==1) return 
            console.log('前一页')
            var curr=this.curr-1
            this.changeCurr(curr)
        })
        this.dom.querySelector('.co-pagination-next').addEventListener('click',()=>{
            if(this.curr==this.count) return 
            console.log('下一页')
            var curr=this.curr+1
            this.changeCurr(curr)
        })
        if(this.layout.includes('limits')){
            this.dom.querySelector('.co-pagination-limits').addEventListener('change',(e)=>{
                console.log('limit chagne',e)
                var e=e||event
                var limit=e.target.selectedOptions[0].getAttribute('data-value')-0
                this.changeLimit(limit)
            })
        }
        this.dom.querySelector('.co-pagination-pager').addEventListener('click',(e)=>{
            var target=e.target||event.target
            var cls=target.className
            var curr=0
            if(cls.includes('pagination-page-move')){
                var curr=this.dom.querySelector('.co-pagination-page-curr').innerHTML-0
                if(cls.includes('pagination-page-move-prev')){
                    curr-=(this.pagerCount-2)
                }else{
                    curr+=(this.pagerCount-2)
                }
            }else{
                curr=target.innerHTML-0
            }
            curr>this.count&&(curr=this.count)
            curr<1&&(curr=1)
            this.changeCurr(curr)
        })


        // 测试 自定义绑定 事件。currChange，limitChange
        // $_NOTE: 外面监听绑定的事件（调用ajax方法）注意 参数(curr,limit)是否需要赋值;还有当limit改变的时候，需要重新初始化
        /* // 默认 预绑定 耦合的 接口函数
        var _events=['currChange','limitChange','prevChange','nextChange']
        _events.map(ev=>{
            this[ev]=function(param){}
        }) */

        this.dom.addEventListener('currChange',(ev)=>{
            // console.log('test currChange',ev)
        })
        this.dom.addEventListener('limitChange',(ev)=>{
            // console.log('test limitChange',ev)
        })
    },
    renderHtml(){
        var that=this
        var _prevHtml='<span class="co-pagination-prev">'+this.prevText+'</span>'
        var _pagerHtml='<div class="co-pagination-pager"></div>'
        var _nextHtml='<span class="co-pagination-next">'+this.nextText+'</span>'
        var _countHtml='<span class="co-pagination-count">共'+this.count+'页</span>'
        var _totalHtml='<span class="co-pagination-total">共<output>'+this.total+'</output>条</span>'
        var _jumperHtml='<div class="co-pagination-jumper">到第<input type="text" value="'+this.curr+'">页 <span>确定</span>'
        var _limitsHtml='<select class="co-pagination-limits"></select>'
        // $_TODO: 样式没有定义
        if(this.layout.includes('limits')){ // 
            _limitsHtml=(()=>{
                var str='<select class="co-pagination-limits">'
                this.limits.forEach(limit=>{
                    str+=`<option ${limit==this.limit?'selected':''} data-value="${limit}">每页 ${limit} 条</option>`  // $PS: 可以把每页放到 select外面。
                })
                str +='</select>'
                return str
            })();
        }
        var str=''
        for(var i=0;i<this.layout.length;i++){
            str+=eval('_'+this.layout[i]+'Html')
        }
        this.dom.innerHTML=str
        this.renderPagerHtml(this.curr)
        
    },
    renderPagerHtml(curr){
        var str=''
        if(this.count>this.pagerCount){
            // $_PS: 可以把 ...和curr一起放入数组 然后循环处理
            str +=`<span class="co-pagination-page ${curr==1?'co-pagination-page-curr':''}">1</span>`

            var gap_start=curr-1
            var gap_end=this.count-curr
            var pager_half=(this.pagerCount-3)/2

            if(gap_start>pager_half+1){
                str +=`<span onmouseover="this.innerHTML='《'" onmouseout="this.innerHTML='···'" class="co-pagination-page-move co-pagination-page-move-prev">···</span>`
            }
            
            var pageList=[]
            if(curr!=1&&curr!=this.count){
                pageList.push(curr)
            }
            if(curr==1){
                pageList.push(1+(this.pagerCount-2))
            }
            if(curr==this.count){
                pageList.unshift(this.count-(this.pagerCount-2))
            }
            
            // note: 首页和尾页的时候， 少补一个 页码。形成pagerCount-2 连排效果，包括首尾页的时候   
            for(var i=1,j=1;i<pager_half+1;i++){
                // 前面添加一半数量页码
                if(curr-i>1){
                    pageList.unshift(curr-i)
                }else{ // 如果不足，需要在后面不足数量
                    pageList.push(curr+pager_half+j)
                    j++
                }
                // 往后面添加一半数量页码
                if(curr+i<this.count){
                    pageList.push(curr+i)
                }else{
                    pageList.unshift(curr-pager_half-j)
                    j++
                }
            }
            
            pageList.sort()  // $PS: 这里可以不用排序。插入的时候按位置插入。长度小都是数字，省事直接用了排序 
            console.log('page list',pageList)
            for(var i=0;i<pageList.length;i++){
                var clsName=curr==pageList[i]?'co-pagination-page-curr':''
                str +=`<span class="co-pagination-page ${clsName}">${pageList[i]}</span>`
            }

            if(gap_end>pager_half+1){
                str +=`<span onmouseover="this.innerHTML='》'" onmouseout="this.innerHTML='···'" class="co-pagination-page-move co-pagination-page-move-next">···</span>`
            }
            str +=`<span class="co-pagination-page ${curr==this.count?'co-pagination-page-curr':''}">${this.count}</span>`
        }else{
            new Array(this.count).fill('').map((v,i)=>{
                str +=`<span class="co-pagination-page ${curr==(i+1)?'co-pagination-page-curr':''}">${i+1}</span>`
            })
        }

        this.dom.querySelector('.co-pagination-pager').innerHTML=str

    },
    changeCurr(curr){
        // console.log('change curr:',curr)
        this.curr=curr
        // 更新jumper 数据
        this.layout.includes('jumper')&&(this.dom.querySelector('.co-pagination-jumper>input').value=curr)
        // 重新渲染pager
        this.renderPagerHtml(curr)

        // 把 自定义事件  绑定到this.dom
        // 调用页数切换 绑定的外部事件（数据请求等）
        // this.currChange({page:this.curr})
        var ev = new CustomEvent("currChange", {detail:{curr}});
        this.dom.dispatchEvent(ev);
    },
    changeLimit(limit){  
        // $_NOTE: limit 改变后，需要在limitChange 回调中，重新初始化pagination，因为总页数变了；而且当前页页要传出去，供初始化
        // console.log('change curr:',limit)
        this.limit=limit

        // 把 自定义事件  绑定到this.dom
        var ev = new CustomEvent("limitChange", {detail:{curr:this.curr,limit}});
        this.dom.dispatchEvent(ev);
    },
    changePrev(){
        if(this.curr==1) return 
        this.changeCurr(--this.curr)
    },
    bindEvent:function(pevent,cb){
        this[pevent]=cb
        /* switch(pevent){
            case 'currChange': // 切换页码
                cb(this.curr)
                break;
            case 'limitChange': // 每页数量切换
                cb(this.limit)
                break;
            case 'prevChange':
                cb()
                break;
            case 'nextChange':
                cb();
        } */
    },
}



if ( typeof define === "function" && define.amd ) {
	define( "coPagination", [], function() {
		return CoPagination;
	});
}


// Expose CoPagination even in AMD  and CommonJS for browser emulators 
if ( !noGlobal ) {
	window.CoPagination = CoPagination;
}


return CoPagination;
});



/* ES6 
class CoPagination{
    constructor({dom=''}={}){
        this.dom=dom
    }
    _pagerHtml=''
    init(){}
} 
*/
