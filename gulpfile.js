var gulp         = require('gulp'), 
	sass         = require('gulp-sass'), 
	browserSync  = require('browser-sync'), 
	concat       = require('gulp-concat'), 
	uglify       = require('gulp-uglifyjs'), 
	cssnano      = require('gulp-cssnano'), 
	rename       = require('gulp-rename'),
	del          = require('del'),
	imagemin     = require('gulp-imagemin'),
	pngquant     = require('imagemin-pngquant'),
	cache        = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){ 
	return gulp.src('src/scss/*.scss') //Input scss files
		.pipe(sass().on('error', sass.logError)) // Scss into css files
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Vendor prefixes
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('src/css')) // Output  folder of css files 
		.pipe(browserSync.reload({stream: true})) // Reload pages when scss is changes
});

gulp.task('browser-sync', function() { 
	browserSync({ 
		server: { // Params of server
			baseDir: 'src'// Basedir - src
		},
		open: false, // Disable server opening when gulp is starting
		notify: false // Disable notifications
	});
});

gulp.task('scripts', function() { 
	return gulp.src([ // Input js files
		'src/libs/jquery/dist/jquery.min.js', // jQuery
		'src/js/common.js' // common JS styles ( where you write ) 
		])
		.pipe(uglify()) // compress JS file
		.pipe(concat('scripts.min.js')) // concatination in new file scripts.min.js
		.pipe(gulp.dest('src/js')) // Output folder
});

gulp.task('watch', ['browser-sync','sass','scripts'], function() {
	gulp.watch('src/scss/**/*.scss', ['sass']); // watching for scss files
	gulp.watch('src/js/**/*.js', browserSync.reload);   // watching for js files
	gulp.watch('src/*.html', browserSync.reload); // watching for html files
});

gulp.task('clean', function() {
	return del.sync('dist'); // Delete dist folder before build
});

gulp.task('img', function() {
	return gulp.src('src/img/**/*') // Input img folder 
		.pipe(cache(imagemin({  // Compress with best configuration with cashing
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img')); // Output dist folder
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {

	var buildCss = gulp.src('src/css/style.min.css')
	.pipe(gulp.dest('dist/css'))

	var buildJs = gulp.src('src/js/scripts.min.js') // Output js in dist folder
	.pipe(gulp.dest('dist/js'))

	var buildFonts = gulp.src('src/fonts/**/*') // Output fonts in dist folder
	.pipe(gulp.dest('dist/fonts'))


	var buildHtml = gulp.src('src/*.html') // Output html in dist folder
	.pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);
