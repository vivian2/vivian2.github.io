var showResult = angular.module('showResult',[]);
showResult.controller('ShowResultController',function($scope,$stateParams,base){
    var lists = base;
    var list = lists[$stateParams.showId-1];
    $scope.title=list.title
    $scope.ans=list.quests
    $scope.countRa=0
    $scope.countRb=0
    $scope.countMa=0
    $scope.countMb=0
    $scope.countMc=0
    $scope.countMd=0
    if(list.values.length=='0'){
        $('.showResult').html("请先编辑页面")
    }
    for (var i = 0; i < list.values.length; i++) {
    	var num = list.values[i].num;
    	if(list.values[i].kind=="1"){
    		if(num =='0'){
    			console.log(num)
    		    $scope.countRa=$scope.countRa+1
    	 	}else if(num=='1'){
    	 		console.log(num)
                $scope.countRb=$scope.countRb+1
    	 	}	
    	}
    	if(list.values[i].kind=="2"){
    		console.log(num)
    		if(num.indexOf('0') !=-1){
    			console.log(num.indexOf('0'))
    		    $scope.countMa=$scope.countMa+1
    	 	} if(num.indexOf('1') !=-1){
                $scope.countMb=$scope.countMb+1
    	 	} if(num.indexOf('2') !=-1){
                $scope.countMc=$scope.countMc+1
    	 	} if(num.indexOf('3') !=-1){
                $scope.countMd=$scope.countMd+1
    	 	}	
    	}
    	if(list.values[i].kind=="3"){
    		$scope.text=num
    	}
    }
})