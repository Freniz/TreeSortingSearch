angular.module('Tree-Search', []);

angular.module("Tree-Search").service('BFSTreeSearchService', BFSTreeSearch);
angular.module("Tree-Search").service('DFSTreeSearchService', DFSTreeSearch);
angular.module("Tree-Search").service('SearchResultPathService', SearchResultPath);
angular.module("Tree-Search").component('treeView', TreeViewComponent);