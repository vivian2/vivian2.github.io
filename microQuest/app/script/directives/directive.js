/*var updateMulti = angular.module('updateMulti',[]);
updateMulti.directive('updateMulti',function($compile){
    var template="<ul><span>Q</span><input type='text' value='多选题'><li><input type='checkbox'><input type='text' value='选项一'></li>"+
                  "<li><input type='radio'><input type='text' value='选项二'></li><div class='buttons'>"+
                  "<button class='up' ng-click='up()'>上移<button></div></ul>";
	return{
	    restrict:'A',
	    replace:'true',
	    template:"<button ng-click='updateMulti()'>多选题</button>",
	    scope:{

	    },
	    controller:function($scope){  
	    },
	    link:function(scope,element){
	    	element.on('click',function(){
   	    	    scope.$apply(function(){
	    		    var content = $compile(template())(scope);
	    		    angular.element('.questDetail').append(content);

	    	    })
	    	})
	    }
    }
});*/
var up=angular.module('up',[]);
up.directive('up',function(){
    return{
    	replace:true,
    	restrict:'E',
    	template:'<button class="up">上移</button>',
    	controller:function(){

    	},
    	link:function(scope,element){
    		element.on('click',function(){
    			element.parent().parent().parent().prepend(element.parent().parent())
    		})

    	}
    }
})
var down=angular.module('down',[]);
down.directive('down',function(){
    return{
    	replace:true,
    	restrict:'E',
    	template:'<button class="dowm">下移</button>',
    	controller:function(){

    	},
    	link:function(scope,element){
    		element.on('click',function(){
    			element.parent().parent().parent().append(element.parent().parent())
    		})

    	}
    }
})
var dup=angular.module('dup',[]);
dup.directive('dup',function(){
    return{
    	replace:true,
    	restrict:'E',
    	template:'<button class="dup">复制</button>',
    	controller:function(){

    	},
    	link:function(scope,element){
    		element.on('click',function(){
    			var copy=element.parent().parent().clone();
    			element.parent().parent().parent().append(copy)
    		})

    	}
    }
})
var del=angular.module('del',[]);
del.directive('del',function(){
    return{
    	replace:true,
    	restrict:'E',
    	template:'<button class="del">删除</button>',
    	controller:function(){

    	},
    	link:function(scope,element){
    		element.on('click',function(){
    			$(element).parent().parent().remove()
    		})

    	}
    }
})
