const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cssnano = require('cssnano');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');
const runSequence = require('run-sequence');


/** PROCESSES FOR 'APP' **/

// Launch browser sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './app'
    },
  })
});


// Run SASS / Autoprefixer / CSSNano
gulp.task('style', function() {
  const processors = [
	autoprefixer({
		browsers: ['last 2 versions', 'ie 11'],  
		// grid: true (enabling this might cause problems)
	}),
    cssnano
  ];
  return gulp.src('./app/scss/**/*.scss') 
    .pipe(sass())
    .pipe(gcmq())
 	  .pipe(postcss(processors))
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))    
});


/** PROCESSES FOR 'DIST' **/

// Concatenate js/css and minify js files 
// (CSSNano takes care of minifying css in 'styles' task, above)

gulp.task('useref', function(){
  return gulp.src('./app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('**/*.js', uglify()))
    .pipe(gulp.dest('./docs'))
});

// Optimise images
gulp.task('images', function(){
  return gulp.src('./app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin()))
  .pipe(gulp.dest('./docs/images'))
});


// Delete docs folder
gulp.task('clean:docs', function() {
  return del.sync('docs');
});

// Clear caches from local system
gulp.task('cache:clear', function (callback) {
  return cache.clearAll(callback)
});



/** Build sequences **/

// Build App: 'gulp watch'
gulp.task('watch', ['browserSync', 'style'], function(){
  gulp.watch('./app/scss/**/*.scss', ['style']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('./app/*.html', browserSync.reload); 
  gulp.watch('./app/js/**/*.js', browserSync.reload); 
});

// Build Dist: 'gulp build'
gulp.task('build', function (callback) {
  runSequence('clean:docs', 
    ['style', 'useref', 'images'],
    callback
  )
});

