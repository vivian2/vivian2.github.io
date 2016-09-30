var editePageMoudle = angular.module('editePageMoudle',[]);
editePageMoudle.controller('EditPagesController',function($scope,$stateParams,base,ShowDateService){
    var jsonIt= base;
    var index = $stateParams.indexId;
    if(index==0){
      $scope.quests=[] 
      if(localStorage.getItem('lists')==undefined){
        var m = 0;
        }else{
           var m=jsonIt.length;
       } 
    }else{
        m=index-1;
        $scope.quests=jsonIt[m].quests
        $('.topTitle').val(jsonIt[m].title);
        $('.dar').val(jsonIt[m].time)
    }
    $scope.showType=function(){
    	$('.questType').toggle()
    }
    $scope.addRadio=function(){
        var quest1={title:"单选题",types:"radio",options:['选项一','选项二'],name:"radio",kind:'1'};
        $scope.quests.push(quest1)
    }
    $scope.addMuti=function(){
        var quest2={title:"多选题",types:"checkbox",options:['选项一','选项二','选项三','选项四'],name:"muti",kind:'2'};
        $scope.quests.push(quest2)
    }    
    $scope.addText=function(){
        var quest3={title:"文本题",kind:'3',types:"textarea"};
        $scope.quests.push(quest3)
    }
    $scope.showCale=function(){
        $('.container').toggle()

    }
    $scope.save=function(){
    var lists={};  
    console.log(m)
    lists[m]={};
    lists[m].title=$('.topTitle').val();
    lists[m].time=$('.dar').val();
    lists[m].quests=[];
    lists[m].status="未发布";
    lists[m].values=[];
    for (var i = 0; i < $('ul').length; i++) {
        lists[m].quests[i]={};
        lists[m].quests[i].title=$($('ul')[i]).find('.quesTit').val();
        lists[m].quests[i].types=$($($('ul')[i]).find('li input')[0]).attr('type');
        if (lists[m].quests[i].types == "radio") {
            lists[m].quests[i].kind = '1';
            lists[m].quests[i].name='radio';
            lists[m].quests[i].value = {};
            lists[m].quests[i].value.kind= "1";
            if ($($('ul')[i]).find('input:radio')[0].checked) {
              lists[m].quests[i].value.num= "0";  
            }else if($($('ul')[i]).find('input:radio')[1].checked){
               lists[m].quests[i].value.num= "1"; 
            }else{
               lists[m].quests[i].value.num= "";
            }
            console.log($($('ul')[i]).find('input:radio')[0].checked)
            console.log($($('ul')[i]).find('input:radio')[1].checked)
            lists[m].quests[i].options=[];
            lists[m].quests[i].options[0]=$($($('ul')[i]).find('li input')[1]).val();
            lists[m].quests[i].options[1]=$($($('ul')[i]).find('li input')[3]).val();
        }else if(lists[m].quests[i].types == "checkbox"){
            lists[m].quests[i].kind = '2';
            lists[m].quests[i].name='muti';
            lists[m].quests[i].value = {};
            lists[m].quests[i].value.kind= "2";
            lists[m].quests[i].value.num="";
            if($($('ul')[i]).find('input:checkbox')[0].checked){
                lists[m].quests[i].value.num += "0";
            } if($($('ul')[i]).find('input:checkbox')[1].checked){
                lists[m].quests[i].value.num +="1";
            } if($($('ul')[i]).find('input:checkbox')[2].checked){
                lists[m].quests[i].value.num +="2";
            } if($($('ul')[i]).find('input:checkbox')[3].checked){
                lists[m].quests[i].value.num +="3";
            }
            lists[m].quests[i].options=[];
            lists[m].quests[i].options[0]=$($($('ul')[i]).find('li input')[1]).val();
            lists[m].quests[i].options[1]=$($($('ul')[i]).find('li input')[3]).val();
            lists[m].quests[i].options[2]=$($($('ul')[i]).find('li input')[5]).val();
            lists[m].quests[i].options[3]=$($($('ul')[i]).find('li input')[7]).val();
        }else{
            lists[m].quests[i].kind = '3';
            lists[m].quests[i].value = {};
            lists[m].quests[i].value.kind= "3";            
            lists[m].quests[i].value.num=$('textarea').val();
        }//else if(lists[m].quests[i].types==undefined){//在编辑页面删除时留下了ul元素未清除干净
            console.log(lists[m])
        //}
        lists[m].values.push(lists[m].quests[i].value)
   }
        if(index ==0){
            base.push(lists[m])
        }else{
            base.splice(m,1,lists[m])
        }
            console.log(base)
            localStorage.setItem("lists",JSON.stringify(base))        
        alert("问卷已保存")
    }
    $scope.send=function(){
        console.log(m) 
        var it = base;      
        if(localStorage.getItem('lists') == null || it[m]===undefined){
            alert("请先保存问卷")            
            $scope.myhref="#/"+$stateParams.indexId
        }
        it[m].status="发布中";
        localStorage.setItem("lists",JSON.stringify(it))
        alert("已发布")
        $scope.myhref="#/"
    }
    ShowDateService.create()
    $('tbody').click(ShowDateService.severalClick().clickEvent);
    $('.prev').click(ShowDateService.severalClick().pre);
    $('.next').click(ShowDateService.severalClick().next);
})
