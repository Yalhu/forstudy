/**
 * ## needed: 都可选，最好定义log_source
 * log_source(cotrack_page_id),
 * log_source_id,log_source_type,
 * log_info 
 */
var cohelper={
    getCookie:function(name){
        var reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)")
        var arr=document.cookie.match(reg)
        return (arr?arr[2]:null)
    } 
}
var CoTrack={  // Community Track
    // _event:['blur', 'change', 'click', 'dblclick', 'error', 'focus', 'keydown', 'keypress', 'keyup', 'load', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'reset', 'resize', 'select', 'submit', 'unload', 'message'],
    _event:['click','focus'],
    info:{ // defautl configuration
        // _origin:'',
        url:'http://api.yalhu.com/community7/faxian/access-log?c=faxian&a=access-log&ignore_tc=1', // url to recieve track data
        MDD_user_client:cohelper.getCookie('MDD_user_client')||'touch',
        MDD_client_version:cohelper.getCookie('MDD_client_version')||'1.0',
        MDD_sid:cohelper.getCookie('MDD_sid')||'', 
        log_source:window.log_source||window.cotrack_page_id||'',  // 页面id/name，比如发现首页，文章页，评论列表页 
        log_source_id:window.log_source_id||'', // 比如文章id(72342,)
        log_source_type:window.log_source_type||'', // 比如artical_id 和上面的id对应
        log_info:window.log_info||'', // 其他信息
    },
    // isDebug:false,
    // isDelay:false,
    // delay:0,
    init:function(info,isRun){
        this.setInfo(info)
        isRun&&this.run()
    }, 
    reset:function(info){
        this.info=Object.assign({},info)
    },
    setInfo:function(info){
        this.info=Object.assign({},this.info,info)
    }, 
    run:function(){ // bind dom evnet,
        var doms=document.querySelectorAll('[data-cotrack]')
        doms.forEach(dom=>{
            var type=dom.getAttribute('data-cotrack') // only can track one type as so far
            var event=dom.getAttribute('data-cotrack-event') // only can bind one type as so far
            // var data=dom.getAttribute('data-cotrack-data') // other data
            event= event||'click'
            dom.addEventListener(event,()=>{
                this.track(type)
            })
        })
    },
    track:function(type,data){ // data：in case does not use the defualt configuration
        /* data=data||{}
        var url=data.url||this.info.url
        var log_source_type=data.log_source_type||this.info.log_source_type
        var log_source_id=data.log_source_id||this.info.log_source_id
        var log_info=data.log_info||this.info.log_info */
        //通过伪装成Image对象，请求后端脚本
        var img = new Image(1, 1)
        var cur_url = window.location.href;
        // var src = 'http://localhost:8091/data/dataCollection/log.gif?args=' + encodeURIComponent(args);
        var src=this.info.url+'&log_name='+type+'&udid='+this.info.MDD_sid+'&user_client='+this.info.MDD_user_client+'&client_version='+this.info.MDD_client_version
        src += '&log_source='+this.info.log_source+'&log_source_type='+this.info.log_source_type+'&log_source_id='+this.info.log_source_id+'&log_info='+this.info.log_info+'&cur_url='+ cur_url;
        img.src = src
    },
}
// CoTrack.init({},true)
CoTrack.run()
CoTrack.track(CoTrack.info.log_source);// PV

// CoTrack.init({url:'http://yalhu.com/cotrack.php'},true)
// CoTrack.init({url:'http://yalhu.com/cotrack.php',log_source_id,log_source_type,log_info},true)

// CoTrack.setInfo({log_source_id,log_source_type})
// CoTrack.run()
// CoTrack.track('fx_detail',{log_source_id,log_source_type})

// $('#video').on('play',function(){CoTrack.track('play')})


// 见[页面埋点]

