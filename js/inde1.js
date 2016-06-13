window.onload=function () {
	slidePic();
}
//第一个轮播图,自动播放
var data=['./img/1a.jpg','./img/1b.jpg','./img/1c.jpg','./img/1d.jpg',
          './img/1e.png'];
var index=0;
function slidePic(){
	index++;
   if (index==data.length) {
   	  index=0;
   }
    var er=document.getElementById('sliding');
    var img=er.getElementsByTagName('img');
    img.src=data[index];
  setTimeout(slidePic,3000)
  }

//鼠标点击小圆点时的切换
function slidePoint(curindex){
  var er=document.getElementById('redpot');
   var redpots=er.getElementsByTagName('a');
   for (var i = 0; i < data.length; i++) {
   	redpots[i].id=i;
    redpots[i].onclick=function(){
    var er=document.getElementById('sliding');
	var img=er.getElementsByTagName('img');
	img.src=data[this.id];
    }
  }

}
//鼠标点击左右切换时的切换
function nextfor(curindex){
	var er=document.getElementById('sliding');
	var letre=document.getElementById('letre');
	var pre=document.getElementById('preva')
   er.onmouseover=function(){
 	letre.style.display="block";
 }
  er.onmouseout=function(){
 	letre.style.display="none";
 }
   pre.onclick=function(event){
    this.id=curindex;
    this.id +=1;
    slideSty(this.id);
 }
}
