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