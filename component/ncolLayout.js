/**
 * ## needed
 * versionCompare(),isApp(),
 */
var version_res = versionCompare(client_version); // for layout jump_url

function NColLayout(selector,obj){
    obj=Object.assign({},obj)
    this.dom=document.querySelector(selector)

    this.winWidth=document.body.clientWidth
    this.col=obj.col||2 
    this.gap=obj.gap||6
    this.colWidth=parseFloat(((this.winWidth-6*2-this.gap*(this.col-1))/this.col).toFixed(5)) 

    this.colData=[] // for changeCol
    this.colHeight=[]
    this.init()
}
NColLayout.prototype={
    init:function(){ // init/reset/clear data/html
        var str=''
        for(var i=0;i<this.col;i++){
            this.colData[i]=[]
            this.colHeight[i]=0
            // str+='<ul class="ncoll-col" id="'+'ncoll_col'+ (i+1) +'"></ul>'
            str+='<div class="ncoll-col"><ul id="'+'ncoll_col'+ (i+1) +'"></ul></div>'  // flex+padding v1.2: fixed flex ul height equal everytime
            // str+='<ul style="width:'+this.colWidth+'px" class="ncoll-col" id="'+'ncoll_col'+ (i+1) +'"></ul>' // float+width+margin
        }
        this.dom.innerHTML=str
    },
    setData(data){
        this.init()
        this.addData(data)
    },
    addData:function(data){  
        this.setColHeight()  // re-calc height of every col to justify height
        var addedNum=new Array(this.col)
        addedNum.fill(0)
        data.forEach(item=>{
            var height=0
            if(item.img_info){
                var rate=1;
                if(item.gif_config&&item.gif_config.resolution){
                    var arr=item.gif_config.resolution.split('x')
                    rate=arr[1]/arr[0]
                }else{
                    rate=item.img_info.height/item.img_info.width
                }
                height+=this.colWidth*rate
            }
            // height>250&&(height=250)
            item.imgHeight=height
            item.title && (height+=36) // (24+48)/2
            // item.content && (height+=94) // 94/4
            height+=30 // comment、star // 
            height=parseFloat(height.toFixed(5))

            var minHeight=Math.min.apply(null,this.colHeight)
            var minCol=this.colHeight.findIndex((v)=>v===minHeight)
            // if(mincol==-1) return 

            this.colData[minCol].push(item)
            addedNum[minCol]++
            this.colHeight[minCol]+=height
            this.colHeight[minCol]=parseFloat(this.colHeight[minCol].toFixed(5))
            item.domHeight=height
        })
        this.appendData(addedNum)   
    },
    appendData:function(arr){   
        arr.forEach((v,k)=>{  // layout col after one col
            this.layout(k,this.colData[k].slice(-v))
        })
    },
    layout:function(col,data){
        var frag=document.createDocumentFragment()
        data.forEach((v,k)=>{
            var li=document.createElement('li')
            li.className="ncoll-item "
            li.className+=v.floorType
            var articleId={
                find_image_text:v.articleId,
                find_book_list:v.article_id,
                find_video:v.videoId,
                find_book_comment:v.bookCommentId,
                find_book_excerpt:v.bookExcerptId,
            }
            var contentJumpUrl=commentJumpUrl=v.link_url_h5
            if(isApp()&&version_res){
                contentJumpUrl=v.contentJumpUrl
                commentJumpUrl=v.commentJumpUrl
            }
            var str =''
            if(v.img_info){
                // str +='<div class="ncoll-img" style="height:'+v.imgHeight+'px;background-image:url('+v.img_info.imageUrl+')"'
                str +='<a onclick="CoTrack.track(\'feed\')" href="'+contentJumpUrl+'" class="ncoll-img" style="height:'+v.imgHeight+'px;background-image:url('+v.img_info.imageUrl+');'
                if(v.gif_config&&v.gif_config.constructor==Object&&v.gif_config.gif_url){ // sttouch will post an empty array; and sometimes there is no gifurl
                    str +='background-position-y:center;"'
                    str += ' data-src="'+v.gif_config.gif_url+'">'
                }else{
                    str += '">'
                }
                v.floorType=='find_video'&&(str += '<img src="images/explore/video.jpg">')
                str += '</a>'
            }
            str += '<div class="ncoll-content">'
            if(v.title){
                str += '<a onclick="CoTrack.track(\'feed\')" href="'+contentJumpUrl+'"><h4>'+v.title+'</h4></a>' // add tag:a for app jump, copy the old one
            }
            /* if(v.content){
                str += '<a onclick="CoTrack.track(\'feed\')" href="'+contentJumpUrl+'"><p>'+v.content+'</p></a>' // add tag:a for app jump, copy the old one
            } */
            str += '<div>'
            /* if(v.categoryName){
                str += '<span>'+(v.categoryName||'')+'</span>'
            } */
            if(v.collectNum){
                str += '<span data-article-id="'+articleId[v.floorType]+'" iscollected="'+v.isCollected+'" onclick="toggleFavorite(this)"><i class="iconfont '+(v.isCollected?'icon-heart-fill':'icon-heart-stroke')+'"></i>'+v.collectNum+'</span>'
            }
            if(v.commentNum){
                // str += '<span><i class="iconfont icon-comment"></i>'+v.commentNum+'</span>'
                str += '<a onclick="CoTrack.track(\'feed-comment\')" href="'+commentJumpUrl+'"><i class="iconfont icon-comment"></i>'+v.commentNum+'</a>'
            }
            str += '</div>'

            str += '</div>'
            li.innerHTML=str
            frag.appendChild(li)
        })
        document.getElementById('ncoll_col'+(col+1)).appendChild(frag)
    },
    setColHeight:function(){
        for(var i=0;i<this.col;i++){
            var dom=document.getElementById('ncoll_col'+(i+1))
            var height=parseFloat(window.getComputedStyle(dom).height)
            this.colHeight[i]=parseFloat(height.toFixed(5))
        }
    },
    /* setCol:function(){
        this.col=Math.floor(this.winWidth/parseFloat(this.col))
    },
    resize:function(){
        this.setCol()
    }, */
}





function debounce(fn, wait) {
    var timer = null;
    return function () {
        var context = this
        var args = arguments
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(function () {
            fn.apply(context, args)
        }, wait)
    }
}
function throttle(fn, wait) {
    var previous = 0
    var timer = null
    return function () {
        var context = this
        var args = arguments
        if (!previous) {
            previous = Date.now()
            fn.apply(context, args)
        } else if (previous + wait >= Date.now()) {
            if (timer) {
                // console.log(timer)
                clearTimeout(timer)
                timer = null
            }
            // console.log(timer)
            timer = setTimeout(function () {
                // console.log(timer)
                previous = Date.now()
                fn.apply(context, args)
            }, wait)
        } else {
            previous = Date.now()
            fn.apply(context, args)
        }
    }
}


/** copy from find */
function isApp() {
    return /DANGDANG/.test(window.navigator.userAgent.toUpperCase());
}
function versionCompare(version){
    var version_num = version.split('.');     //8.11.0
    if (version_num[0] > 8) return true;
    if (version_num[0] < 8) return false;
    if (version_num[1] >11) return true;
    if (version_num[1] <11) return false;
    if (version_num[2] <1) return false;
    return true;
}