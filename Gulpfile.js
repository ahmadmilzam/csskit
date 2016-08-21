/**
 *
 * Config item
 *
 */
var config = {
  app: './docs/',
  build: './build/',
  src: './src/',
  bower: './bower_components/'
};

var src = {
  scss : './scss/'
}

var path = {
  css : config.app+'assets/css',
  js : config.app+'assets/js',
  img : config.app+'assets/img'
}


/**
 *
 * Required
 *
 */
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins'),
    $ = plugins(),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    runSequence = require('run-sequence'),
    del = require('del'),
    argv = require('yargs').argv;


/**
 *
 * SCSS task
 *
 */
var sassOptions = {
  errLogToConsole: true,
  includePaths: [
    './scss'
  ],
  outputStyle: 'nested'
};

var prefixerOptions = {
  browsers: [
    'last 2 versions',
    '> 1%',
    'ie 9'
  ]
};

gulp.task('scss', function () {
  return gulp
    .src(src.scss+'example.main.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass(sassOptions).on('error', $.sass.logError))
    .pipe($.autoprefixer(prefixerOptions))
    .pipe($.if(argv.production, $.cssnano()))
    .pipe($.if(argv.production, $.rename({suffix: '.min'})))
    .pipe($.if(!argv.production, $.sourcemaps.write('../sourcemaps')))
    .pipe(gulp.dest(path.css))
    .pipe(browserSync.stream({match: '**/*.css'}));
});


/**
 *
 * Scripts task
 *
 */
var uglifyOptions = {
  compress: {
    sequences: true,
    dead_code: true,
    conditionals: true,
    booleans: true,
    unused: true,
    if_return: true,
    join_vars: true,
    drop_console: true
  }
}
gulp.task('script', function(){
  return gulp
    .src([
      src.js+'lib/smoothscroll.js',
      src.js+'lib/responsive-img.js',
      src.js+'app.js'
    ])
    .pipe($.sourcemaps.init())
    .pipe($.concat('app.js'))
    .pipe($.if(argv.production, $.uglify(uglifyOptions)))
    .pipe($.if(argv.production, $.rename({suffix: '.min'})))
    .pipe($.if(!argv.production, $.sourcemaps.write('../sourcemaps')))
    .pipe(gulp.dest(path.js));
});


/**
 *
 * Build task
 *
 */

// clear cache
gulp.task('clear-cache', function (callback) {
  return $.cache.clearAll(callback)
})

// clear out all file and folder from build folder - 1st
gulp.task('clean-folder', function(){
  return del.sync(config.build);
});

// create build folder - 2nd
gulp.task('copy-folder', function(){
  return gulp
    .src(config.app+'**/*')
    .pipe(gulp.dest(config.build));
});

// optimize images - 3rd
gulp.task('optim-images', function(){
  return gulp.src(path.img+'/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe($.cache($.imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest(config.build+config.assets+'img'))
});

// remove unwanted build files - 4th
// list all files and directories here that you don't want to include
gulp.task('remove', function(){
  del.sync([
    config.build+config.assets+'sourcemaps/',
    config.build+config.assets+'css/!(*.min.css)',
    config.build+config.assets+'js/!(*.min.js)'
  ]);
});


/**
 *
 * Browser-Sync task
 *
 */
gulp.task('serve', function(){
  browserSync({
    server: {
      baseDir: config.app
    }
  });
});

gulp.task('serve:build', function(){
  browserSync({
    server: {
      baseDir: config.build
    }
  });
});


/**
 *
 * Watch task
 *
 */
gulp.task('watch', function(){
  gulp.watch('./Gulpfile.js', ['scss', 'script']);

  gulp.watch(src.scss+'**/*.scss', ['scss']);
  gulp.watch(src.js+'**/*.js', ['script']);

  gulp.watch(path.js+'/**/*.js').on('change', reload);
  gulp.watch(config.app+'**/*.html').on('change', reload);
});

gulp.task('watch:scss', function(){
  gulp.watch(src.scss+'**/*.scss', ['scss']);
});


/**
 *
 * Command task
 *
 */
gulp.task('default', function (callback) {
  runSequence(
    ['scss', 'watch:scss'],
    callback
  )
});

gulp.task('build', function (callback) {
  runSequence(
    'scss',
    'script',
    'clean-folder',
    'copy-folder',
    'optim-images',
    'remove',
    callback
  )
});
