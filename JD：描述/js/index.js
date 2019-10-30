$(function(){
	/*1、透明度特效*/
	
	searchEffect();
	/*2、秒杀时间*/
	timeBack();
	/*3、轮播*/
	bannerEffect();
	
	/*1、透明度特效
透明度变化：细节
 背景颜色：
 background: rgba(233,35,34,透明度);
 background: rgba(233,35,34,0);


2、秒杀时间
时间的计算


3、轮播 ：
自动轮播
触碰轮播（手动）*/
})
/*1、透明度特效*/
function  searchEffect(){
	/*透明度和轮播图的高度有关系*/
	var bannerHeight= $(".jd_banner")[0].offsetHeight;
	/*获取当前屏幕滚动时，轮播图滚出屏幕的距离*/
	window.onscroll=function(){
		//console.info(document.body.scrollTop):
		//console.info(document.documentElement.scrollTop);
	   var offsetTop=document.documentElement.scrollTop;
	  /* 计算比例值  获取透明度*/
	   var opacity=0;
	   if(offsetTop<bannerHeight){
	     opacity=offsetTop/bannerHeight;
	     console.info(opacity);
	      //设置样式
		  /* background: rgba(233,35,34,0);*/
		   $(".jd_search").css("backgroundColor","rgba(233,35,34,"+opacity+")");
	   }
	   
	  
	}
}

/*倒计时*/
function timeBack(){
	
	//先做倒计时
	/*精确到秒*//*1小时*/    /*1*60*60  3600*/  /*3700*/
	/*定时器: 毫秒   1s=1000毫秒*/
	      var  tataltime=  5;
	      
	    var timeid=  setInterval(function (){
	      	tataltime--;
	      	if(tataltime<0){
	      		//清除定时器
	      		clearInterval(timeid);
	      		return;
	      	}
			/*h  m  s*/
           var h = Math.floor(tataltime / 3600);
           var m = Math.floor( tataltime % 3600 / 60);
           var s = Math.floor(tataltime % 60);
				/*console.info(h);
				console.info(m);
				console.info(s);*/
	
				/*获取span*/
				/*console.info($(".jd_sk_time>span").length);		
				console.info($(".jd_sk_time>span")) ;*/
				$(".jd_sk_time>span")[0].innerHTML=Math.floor(h/10);
				$(".jd_sk_time>span")[1].innerHTML=Math.floor(h%10);
				$(".jd_sk_time>span")[3].innerHTML=Math.floor(m/10);
				$(".jd_sk_time>span")[4].innerHTML=Math.floor(m%10);
				$(".jd_sk_time>span")[6].innerHTML=Math.floor(s/10);
				$(".jd_sk_time>span")[7].innerHTML=Math.floor(s%10);
	      	
	      	
	      },1000)

}


function bannerEffect(){
	/* 以后的图片：都是服务器给你提供，
 通过js去添加在首尾添加图片*/
   var firstimg=$(".jd_bannerImg>li:first");
   var last=$(".jd_bannerImg>li:last");
   /*复制图片*/
   var firstimgcopy= firstimg.clone(true);  //clone   true：事件也可以复制 
   var lastimgcopy= last.clone(true);
  
$(".jd_bannerImg").append(firstimgcopy);
   $(".jd_bannerImg").prepend(lastimgcopy);
   /* 通过js修改样式*/
   /*图片数量*/
 
  var count=$(".jd_bannerImg>li").length;
  
  //获取banner的宽度
 var bannerWidth =$(".jd_banner")[0].offsetWidth;
/*  console.info(bannerWidth);*/
  /*ul:总长度*/
  $(".jd_bannerImg").css("width",count*bannerWidth+"px");
  /*li:长度*/
 /*for(var i=0;i<count;i++){
 	$(".jd_bannerImg>li")[i].style.width=bannerWidth+"px";
 	
 }*/
	$(".jd_bannerImg>li").each(function(i,obj){
		/*console.info(obj);*/
		$(this).css("width",bannerWidth+"px");
	});
	var index=1;
	/*通过js设置默认偏移*/
    $(".jd_bannerImg").css("left",-index*bannerWidth+"px") ;
    /*当屏幕变化的时候，重新计算宽度*/
    window.onresize=function(){
        /*4.1.获取banner的宽度,覆盖全局的宽度值*/
        bannerWidth=$(".jd_banner")[0].offsetWidth;
        /*4.2 设置图片盒子的宽度*/
        $(".jd_bannerImg")[0].style.width=count*bannerWidth+"px";
        /*4.3设置每一个li(图片)元素的宽度*/
        $(".jd_bannerImg>li").each(function(i,obj){
		/*console.info(obj);*/
			$(this).css("width",bannerWidth+"px");
		});
        /*4.4重新设置定位值*/
       $(".jd_bannerImg").css("left",-index*bannerWidth+"px") ;
    }
    
 /*实现点标记*/
   var setIndicator=function(index){
       var indicators=$(".jd_bannerIndicator>li");
       
       /*先清除其它li元素的active样式*/
       /*for(var i=0;i<indicators.length;i++){
           indicators[i].removeClass("active")
       }*/
      $(indicators).each(function(i,obj){
      	
      	$(this).removeClass("active");
      })
      
     
      
      $(indicators[index-1]) .addClass("active");
   }
   
    setIndicator(index);
   /* 定时器实现自动轮播*/
 
 var  timeid;
 var startTime=function(){
 	
 	
 	   timeid =setInterval(function(){
 	
 	index++;
 	
 	$(".jd_bannerImg")[0].style.transition="left 0.5s ease-in-out";
    $(".jd_bannerImg").css("left",-index*bannerWidth+"px");
    setIndicator(index);
/*  console.info(index);*/
   //轮播到最后一张 index :0-9   count :10
     	setTimeout(function(){
     		if(index==count-1){
     			index=1;
     			setIndicator(index);
     			 /*如果一个元素的某个属性之前添加过过渡效果，那么过渡属性会一直存在，如果不想要，则需要清除过渡效果*/
                    /*关闭过渡效果*/
     			$(".jd_bannerImg")[0].style.transition="none";
     			 /*偏移到指定的位置*/
     			 $(".jd_bannerImg").css("left",-index*bannerWidth+"px") 
     		}
     		
     		
     	},500);
 },2000);
 	
 	
 }
 startTime();
 
	 //手动轮播
	 var startX ,moveX,distanceX;
	 var isEnd=true;
	 /*ul*/
	// ul==》dom对象
	var imgbox= $(".jd_bannerImg")[0];
  
	 imgbox.addEventListener("touchstart",function(e){
	 	//自动轮播停止，将定时器停止
	 	
	 	clearInterval(timeid);
	 	
	 	startX=e.targetTouches[0].clientX;
	 //	console.info(startX);
	 });
	 imgbox.addEventListener("touchmove",function(e){
	 	
	 	if(isEnd==true){
		 		moveX=e.targetTouches[0].clientX;
		 	//console.info("moveX--》"+moveX);
		 	//计算偏差
		 	distanceX=moveX-startX;
		 //	console.info("distanceX--》"+distanceX);
		 	 /*如果一个元素的某个属性之前添加过过渡效果，那么过渡属性会一直存在，如果不想要，则需要清除过渡效果*/
	                    /*关闭过渡效果*/
	     	imgbox.style.transition="none";
		 	 $(imgbox).css("left",-(index*bannerWidth+distanceX)+"px") ;
	 
	 	}
	 });
 
  imgbox.addEventListener("touchend",function(e){
	 	//判断偏移的范围    100px   100px内翻页  100px外翻页   翻页的方向  
	 	  
	 	 isEnd=false;
	 	console.info( "---》"+Math.abs(distanceX))
	 	//100px外翻页 
	 	if(Math.abs(distanceX)>100){
	 		
	 		/*distanceX  正数 +   :从左到右  上一页*/
	 	
	 	/* distanceX  负数:从右到左  下一页*/
	 	    if(distanceX>0){
	 	    	index--;
		 	    	//设置偏移
		 		imgbox.style.transition="left 0.5s ease-in-out";
		 	  $(imgbox).css("left",-(index*bannerWidth)+"px") ;
	 	    }else{
	 	    	index++;
		 	   imgbox.style.transition="left 0.5s ease-in-out";
		 	  $(imgbox).css("left",-(index*bannerWidth)+"px") ;
	 	    }
	 		
	 		console.info(index);
	 		
	 	}else {
	 		//还是当前页
	 		
	 		/*还要保证确实发生了偏移*/
	 		if(Math.abs(distanceX)>0){
	 			//保持当前页
	 			imgbox.style.transition="left 0.5s ease-in-out";
	 	       $(imgbox).css("left",-(index*bannerWidth)+"px");
	 		}
	
	 	}
	 	
	 	//重新初始化
	 	startX =0,
	 	moveX=0,
	 	distanceX=0;
	 	
	
	 });
	 //判断是否到达最后一页
	 	 /*webkitTransitionEnd:可以监听当前元素的过渡效果执行完毕，
	 	  * 当一个元素的过渡效果执行完毕的时候，会触发这个事件*/
	 imgbox.addEventListener("webkitTransitionEnd",function(){
	 		console.info("0000000");
	 		if(index==count-1){
	 			index=1;
	 			
	 			//设置偏移
	 		
	 			imgbox.style.transition="none";
	 	       $(imgbox).css("left",-(index*bannerWidth)+"px");
	 		}else if(index==0){
	 			index=count-2;
	 			//设置偏移
	 		
	 			imgbox.style.transition="none";
	 	       $(imgbox).css("left",-(index*bannerWidth)+"px");
	 		}
	 		console.info(index);
	 		setTimeout(function(){
	            isEnd=true;
	            /*清除之前添加的定时器*/
	            clearInterval(timeid);
	            //重新开启定时器
	            startTime();},1000);
	 	      
	 	})
}
