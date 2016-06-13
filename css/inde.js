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
		 navRight=document.getElementById("nav-right");
	
	//第一个li里滑动的
    var pre=document.getElementById("pre");
	var next=document.getElementById("next");
	pre.addEventListener("click",prev);
	next.addEventListener("click",nexte);
		
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

/*相对应prev()
l = o.handle = function(e) {
  var t, r = e.type,
    n = l.currentTarget;
  return p.triggeredEvent === r ? void 0 : (t = p.getDomEventObservable(n, r), t ? (e.currentTarget = n, e = new h(e), t.notify(e)) : void 0)*/
  
  /*相对于next()
  l = o.handle = function(e) {
  var t, r = e.type,
    n = l.currentTarget;
  return p.triggeredEvent === r ? void 0 : (t = p.getDomEventObservable(n, r), t ? (e.currentTarget = n, e = new h(e), t.notify(e)) : void 0)
}*/