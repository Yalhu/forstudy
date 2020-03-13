/** 
 * @author: COF:coa
 * @date: 20190529
 * @description: ���ܷ���element ui�ķ�ҳ����Ĭ����ʽΪ�񵥷�ҳ��ʽ��
 *    ��װ����cc jQuery3.4 ��UMD���û��ES6 ��ģ�鵼�� export��������������/����ȷ.
 *    ��Ϊ��Ŀԭ�򣬱��ļ�����Ϊ gbk
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
 * @param {string} param0.hideOnSinglePage - ֻ��һҳʱ�Ƿ�����. $_NEXT
 * @param {string} param0.pagerCount - ��ʾҳ�밴ť������������ҳ��������ֵʱ���۵������ڵ��� 5 ��С�ڵ��� 21 ������  $PS: ��֪��ΪɶС��21
 * @param {Array} param0.layout - Ҫչʾ�����ݡ�limits, prev, pager, next, jumper,  total,count 
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
            console.log('ȷ�����')
            var curr=this.dom.querySelector('.co-pagination-jumper>input').value-0
            if(!Number.isInteger(curr)) return alert('ҳ�������1~'+this.count+'������')
            // if(curr%1!==0) return alert('ҳ�������1~'+this.count+'������')
            this.changeCurr(curr)
        })
        this.dom.querySelector('.co-pagination-prev').addEventListener('click',()=>{
            if(this.curr==1) return 
            console.log('ǰһҳ')
            var curr=this.curr-1
            this.changeCurr(curr)
        })
        this.dom.querySelector('.co-pagination-next').addEventListener('click',()=>{
            if(this.curr==this.count) return 
            console.log('��һҳ')
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


        // ���� �Զ���� �¼���currChange��limitChange
        // $_NOTE: ��������󶨵��¼�������ajax������ע�� ����(curr,limit)�Ƿ���Ҫ��ֵ;���е�limit�ı��ʱ����Ҫ���³�ʼ��
        /* // Ĭ�� Ԥ�� ��ϵ� �ӿں���
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
        var _countHtml='<span class="co-pagination-count">��'+this.count+'ҳ</span>'
        var _totalHtml='<span class="co-pagination-total">��<output>'+this.total+'</output>��</span>'
        var _jumperHtml='<div class="co-pagination-jumper">����<input type="text" value="'+this.curr+'">ҳ <span>ȷ��</span>'
        var _limitsHtml='<select class="co-pagination-limits"></select>'
        // $_TODO: ��ʽû�ж���
        if(this.layout.includes('limits')){ // 
            _limitsHtml=(()=>{
                var str='<select class="co-pagination-limits">'
                this.limits.forEach(limit=>{
                    str+=`<option ${limit==this.limit?'selected':''} data-value="${limit}">ÿҳ ${limit} ��</option>`  // $PS: ���԰�ÿҳ�ŵ� select���档
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
            // $_PS: ���԰� ...��currһ��������� Ȼ��ѭ������
            str +=`<span class="co-pagination-page ${curr==1?'co-pagination-page-curr':''}">1</span>`

            var gap_start=curr-1
            var gap_end=this.count-curr
            var pager_half=(this.pagerCount-3)/2

            if(gap_start>pager_half+1){
                str +=`<span onmouseover="this.innerHTML='��'" onmouseout="this.innerHTML='������'" class="co-pagination-page-move co-pagination-page-move-prev">������</span>`
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
            
            // note: ��ҳ��βҳ��ʱ�� �ٲ�һ�� ҳ�롣�γ�pagerCount-2 ����Ч����������βҳ��ʱ��   
            for(var i=1,j=1;i<pager_half+1;i++){
                // ǰ�����һ������ҳ��
                if(curr-i>1){
                    pageList.unshift(curr-i)
                }else{ // ������㣬��Ҫ�ں��治������
                    pageList.push(curr+pager_half+j)
                    j++
                }
                // ���������һ������ҳ��
                if(curr+i<this.count){
                    pageList.push(curr+i)
                }else{
                    pageList.unshift(curr-pager_half-j)
                    j++
                }
            }
            
            pageList.sort()  // $PS: ������Բ������򡣲����ʱ��λ�ò��롣����С�������֣�ʡ��ֱ���������� 
            console.log('page list',pageList)
            for(var i=0;i<pageList.length;i++){
                var clsName=curr==pageList[i]?'co-pagination-page-curr':''
                str +=`<span class="co-pagination-page ${clsName}">${pageList[i]}</span>`
            }

            if(gap_end>pager_half+1){
                str +=`<span onmouseover="this.innerHTML='��'" onmouseout="this.innerHTML='������'" class="co-pagination-page-move co-pagination-page-move-next">������</span>`
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
        // ����jumper ����
        this.layout.includes('jumper')&&(this.dom.querySelector('.co-pagination-jumper>input').value=curr)
        // ������Ⱦpager
        this.renderPagerHtml(curr)

        // �� �Զ����¼�  �󶨵�this.dom
        // ����ҳ���л� �󶨵��ⲿ�¼�����������ȣ�
        // this.currChange({page:this.curr})
        var ev = new CustomEvent("currChange", {detail:{curr}});
        this.dom.dispatchEvent(ev);
    },
    changeLimit(limit){  
        // $_NOTE: limit �ı����Ҫ��limitChange �ص��У����³�ʼ��pagination����Ϊ��ҳ�����ˣ����ҵ�ǰҳҳҪ����ȥ������ʼ��
        // console.log('change curr:',limit)
        this.limit=limit

        // �� �Զ����¼�  �󶨵�this.dom
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
            case 'currChange': // �л�ҳ��
                cb(this.curr)
                break;
            case 'limitChange': // ÿҳ�����л�
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
