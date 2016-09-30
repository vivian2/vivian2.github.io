var baseServices = angular.module('baseServices', []);
baseServices.factory('base',function(){
    var lists=[];    
    localStorage.setItem('lists',JSON.stringify(lists))    
    return lists
});