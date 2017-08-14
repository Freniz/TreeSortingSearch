!function(e,n){"object"==typeof exports?module.exports=n(require("bluebird")):"function"==typeof define&&define.amd?define(["bluebird"],n):e.TreeLookup=n(e.Promise)}(this,function(e){function n(e){return{1:{2:{4:{},6:{},8:{},10:{},12:{}},3:{6:{},9:{},12:{},15:{}},4:{8:{},12:{},16:{},20:{},24:{},28:{}}},2:{4:{},8:{16:{},24:{}},12:{24:{}}},3:{6:{12:{},18:{},24:{},30:{}},9:{18:{},27:{}},12:{24:{},36:{}}},4:{8:{},12:{},16:{32:{}},20:{},24:{},28:{},32:{}},5:{10:{},15:{},20:{},25:{}},7:{14:{28:{}},21:{}},11:{22:{},33:{}},13:{26:{}},17:{}}}function t(){function t(e){for(var n,t,o=e.split("/"),r=i;o.length;)if(n=o.shift(),""!==n){if(t=r,t=t[n],void 0===t)break;r=t}return Object.keys(r)}var i=n();this.getChildrenAsCallback=function(e,n){setTimeout(function(){n(null,t(e))},0)},this.getChildrenAsPromise=function(n){return new e(function(e){setTimeout(function(){e(t(n))},0)})}}return t});
class TreeViewController{
	constructor($scope, SearchResultPathService){
		'ngInject';
		this.$searchResultPathService = SearchResultPathService;
		this.$treeLookupService = new TreeLookup();
		this.$scope = $scope;
		this.children = [];
	}
	$onInit(){
		this.children=[];
		if(this.number){
			this.path = this.parentPath+this.number+"/";
		}
		else{
			this.path = this.parentPath;
			this.number = this.parentPath;
			this.isOpen = true;
			this.isRootNode = true;
		}
		var ctrl = this;
		ctrl.$treeLookupService.getChildrenAsPromise(this.path).then(function(nodes){
			ctrl.$scope.$apply(function(){
				ctrl.children = nodes;
			});
		});
		
	}
	getChildren(){
		return this.children;
	}
	isCurrentPath(){
		if(this.$searchResultPathService.getResultPath() == ''){
			return false;
		}
		return (this.$searchResultPathService.getResultPath().indexOf(this.path) === 0);
	}
}
const TreeViewComponent = {
	controller:TreeViewController,
	controllerAs:'vm',
	template:'<div class="col-xs-12 indent node" ng-class="{open:(vm.isCurrentPath() || vm.isOpen), root:vm.isRootNode}"  ><h4 ng-class="{\'text-success\':vm.isCurrentPath()}"> <span ng-click="vm.isOpen = !vm.isOpen"><i class="fa" ng-if="vm.getChildren().length > 0" ng-class="{\'fa-minus\':(vm.isOpen || vm.isCurrentPath()), \'fa-plus\':(!vm.isOpen && !vm.isCurrentPath())}" ></i></span>&nbsp;&nbsp;{{vm.number}}</h4><tree-view parent-path="vm.path" number="child" ng-repeat="child in vm.getChildren()"></tree-view></div>',
	bindings:{
		parentPath:"=parentPath",
		number:"=?number"
	}
}
class BFSTreeSearch{
	
	constructor($rootScope){
		this.$treeLookupService = new TreeLookup();
		this.$rootScope = $rootScope;
		this.queue = [];
	}
	
	searchInit(){
		var service = this;
		service.$rootScope.$on("bfsCurrentPathChanged", function(event, currentPath){
			service.getChildrenNodes(currentPath);
		});
		service.$rootScope.$on("bfsResponseReceivedFromLookup", function(event, nodes){
			if(nodes.length > 0){
				if(nodes.indexOf(service.searchNumber+'') > -1){
					service.queue = [];
					service.$rootScope.$broadcast("searchCompleted",{status:"SearchResultFound", searchPath: (service.currentPath+service.searchNumber+"/")});
				}
				else{
					service.transformNodesWithPathAndAddToQueue(nodes);
					service.bfsNext();
				}
			}
			else{
				service.bfsNext();
			}
		});
	}
	search(number){
		this.searchNumber = number;
		this.bfsInit();
	}
	
	getChildrenNodes(path){
		var service = this;
		this.$treeLookupService.getChildrenAsPromise(path).then(function(nodes){
			service.$rootScope.$broadcast("bfsResponseReceivedFromLookup", nodes);
			service.currentChildrenNodes = nodes;
		});
	}
	
	transformNodesWithPathAndAddToQueue(nodes){
		var service = this;
		angular.forEach(nodes, function(number){
			service.queue.push({'number':number, 'path':service.currentPath});
		});
	}
	bfsInit(){
		this.currentPath = '/';
		this.$rootScope.$broadcast("bfsCurrentPathChanged", this.currentPath);
	}
	 bfsNext(){
		 if(this.queue.length > 0){
			 var bfsRefNode = this.queue.shift();
			 this.currentPath = bfsRefNode.path+bfsRefNode.number+"/";
			 this.$rootScope.$broadcast("bfsCurrentPathChanged", this.currentPath);
		 }
		 else if(this.queue.length == 0){
			 this.$rootScope.$broadcast("searchCompleted",{status:"SearchResultNotFound"});
		 }
	 }
}
class DFSTreeSearch{
	
	constructor($rootScope){
		this.$treeLookupService = new TreeLookup();
		this.$rootScope = $rootScope;
		this.queue = [];
	}
	
	searchInit(){
		var service = this;
		service.$rootScope.$on("dfsCurrentPathChanged", function(event, currentPath){
			service.getChildrenNodes(currentPath);
		});
		service.$rootScope.$on("dfsResponseReceivedFromLookup", function(event, nodes){
			if(nodes.length > 0){
				if(nodes.indexOf(service.searchNumber+'') > -1){
					service.queue = [];
					service.$rootScope.$broadcast("searchCompleted",{status:"SearchResultFound", searchPath: (service.currentPath+service.searchNumber+"/")});
				}
				else{
					service.transformNodesWithPathAndAddToQueue(nodes);
					service.dfsNext();
				}
			}
			else{
				service.dfsNext();
			}
		});
	}
	search(number){
		this.searchNumber = number;
		this.dfsInit();
	}
	
	getChildrenNodes(path){
		var service = this;
		this.$treeLookupService.getChildrenAsPromise(path).then(function(nodes){
			service.$rootScope.$broadcast("dfsResponseReceivedFromLookup", nodes);
			service.currentChildrenNodes = nodes;
		});
	}
	
	transformNodesWithPathAndAddToQueue(nodes){
		var service = this;
		var nodesArr = [];
		angular.forEach(nodes, function(number){
			nodesArr.push({'number':number, 'path':service.currentPath});
		});
		if(nodesArr.length > 0)
			service.queue = nodesArr.concat(service.queue)
		
	}
	dfsInit(){
		this.currentPath = '/';
		this.$rootScope.$broadcast("dfsCurrentPathChanged", this.currentPath);
	}
	 dfsNext(){
		 if(this.queue.length > 0){
			 var dfsRefNode = this.queue.shift();
			 this.currentPath = dfsRefNode.path+dfsRefNode.number+"/";
			 this.$rootScope.$broadcast("dfsCurrentPathChanged", this.currentPath);
		 }
		 else if(this.queue.length == 0){
			 this.$rootScope.$broadcast("searchCompleted",{status:"SearchResultNotFound"});
		 }
	 }
}
class SearchResultPath{
	constructor(){
		this._path = '';
	}
	setResultPath(path){
		this._path = path;
	}
	getResultPath(){
		return this._path;
	}
}
angular.module('Tree-Search', []);

angular.module("Tree-Search").service('BFSTreeSearchService', BFSTreeSearch);
angular.module("Tree-Search").service('DFSTreeSearchService', DFSTreeSearch);
angular.module("Tree-Search").service('SearchResultPathService', SearchResultPath);
angular.module("Tree-Search").component('treeView', TreeViewComponent);