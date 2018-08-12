// (element.currentStyle? element.currentStyle : window.getComputedStyle(element, null)).height
// var playW=parseInt(window.getComputedStyle(play,null).width)
// var playH=parseInt(window.getComputedStyle(play,null).height)
function Boarder(b,o,p,s){
    this.back=$(b).eq(0)
    this.operate=$(o).eq(0)
    this.play=$(p).eq(0)
    this.ctxP=this.play[0].getContext('2d')
    this.ctxO=this.operate[0].getContext('2d')
    this.ctxB=this.back[0].getContext('2d')
    this.playW=parseInt(this.play.css('width'))
    this.playH=parseInt(this.play.css('height'))
    this.back[0].width=this.play[0].width=this.playW
    this.back[0].height=this.play[0].height=this.playH
    //目前，只是纯色
    this.background=this.back.css('backgroundColor')

    this.isStart=false
    this.isFinish=false
    this.isMultiple=false
    
    this.pathAll=[]
    this.pathShift=[]
    this.pathCurrent=[]

    this.points=[]
    this.pointCurrent=[]

    this.widgetCurrent=''
    this.widgets={}
    this.widgetType=['line','rect','circle','pen','eraserCircle','eraserLine','ellipse']
    this.widgetSetting={
        style:{
            lineWidth:1,
            strokeStyle:'#000',
            fillStyle:'#000',
            setLineDash:[]
        },
        mode:{
            isStroke:true,
            isFill:false
        }
    }
}
Boarder.prototype={
    init:function(){
        var _this=this

        $.each(_this.widgetType,function(k,v){
            var empty={}
            _this.widgets[v]=$.extend(true,empty,_this.widgetSetting)
        })
        // this.widgets['line'].mode.isFill=false
        // this.widgets['rect'].mode.isFill=false
        this.widgets['circle'].style.fillStyle='#f33'
        this.widgets['circle'].mode.isFill=true
        this.widgets['pen'].style.lineCap='round'
        this.widgets['pen'].style.lineJoin='round'
        this.widgets['eraserCircle'].width=4
        this.widgets['eraserCircle'].style.fillStyle='#8f9'
        this.widgets['eraserCircle'].mode.isStroke=false
        this.widgets['eraserCircle'].mode.isFill=true
        this.widgets['eraserLine'].style.strokeStyle='#8f9'
        this.widgets['ellipse'].style.setLineDash=[4]


        this.widgetCurrent='pen'
        this.widgetCurrent='line'
        this.widgetCurrent='circle'
        this.play.on('mousedown',function(e){
            console.log(e)
            // if(this.isFinish){
                // this.clear()
            // }
            _this.pointCurrent=[e.offsetX,e.offsetY]
            _this.points=[[_this.pointCurrent]]
            _this.isStart=true
            if(_this.widgetCurrent=='eraserCircle'){
                var widget=_this.widgets['eraserCircle']
                var style={},mode={}
                style=$.extend(style,widget.style)
                mode=$.extend(mode,widget.mode)
                var points=[e.offsetX,e.offsetY,widget.width]
                var path={type:'eraserCircle',style:style,points:points,mode:mode}
                _this.paint('ctxP',path)
            }
        
        })
        this.play.on('mousemove',this.throttle(this.painting,10).bind(_this))
        // this.play.on('mousemove',this.painting.bind(this))
        //20，30 就不行，毛边严重
        this.play.on('mouseup',function(){
            _this.isStart=false
            _this.isFinish=true
            if(_this.widgetCurrent=='eraserLine'){
                _this.pathCurrent.style.fillStyle=_this.background
                _this.pathCurrent.mode.isStroke=false
                _this.pathCurrent.mode.isFill=true
            }
            _this.clear('ctxP')
            _this.paint('ctxB',_this.pathCurrent)
            _this.pathAll.push(_this.pathCurrent)
        })
        
    },
    clear:function(ctx){
        console.log('clear',ctx)
        this[ctx].clearRect(0,0,this.playW,this.playH)
    },
    setCtx:function(ctx,style){
        var _this=this
        $.each(style,function(k,v){
            if(k=='setLineDash'){
                _this[ctx].setLineDash(v)
                return
            }
            _this[ctx][k]=v
        })
    },
    painting:function(e){
        // console.log('painting')
        if(this.isStart){
            this.clear('ctxP')
            var widgetCurrent=this.widgetCurrent
            var widget=this.widgets[widgetCurrent]
            var _this=this
            if(widgetCurrent=='pen'||widgetCurrent=='eraserLine'){
                this.points.push([e.offsetX,e.offsetY])
                // this.pointCurrent=[e.offsetX,e.offsetY]
            }else if(widgetCurrent=='eraserCircle'){//红色的光点，就不做了
                this.points=[e.offsetX,e.offsetY,widget.width]
            }else{
                this.points=[this.pointCurrent,[e.offsetX,e.offsetY]]
            }
            var style={},mode={}
            style=$.extend(style,widget.style)
            mode=$.extend(mode,widget.mode)
            this.pathCurrent={type:widgetCurrent,style:style,points:_this.points,mode:mode,uid:''}
            this.paint('ctxP',this.pathCurrent)
            
            if(widgetCurrent=='eraserCircle'){
                this.pathCurrent.style.fillStyle=this.background
                this.paint('ctxB',this.pathCurrent)
                this.pathAll.push(this.pathCurrent)
            }
        }
    },
    paint:function(ctx,path){
        console.log('paint',ctx,path)
        if(!path){return}
        this.setCtx(ctx,path.style)
        var fn='paint'+(path.type).replace(/(\w)/,function(v){return v.toUpperCase()})
        this[ctx].beginPath()
        this[fn](ctx,path.points)
        if(path.mode.isClose){
            // this[ctx].closePath()
        }
        if(path.mode.isStroke){
            this[ctx].stroke()
        } 
        if(path.mode.isFill){
            this[ctx].fill()
        }
        
    },
    paintLine:function(ctx,points){//直线
        console.log('paint line')
        this[ctx].moveTo(points[0][0],points[0][1])
        this[ctx].lineTo(points[1][0],points[1][1])
        
    },
    paintPen:function(ctx,points){
        var _this=this
        this[ctx].moveTo(points[0][0],points[0][1])
        var pointsOther=points.slice(1)
        $.each(pointsOther,function(k,v){
            _this[ctx].lineTo(v[0],v[1])
        })
    },
    paintRect:function(ctx,points){
        var w=parseInt(points[1][0]-points[0][0])
        var h=parseInt(points[1][1]-points[0][1])
        this[ctx].rect(points[0][0],points[0][1],w,h)

    },
    paintCircle:function(ctx,points){
        // this[ctx].beginPath()
        console.log('paint circle',points)
        //以圆心（鼠标点下的位置）为定点
        var w=parseInt(points[1][0]-points[0][0])
        var h=parseInt(points[1][1]-points[0][1])
        var r=Math.abs(Math.max(w,h))
        this[ctx].arc(points[0][0],points[0][1],r,0,2*Math.PI)
        
        //左上角定点，长值为半径
        /* var r=Math.max(w,h)/2
        var x=points[0][0]+r
        var y=points[0][1]+r
        this[ctx].arc(x,y,Math.abs(r),0,2*Math.PI) */
        
    },
    paintEraserCircle:function(ctx,points){
        // console.log('paint eraser circle',ctx,points)
        this[ctx].arc(points[0],points[1],points[2],0,2*Math.PI)
        // this[ctx].clearRect(points[0],points[1],points[2],points[2])
    },
    paintEraserLine:function(ctx,points){
        this.paintPen(ctx,points)
    },
    paintEllipse:function(ctx,points){
        var w=Math.abs(parseInt(points[1][0]-points[0][0]))
        var h=Math.abs(parseInt(points[1][1]-points[0][1]))
        // var x=parseInt(points[1][0]+points[0][0])/2
        // var y=parseInt(points[1][1]+points[0][1])/2
        // var r=parseInt(Math.sqrt(Math.pow(x,2)+Math.pow(y,2))/2)
        // this[ctx].ellipse(points[0][0],points[0][1],w,h,0,0,2*Math.PI)

        //左上角 为定点
        var w=parseInt((points[1][0]-points[0][0])/2)
        var h=parseInt((points[1][1]-points[0][1])/2)
        var x=points[0][0]+w
        var y=points[0][1]+h
        this[ctx].ellipse(x,y,Math.abs(w),Math.abs(h),0,0,2*Math.PI)
    },
    paintRectangleRound:function(){},
    paintArrow:function(){},
    paintHeart:function(){

    },
    getImgData:function(x,y,w,h){
        var x=x||0
        var y=y||0
        var w=w||this.backW 
        var h=h||this.backH 
        var w=this.playW 
        var h=this.playH 
        console.log(this.ctxB.getImageData(x,y,w,h))
        return this.ctxB.getImageData(x,y,w,h)
    },
    putImgData:function(ctx,imgData){
        // ctx=ctx||'ctxB'
        this.ctxB.putImageData(imgData,0,0)
    },
    toDataURL:function(type,quality){
        if(type=='jpeg'){
            return this.back[0].toDataURL('image/jpeg', .5)
        }
        console.log(this.back[0].toDataURL('image/png'))
        return this.back[0].toDataURL('image/png')

    },
    toBlob:function(type,quality){
        var _this=this
        this.back[0].toBlob(function(blob){
            console.log(blob)
            /* var newImg = document.createElement("img"),
            url = URL.createObjectURL(blob);
      
            newImg.onload = function() {
            // no longer need to read the blob so it's revoked
                URL.revokeObjectURL(url);
            };
        
            newImg.src = url;
            document.body.appendChild(newImg); */
            _this.blob=blob
        })
        // console.log('this.blob ',_this.blob)
        // return this.blob
    },
    download:function(){
        this.back[0].toBlob(function(blob){
            console.log(blob)
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = '1.png';
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 100);
        })
    },
    throttle:function(fn, wait) {
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
