# TreeSortingSearch

The project is to find the Breadth-First Search using given jquery api. 

Additional Feature :  Depth-First Search

Demo : http://ec2-34-252-59-205.eu-west-1.compute.amazonaws.com/TreeSortingSearch

# Following things have been followed to develop this project.

1) HTML5 based markup
2) Used AngularJs to make the interface interactive
3) Used Bootstrap for responsive / adaptive layout
4) Followed Folder Struture to maintain the code structure
5) No database have been used

6) Have used gulp to compile the CSS pre-processor
	Require:
		have used Node to install the following packages
			follow the document to install node - https://nodejs.org/en/
			
			* gulp - npm install --global gulp
			* gulp-concat - npm install --global gulp-concat
			* gulp-less - npm install --global gulp-less


Angular App Struture : 

	Angular
		-- API
			- TreeLookup.js
		-- Controller
			- TreeView.controller.js
		-- Plugins
			- angular.js
			- jquery.js
		-- Services
			- BFSTreeSearch.service.js
			- DFSTreeSearch.service.js
			- SearchResultPath.service.js
		index.main.js
		app.js
			

<h1>Requirements</h1>

<header><h1>One.com JavaScript Assignment</h1><p>Create an <abbr title="Single Page Application">SPA</abbr> with a search box and a search result area below it. The search result area should be populated with the path to the target number using the TreeLookup API and a breadth-first search.</p><p>Get the TreeLookup source <a href=static/index.e629c34edf.js>here</a>.</p></header><article><h2>Requirements</h2><ul><li>The solution should be a Single Page Application submitted in a zip file, tarball, or accessible git repository.</li> <li>It should contain a field for entering a number to search for.</li> <li>After submitting the value to search for, a breadth-first search should be performed using the TreeLookup API</li> <li>The search result area should display the appropriate path or some indication that a path was not found if the number does not exist.</li></ul><h3>Optional Steps</h3><ul><li>Produce a production-ready build of the application.</li> <li>Incorporate a modern framework or library.</li> <li>Add another useful feature.</li></ul></article><article><h2>TreeLookup API Documentation</h2><p>An instance of TreeLookup can be used to fetch the child nodes of the node at a particular path. It performs this lookup asynchronously and exposes the functionality through 2 similar methods.</p><section class=method-documentation><h3>getChildrenAsCallback(path, cb)</h3><ul class=param-list><li><strong class=param-name>path</strong> <span class=param-type>type: String</span> The path to the node to fetch.</li> <li><strong class=param-name>cb</strong> <span class=param-type>type: Function</span> The function to be called after the lookup is completed.</li></ul><p>The callback should accept <strong class=param-name>err</strong> <span class=param-type>type: Error</span> and <strong class=param-name>nodes</strong> <span class=param-type>type: Array</span> as parameters.</p></section><section class=method-documentation><h3>getChildrenAsPromise(path)</h3><ul class=param-list><li><strong class=param-name>path</strong> <span class=param-type>type: String</span> The path to the node to fetch.</li></ul><p>The returned Promise should resolve with a <strong class=param-name>nodes</strong> <span class=param-type>type: Array</span> parameter and reject with an <strong class=param-name>err</strong> <span class=param-type>type: Error</span> parameter.</p></section><h3>Example</h3><pre class=example>var lookup = new TreeLookup();
lookup.getChildrenAsCallback('/', function (err, nodesFromCb) {
    lookup.getChildrenAsPromise('/' + nodesFromCb[0])
        .then(function (nodesFromPromise) {
            console.log(nodesFromPromise);
        });
});
            </pre></article>