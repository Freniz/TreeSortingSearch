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