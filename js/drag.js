(function(w){
    w.$={};
	// callBack将内部组件的move状态暴露了外部的业务逻辑
    w.$.drag = function(testNode,callBack){
		// 确定元素一开始的位置
        var elementPoint = {x:0,y:0};
		// 鼠标一开始的位置
        var startPoint = {x:0,y:0};
		
        testNode.onmousedown = function(ev){
            ev = ev || event;
			// 参照与offsetParent
            elementPoint.x=this.offsetLeft;
            elementPoint.y=this.offsetTop;
			// 参照于视口
            startPoint.x=ev.clientX;
            startPoint.y=ev.clientY;
			
            if(testNode.setCapture){
                testNode.setCapture();
            }
			
            document.onmousemove = function(ev){
                ev = ev || event;
				
				// 参照于视口
                var nowPint =  {x:0,y:0};
                nowPint.x=ev.clientX;
                nowPint.y=ev.clientY;
                var L = elementPoint.x + nowPint.x - startPoint.x;
                var T = elementPoint.y + nowPint.y - startPoint.y;
				
                if(L<0){
                    L = 0;
                }else if(L>testNode.offsetParent.offsetWidth - testNode.clientWidth){
                    L = testNode.offsetParent.offsetWidth - testNode.clientWidth;
                }
				
				// 参照于offsetParent
                testNode.style.left = L+'px';
				
                if(callBack&&callBack['move']&&typeof callBack['move']==='function'){
                    callBack['move'].call(testNode);
                }
}

                document.onmouseup = function(){
                    document.onmousemove = document.onmouseup = null;
					
                    if(document.releaseCapture){
                        document.releaseCapture();
                    }
                }
                return false;
        }
    }
})(window)