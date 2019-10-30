/*function tap(){
	
	
	
}*/

/*对象*/
var zhanxin={
	
	tap:function(dom,callback){
		
			/*var div=document.querySelector("div");*/
			/*
			 * 单击事件的特点
			 * 
			 * 
			 * 1、只有一个手指
			 * 2、手指开始触摸和松开的时间不能太长  150-300
			 * 3、保证没有滑动操作
			 */
			if(!dom|| typeof dom!=='object'){
				return;
			}
			var startX,startY,startTime;
			/*1、只有一个手指*/
			dom.addEventListener("touchstart",function(e){
				if(e.targetTouches.length>1){
					//不只一个手指
					return;
				}
				
				startX=e.targetTouches[0].clientX;
				startY=e.targetTouches[0].clientY;
				startTime=Date.now();
				//console.info(startTime);
			});
			
			
			dom.addEventListener("touchend",function(e){
				if(e.changedTouches.length>1){
					//不只一个手指
					return;
				}
				//判断时间的差异
				if(Date.now()-startTime>150){
					
					return;
				}
				
				//保证没有滑动操作 （6，6）
				
				var endX=e.changedTouches[0].clientX;
				var endY=e.changedTouches[0].clientY;
				
				if(Math.abs(endX-startX)<6&&Math.abs(endY-startY)<6){
					console.info("移动端的单击事件，tap事件");
					//回调函数
					/*callback();*/
					
					callback&&callback(e);
				}
			});
		
	}
	
}
