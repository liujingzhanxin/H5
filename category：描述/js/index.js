window.onload=function(){
	
	/*获取左侧的高度*/
	/*document.querySelector :$*/
	
	var leftHeight=document.querySelector(".ct_cLeft").offsetHeight;//617
//	alert(leftHeight);
	
	//找到滑动的元素  ul
	var ulBox=document.querySelector(".ct_cLeft>ul");
	
	var ulBoxHeight=ulBox.offsetHeight;//1200
//	console.info(ulBoxHeight);
	/*mapTop=0*/
	//范围   ：固定的：  最大范围： mapTop：mapTop+   100px    自己给
	
	//最大范围：leftHeight-ulBox-100
	
	/*设置静止状态下的最大top值*/
    var maxTop=0;/*+*/
    /*设置静止状态下的最小的top值*/
    var minTop=leftHeight-ulBoxHeight; /* -*/
    /*设置滑动状态下的最大的top值*/
    var maxBounceTop=maxTop+100;
    /*设置滑动状态下的最小top值*/
    var minBounceTop=minTop-100;
	
	/*console.info(maxBounceTop);
	console.info(minBounceTop);*/
	var startY=0,moveY=0,distanceY=0,currentY=0;
	
	ulBox.addEventListener("touchstart",function(e){
		
		startY=e.targetTouches[0].clientY;
		
	})
	ulBox.addEventListener("touchmove",function(e){
		moveY=e.targetTouches[0].clientY;
		
		//计算偏移的距离
		
		distanceY=moveY-startY;
		//console.info("touchmove distanceY-->"+distanceY);
		/*ulBox.style.top=distanceY+"px";*/
		if(currentY+distanceY >maxBounceTop||currentY+distanceY <minBounceTop){
			//distanceY>最大范围
			//distanceY<最小范围
			console.info("超出范围");
			return;
		}
		//console.info("--touchmove->"+currentY+distanceY);
	
		ulBox.style.top=(currentY+distanceY)+"px";
	})
	
	ulBox.addEventListener("touchend",function(e){
		//判断当前滑动的距离是否在我们设置的范围内
		//console.info("touchend-->"+(currentY+distanceY));
		/*判断当前滑动的距离是否在静止状态和滑动状态下的最小top值之间*/
        if(currentY+distanceY < minTop){
        	//console.info("touchend  minTop-->"+minTop);
            currentY=minTop;//-583
            /*回到minTop位置*/
            ulBox.style.transition="top 0.5s";
            ulBox.style.top=minTop+"px";
        }
        else if(currentY+distanceY > maxTop){//currentY=0
            currentY=maxTop;
            /*回到maxTop位置*/
            ulBox.style.transition="top 0.5s";
            ulBox.style.top=maxTop+"px";
        }
        else{
            /*记录当前滑动的距离*/
           //在范围内需要累加
            currentY+=distanceY;
           // console.info("--->currentY"+currentY);//-111
        }
		
	})
	var lis=document.querySelectorAll(".ct_cLeft>ul>li");
	console.info(lis.length)
	for (var i=0;i<lis.length;i++) {
			
			lis[i].index=i;
		}
	
	//写点击事件
	
	/*zhanxin.tap(ulBox,function(e){
		
		var li=e.target.parentNode;
		//先移除所有样式
		for (var i=0;i<lis.length;i++) {
			console.info(lis[i]);
			
			lis[i].classList.remove("active");
		}
		li.classList.add("active");
		
	   var liHeight=	li.offsetHeight;
		var index=li.index;
		console.info(index);
	//ulBox.style.transition="top 0.5s"
		if(-index*liHeight<minTop){
			
			ulBox.style.top=minTop;
			 currentY=minTop;
		}else{
			
			
			ulBox.style.top=-index*liHeight+"px";
			currentY=-index*liHeight;
		}
	})*/
	
	
	$(ulBox).on("tap",function(e){
		
		var li=e.target.parentNode;
		//先移除所有样式
		for (var i=0;i<lis.length;i++) {
			console.info(lis[i]);
			
			lis[i].classList.remove("active");
		}
		li.classList.add("active");
		
	   var liHeight=	li.offsetHeight;
		var index=li.index;
		console.info(index);
	//ulBox.style.transition="top 0.5s"
		if(-index*liHeight<minTop){
			
			ulBox.style.top=minTop;
			 currentY=minTop;
		}else{
			
			
			ulBox.style.top=-index*liHeight+"px";
			currentY=-index*liHeight;
		}
		
	})
	
}


