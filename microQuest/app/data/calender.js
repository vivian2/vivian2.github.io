var ShowDate = function(){
	this.date = new Date();
	this.selectedEle=null;
}
ShowDate.prototype={
	//创建日历主体
	create:function(){
		$('<div>').addClass('head').appendTo($('.container'))
		$('<button>').addClass('prev').html('<-').appendTo($('.head'))
		$('<h3>').appendTo($('.head'))
		$('<button>').addClass('next').html('->').appendTo($('.head'))
		$('<table>').appendTo($('.container'))
		$('<thead>').appendTo($('table'))
		$('<tbody>').appendTo($('table'))
		var data = ['日','一','二','三','四','五','六'];
		for (var i = 0; i < data.length; i++) {
			$('<th>').html(data[i]).appendTo($('thead'))
		}
		for(var m=0;m<5;m++){
			var tr=$('<tr>');
			tr.appendTo($('tbody'));
		}
		for (var j= 0;j<7; j++) {
		  var td=$('<td>');
		  td.appendTo($('tr'));
		}
		this.renderDate(this.date)
	},
	severalClick:function(){
	  var _this=this;
	  var clickEvent=function(e){
        if(e.target.nodeName.toLowerCase() === 'td'){
            var tds = $('tbody td'),
            index = tds.index($(e.target)),
            selectIndex = tds.index(_this.selectedEle);
            var dat = new Date(_this.date);
            dat.setDate(dat.getDate()+index-selectIndex)
            _this.selectDate(dat)
            _this.getData(dat) 
            return dat
        }
	};
	var pre = function(){
     _this.date.setMonth(_this.date.getMonth()-1)
     _this.renderDate(_this.date)
	};
	var next = function(){
		_this.date.setMonth(_this.date.getMonth()+1)
		_this.renderDate(_this.date)
	}
    return {clickEvent:clickEvent,
            pre:pre,
            next:next}
	},
	selectDate:function(date){
        this.date=date;
        this.renderDate(date);
	},
	renderDate:function(date){
		var time = new Date(date);
	    $('h3').html(time.getFullYear()+"年"+(time.getMonth()+1)+'月');
	    time.setDate(1);
	    time.setDate(1-time.getDay());
	    for (var i = 0; i < $('tbody td').length; i++) {
	    	var ele = $($('tbody td')[i])
	    	ele.css('backgroundColor','#fff')
	    	if (time.getTime() == date.getTime()) {
	    		this.selectedEle = ele;
	    	}
	    	$($('tbody td')[i]).html(time.getDate());
	    	time.setDate(time.getDate()+1);
	    }
	    this.selectedEle.css('backgroundColor','#f2f2f2')
	},
	getData:function(date){
		var dates=new Date(date);
        var y = dates.getFullYear(),
            m = dates.getMonth()+1,
            d = dates.getDate();
            console.log(y+"-"+m+"-"+d)
            $('.dar').val(y+"-"+m+"-"+d)
        if(date < new Date()){
        	alert("请输入的日期大于"+new Date())
        }

	}

}
calender = angular.module("calender",[])
calender.service('ShowDateService',ShowDate);