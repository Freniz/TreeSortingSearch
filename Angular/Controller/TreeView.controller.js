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