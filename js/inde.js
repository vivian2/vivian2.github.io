   function getByclass(clsName,parent){
			var oparent=parent?document.getElementById(parent):document,
			 result=[],
			 finds=oparent.getElementsByTagName("*");
			for(i=0,l=finds.length;i<l;i++){
				if(finds[i].className==clsName){
					result.push(finds[i])
				}
				
			}
			 return result;
		}
	
var EventUtil={
	addhandler:function(element,type,handler){
		if(element.addEventListener){
			return element.addEventListener(type,handler);
		}else if(elememt.attachEvent){
			return elememt.attachEvent("on"+type,handler);
		}else{
			return element["on"+type]=handler;
		}
	}
};

window.onload=navHover;
    function navHover (){
		var navLeft=document.getElementById("nav-left"),
		 navRight=document.getElementById("nav-right"),
	     lista=navLeft.getElementsByTagName("li");
	     la=navRight.getElementsByTagName("li");
		 listb=getRightL(la);
		 
		for(i=0,l=lista.length;i<l;i++){
			if(i!=2){
		EventUtil.addhandler(lista[i],"mouseover",mouseStyle)
		EventUtil.addhandler(lista[i],"mouseout",mouseStyle)
			}
		}
		for(i=0,l=listb.length;i<l;i++){
		EventUtil.addhandler(listb[i],"mouseover",mouseStyle)
		EventUtil.addhandler(listb[i],"mouseout",mouseStyle)
		}
	//第一个li里滑动的
    var pre=document.getElementById("pre");
	var next=document.getElementById("next");
	pre.addEventListener("click",prev);
	next.addEventListener("click",nexte);
	//输入框的样式
	var tsearch=document.getElementById('taon-search');
 	    lists=tsearch.getElementsByTagName('li'),
 	    inputC=document.getElementById('inputC'),
 	    taonB=document.getElementById('taonB'),
 	    hotWordlimited=document.getElementById('hotWord-limited'),
 	    hotWordShop=document.getElementById('hotWord-shop');
 	for (var i = 0; i < lists.length; i++) {
 		lists[i].dataId=i;
 		if(i==1){
 			lists[i].onclick=function () {
 				taonsearch(this.dataId)
 			 this.className +=" uniqueC";
 			 inputC.className +=" uniqueC";
 			 taonB.style.background='#C60000';
 			 hotWordlimited.style.top='18px';
 			 hotWordShop.style.top='0';
 			}
 		}else{
 		lists[i].onclick=function(){
 			taonsearch(this.dataId)
 		}
 	    }
    	}
    //正文第一部分的轮播图
 	 lunbo().autoPlay();
 	 lunbo().slidePoint();
 	 lunbo().appeara();
 	 //右边侧边栏发布公告鼠标移动到上面发生的样式变化
 	 asidmouseover();
 	 //左边侧边栏的样式变化
 	 asideL();
	}	

function mouseStyle(event){
	var event=event||window.event,
	id=this.id,
    sHover=getByclass("nav_menu_login",id)[0];
	switch(event.type){
		case "mouseover":
		    sHover.style.display="block";
			break;
		case "mouseout":
		    sHover.style.display="none";
			break;
}

}

function prev(event){
		var lista=document.getElementById("lista");
		lista.style.left="0px";
}
function nexte(event){
		var lista=document.getElementById("lista");
			 lista.style.left="-220px";
}
function getRightL(e){
	var res=[];
	for (i=0,l=e.length;i<l;i++){
	if(e[i].id){
		res.push(e[i]);
	}
	}
	return res;
}
//对宝贝天猫店铺进行切换时背景色的变化，及input框的变化
 function taonsearch(n){
 	var tsearch=document.getElementById('taon-search');
 	    lists=tsearch.getElementsByTagName('li'),
 	    inputC=document.getElementById('inputC'),
        taonB=document.getElementById('taonB'),
        hotWordlimited=document.getElementById('hotWord-limited'),
 	    hotWordShop=document.getElementById('hotWord-shop');
 	 for (var i = 0; i < lists.length; i++) {
 		 lists[i].className='';
      }
 	lists[n].className='hasclicked';
    inputC.className='inputC';
    taonB.style.background="#f50";
    hotWordlimited.style.top='0';
    hotWordShop.style.top='18px';
  }
 
function lunbo(){
//第一个轮播图,自动播放
var data=['./img/1a.jpg','./img/1b.jpg','./img/1c.jpg','./img/1d.jpg',
          './img/1e.png'];
var index=0;
var redpot=document.getElementById('redpot'),
     as=redpot.getElementsByTagName('a'),
     sliding=document.getElementById('sliding'),
     img=sliding.getElementsByTagName('img')[0],
     letre=document.getElementById('letre'),
     preva=document.getElementById('preva'),
     backw=document.getElementById('backw');
//切换前后键
function appeara() {
	 img.onmouseover=function(){
    	letre.style.display='block';
     };
     img.onmouseout=function(){
    	letre.style.display='none';
    };
}
  
function autoPlay(){
	index++;
	if(index==data.length){
		index=0;
	}
	
	nextfor(index);
	changeOption(index);
	setTimeout(autoPlay,5000);
  }
  var t=setTimeout(autoPlay,5000)
//鼠标点击小圆点时的切换
function slidePoint(){
    for (var i in data) {
    	as[i].id=i;
    	as[i].onclick=function(){
    		clearTimeout(t);
    		reseta();
    		changeOption(this.id);
    	}
    }
 
}
//鼠标点击左右切换时的切换
function nextfor(curindex){
   preva.onclick=function(){
   	 if (curindex==0) {
   	 	curindex=data.length;
   	 }
   	curindex --;
   	 changeOption(curindex);
   }
   //小问题一直一直加会出现无图像现象，前后按钮一直闪烁的问题
   backw.onclick=function(){
   	 clearTimeout(t);
   	 if (curindex==data.length-1) {
   	 	 curindex=0;
   	 }
      curindex +=1;
   	 changeOption(curindex);
   }


}
//改变的样式
function changeOption(curindex){
	    img.src=data[curindex];
	    reseta();
	    as[curindex].style.backgroundColor='red';
	    
}
//原来的样式
function reseta(){
	for (var i in data){
	  as[i].style.backgroundColor='#eee';
	}
}
 return{
 	autoPlay:autoPlay,
 	data:data,
 	changeOption:changeOption,
 	slidePoint:slidePoint,
 	appeara:appeara
 }
}
//侧边栏发布公告鼠标移动到上面发生的样式变化
function asidmouseover(){
	var asideNotone=document.getElementById("asideNotone"),
	    lists=asideNotone.getElementsByTagName("li"),
	    asideCont=document.getElementById('asideCont'),
	    uls=asideCont.getElementsByTagName('ul');

	for (var i = 0; i < lists.length; i++) {
		EventUtil.addhandler(lists[i],"mouseover",select)
	}
	function select(){
		for (var i = 0; i < lists.length; i++) {
			lists[i].className='';
			lists[i].data=i;
			uls[i].style.display="none";
		}
		this.className="selected";
		uls[this.data].style.display="block";
	}
}
//左边导航栏的样式变化
function asideL(){
	var taonAsiN=document.getElementById('taon-asiN'),
	    taonAdl=document.getElementById('taon-adL'),
	    ul=taonAdl.getElementsByTagName('ul')[0];
	    taonAside=document.getElementById('taon-aside'),
	    lists=taonAdl.getElementsByTagName('li'),
	    deployItems=getByclass('deploy-item','taon-aside');
	   for (var i = 0; i < lists.length; i++) {
		EventUtil.addhandler(lists[i],"mouseover",show);
	} 
       EventUtil.addhandler(ul,"mouseout",hide);
        EventUtil.addhandler(taonAside,"mouseover",slideUp);
        EventUtil.addhandler(taonAside,"mouseout",slideDown);


	function show(event){
		for (var i = 0; i < lists.length; i++) {
			lists[i].data=i;
			deployItems[i].style.display='none';
		}
		deployItems[this.data].style.display='block';
         taonAside.style.display='block';

	}
	function hide(){
		taonAside.style.display='none';
	}
	function slideUp(){
		this.style.display='block';
	}
	function slideDown(){
		this.style.display='none';
	}
}