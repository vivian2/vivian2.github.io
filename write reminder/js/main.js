//通用函数的设置
var g=function(id){
	return document.getElementById(id);
}
var g_class=function(className){
	return document.getElementsByClassName(className);
}
var g_tpl=function(id){
	return g("tpl_"+id).innerHTML;
}
var getElementTop=function (ele){
	var actualTop=ele.offsetTop;
	var current=ele.offsetParent;
	while(current!==null){
		actualTop +=current.offsetTop;
		current = current.offsetParent;
	}
	return actualTop;
}
var getCharCode = function(event){
	if(typeof event.charCode == "number"){
		return event.charCode;
	}else{
		return event.keyCode;
	}
}
//从数据中获取settime年月日
var list={};
 for (i=0;i<data.length;i++){
		 var item=data[i];
		 var date=new Date(item.settime);
		 var y=date.getFullYear();
		 var m=date.getMonth()+1;
		 var d=date.getDate();	 
	    if(!list[y]){list[y]={}};
        if(!list[y][m]){list[y][m]=[]};
		item.year=y;
		item.month=m;
		item.date=d;     
		list[y][m].push(item)
}	
//时序菜单的生成
var years=[];
for( var a in list){	
	var html_year=g_tpl("scrubber_year").replace(/\{year\}/g,a);
    var months=[];
	for(var b in list[a]){
	 var html_month=g_tpl("scrubber_month").replace(/\{year\}/g,a).replace(/\{month\}/g,b);
      months.unshift(html_month);	 
	}
	var tpl_year=html_year.replace(/\{list\}/g,months.join(''));
	years.unshift(tpl_year);
}
g("scrubber").innerHTML=years.join('');
//跟随列表的生成
var html_content_years=[];
for( a in list){	
	var html_content_year=g_tpl("content_year").replace(/\{year\}/g,a);
    var html_content_months=[];
	for( b in list[a]){
	 var html_content_month=g_tpl("content_month").replace(/\{year\}/g,a).replace(/\{month\}/g,b);
	 var html_content_list=[];
	 for (h in list[a][b]){
	 var it=list[a][b];
	var html_content_item=g_tpl("content_item").replace(/\{goal\}/g,it[h].goal)
	                                           .replace(/\{date\}/g,it[h].aimtime)
    	for( var c=0;c<=it[h].step.length;c++){
	     var html_content_item = html_content_item.replace("{step}"+c,it[h].step[c]);
        }
		 
	var tpl_content_month=html_content_month.replace(/\{list\}/g,html_content_item);
	 }
    html_content_months.unshift(tpl_content_month);
	 }
	var tpl_content_year=html_content_year.replace(/\{list\}/g,html_content_months.join(''));
	html_content_years.unshift(tpl_content_year);
}
g("content").innerHTML=html_content_years.join('');
//跳转
var get_top=function(el){
	return el.offsetTop;
}
var scroll_to=function(to){
	window.scroll(0,to)
}
show_year=function(year){
	var turnyear=g("content_"+year);
	var top=get_top(turnyear);
	scroll_to(top);
	expand_year(year);
}
show_month=function(year,month){
	console.log(year,month)
	var turnmonth=g("content_"+year+'_'+month);
	var top=get_top(turnmonth);
	scroll_to(top);
	highlight_month(year,month);
}
//展开年份里的月份
expand_year=function(year){
	 var yearclass=g_class("scrubber_in_"+year);
	 var monthclass=g_class("scrubber_month");
	  for(var i=0;i<monthclass.length;i++){
		 monthclass[i].style.display="none";
	  }
	  for(var i=0;i<yearclass.length;i++){
		 yearclass[i].style.display="block";
	  }
	
}
highlight_month=function(year,month){
	var currentyear=g("scrubber_"+year+"_"+month);
	 var monthclass=g_class("scrubber_month");
	  for(var i=0;i<monthclass.length;i++){
		 monthclass[i].className=monthclass[i].className.replace(/current/,'');
	  }
	currentyear.className=currentyear.className+' current';
}

//随着内容展开
show_width_year=function(top){
	var contentyear=g('content').getElementsByClassName('content_year');
	var tops=[];
	for (var i=0;i<contentyear.length;i++){
		tops.push(getElementTop(contentyear[i]));
	}
	for(var j=1;j<tops.length;j++){
		if(top < tops[j] && top>tops[j-1]){
			var year=contentyear[j-1].innerHTML;
			expand_year(year);
		}
	}
	
}
 show_width_month=function(top){
	var contentmonth=g('content').getElementsByClassName('content_month');
	var tops=[];
	for (var i=0;i<contentmonth.length;i++){
		tops.push(getElementTop(contentmonth[i]));
	}
	for(var j=1;j<tops.length;j++){
		if(top < tops[j] && top>tops[j-1]){
			var monthid=contentmonth[j-1].id;
			var year=monthid.substr(8,4);
			var month=monthid.substr(13);
			highlight_month(year,month);
		}
	}
}
//固定sxrubber条
window.onscroll=function(){
	var scrtop=g("scrubber");
	var top=document.body.scrollTop||document.documentElement.scrollTop;
	var width=document.body.clientWidth||document.documentElement.clientWidth;
	if(top>264){
		scrtop.style.position="fixed";
		scrtop.style.top="60px";
		scrtop.style.left=(width/2-360)+"px";
	}
	else{
		scrtop.style.position="";
		scrtop.style.top="";
		scrtop.style.left="";
	}
	show_width_year(top);
	show_width_month(top);
}
//给设定的年月日设定合适的格式
  function tabForward(event){
	event=event||window.event;
	var target=event.target||event.srcElement;
	if(target.value.length == target.maxLength){
		var form=document.getElementsByTagName("form")[0];
		for(var i=0,len=form.elements.length;i<len;i++){
			  if(form.elements[i] == target){
				  if(form.elements[i+1]){
					  form.elements[i+1].focus();
				  }
				  return;
			  }
		}
	}
	}
function formatall(event){
		event=event||window.event;
		var target=event.target||event.srcElement;
		var charCode=getCharCode(event);
		var stringCode=String.fromCharCode(charCode);
		if(!/\d/.test(stringCode) && charCode > 9){
			alert("输入符合格式的字符");
		}

	}
function properNum(event){
	var dategoal=new Date();
	var y=dategoal.getFullYear();
	function year(){
		if(this.value<y){
			this.value=y;
		}
	}
	function month (){
		if(this.value>12){
			this.value=12;
		}
		if(this.value<1){
			this.value=1;
		}
	}
	function date (){
		if(this.value>31){
			this.value=31;
		}
		if(this.value<1){
			this.value=1;
		}
	}
	return{
		year:year,
		month:month,
		date:date
	}
}
	var mygoal=document.getElementById("mygoal");
	mygoal.onkeyup=tabForward;
	var steps=g_class("steps");
	for(var i=0;i<steps.length;i++){
		steps[i].id="step"+i;
		steps[i].onkeyup=tabForward;
	}
	var deadline_month = g_class("deadline_month")[0];
	var deadline_date = g_class("deadline_date")[0];
	var deadline_year = g_class("deadline_year")[0];
	deadline_month.onkeypress=formatall;
	deadline_date.onkeypress=formatall;
	deadline_year.onkeypress=formatall;
	deadline_month.onkeyup=tabForward;
	deadline_year.onkeyup=tabForward;
	deadline_year.onblur=properNum().year;
	deadline_month.onblur=properNum().month;
	deadline_date.onblur=properNum().date;
	var date1=new Date();
	g_class("now_date")[0].innerHTML=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();
//给添加steps的按钮添加事件
var addli=g("addli");
function addstep(event){
	var ul=g("process");
	var lists=ul.getElementsByTagName("li");
    var texte='<li><label><span>step <i>'+lists.length+'</i></span><input class="steps" maxlength="10" name="step" type="text" ></label></li>';
	ul.innerHTML =ul.innerHTML+texte;
}
addli.onclick=addstep;
 //提交创建按钮时，将文本显示到内容框中(暂未实现)
//格式化年月日
function createNew(){
	var deadline_month = g_class("deadline_month")[0];
	var deadline_date = g_class("deadline_date")[0];
	var deadline_year = g_class("deadline_year")[0];
	var lis={};
	lis.step=[];
	var mygoal=g("mygoal");
	var steps=g_class("steps");
	for(i=0;i<steps.length;i++){
		lis.step.push(steps[i].value);
	};
	lis.aimtime=deadline_year.value+"-"+deadline_month.value+"-"+deadline_date.value;
	lis.goal=mygoal.value;
	var date=new Date();
	lis.settime=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
	data.push(lis);
}
var btn=document.getElementsByTagName("button")[0];
btn.onclick=createNew;
//内容的目标实现改变边框的颜色
var contentchecked=g_class("content_item_checked");
for(i=0;i<contentchecked.length;i++){
	var inputs=contentchecked[i].getElementsByTagName("input");
   for(var j=0;j<inputs.length;j++){
	   inputs[j].parentNode.style.backgroundColor="red"; 
	    inputs[j].onclick=function(){
		 if(this.checked){
			this.parentNode.style.backgroundColor="";
		 }else{
		 	this.parentNode.style.backgroundColor="red";
		 }
		 
	}
	}
}






