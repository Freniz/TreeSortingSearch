var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var less = require('gulp-less');

gulp.task('js', function(){
   gulp.src(['Angular/API/TreeLookup.js','Angular/Controller/TreeView.controller.js','Angular/Services/BFSTreeSearch.service.js','Angular/Services/DFSTreeSearch.service.js','Angular/Services/SearchResultPath.service.js','Angular/index.main.js'])
   .pipe(concat('TreeViewJquery.js'))
   .pipe(gulp.dest('js/'));
});

gulp.task('plugins', function(){
   gulp.src(['Angular/Plugins/angular.js','Angular/Plugins/jquery.js'])
   .pipe(concat('plugins.js'))
   .pipe(gulp.dest('js/'));
});

gulp.task('main', function(){
   gulp.src(['js/plugins.js','js/TreeViewJquery.js','Angular/app.js'])
   .pipe(concat('tree.js'))
   .pipe(gulp.dest('js/'));
});

gulp.task('less', function(){
   gulp.src(['less/style.less'])
   .pipe(concat('style.css'))
   .pipe(less())
   .pipe(gulp.dest('css/'));
});

gulp.task('css', function(){
   gulp.src(['css/bootstrap.css','css/font-awesome.css','css/style.css'])
   .pipe(concat('tree.css'))
   .pipe(gulp.dest('css/'));
});

gulp.task('default',['js','plugins','less','css','main'],function(){
});
