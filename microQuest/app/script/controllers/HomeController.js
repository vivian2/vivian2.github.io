var homeModule=angular.module('homeModule',[]);
homeModule.controller('HomeController',function($scope,base){
	var lists=localStorage.getItem('lists');
	$scope.judge=function(){
		if (lists!== null && lists !=="[null]" && JSON.parse(lists).length !='0') {
			return true;
		}
	}
	$scope.lists=base
	console.log(base)
	$scope.delete=function(index){
        $($('tbody tr')[index]).remove()
         localStorage.setItem('lists',JSON.stringify(base.splice(index,1)));
 }
})
