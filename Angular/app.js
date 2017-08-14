angular.module('Tree-Search')
	.controller('search', ['$scope', 'BFSTreeSearchService', 'DFSTreeSearchService', 'SearchResultPathService', function($scope, BFSTreeSearchService, DFSTreeSearchService, SearchResultPathService){
		BFSTreeSearchService.searchInit();
		DFSTreeSearchService.searchInit();
		$scope.searchType = "bfs";
		$scope.search = function(){
			$scope.numberErr = '';
			$scope.searching = true;
			if($scope.number && $scope.number.trim() != '' && parseInt($scope.number.trim())){
				if($scope.searchType == "dfs"){
					DFSTreeSearchService.search($scope.number);
				}
				else if($scope.searchType == "bfs"){
					BFSTreeSearchService.search($scope.number);
				}
			}
			else{
				$scope.numberErr = "Please enter the valid number";
				$scope.searching = false;
			}
		}
		$scope.$on("searchCompleted", function(event, data){
			$scope.searching = false;
			$scope.$apply(function(){
				if(data.status == "SearchResultNotFound"){
					$scope.isNumberNotFoundInTree = true;
					$scope.isNumberFoundInTree = false;
					$scope.searchResult = "Number Not Found";
					SearchResultPathService.setResultPath('');
				}
				else if(data.status == "SearchResultFound"){
					$scope.isNumberFoundInTree = true;
					$scope.isNumberNotFoundInTree = false ;
					$scope.searchResult = data.searchPath;
					SearchResultPathService.setResultPath(data.searchPath);
				}
			});
		});
	}]);