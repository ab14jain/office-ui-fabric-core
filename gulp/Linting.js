var gulp = require('gulp');
var BuildConfig = require('./modules/BuildConfig');

gulp.task('Linting-spacesTabs', function (cb) {
    return gulp.src([
            Config.paths.src + '/**/*.ts', 
            Config.paths.componentsPath + '/**/*.scss',
            Config.paths.componentsPath + '/**/*.html'
        ])
        .pipe(Plugins.plumber(ErrorHandling.onErrorInPipe))
        .pipe(lintspaces({
          trailingspaces: true,
          indentation: 'spaces',
	        spaces: 2,
          newlineMaximum: 2
        }))
        .pipe(lintspaces.reporter());
});

gulp.task('Linting-typescript', function (cb) {
    return gulp.src(Config.paths.src + '/**/*.ts')
        .pipe(Plugins.plumber(ErrorHandling.onErrorInPipe))
        .pipe(Plugins.tslint())
        .pipe(Plugins.tslint.report("verbose"));
});

gulp.task('Linting-componentStyles',  function() {
   return gulp.src(Config.paths.componentsPath + '/**/*.scss')
      .pipe(Plugins.plumber(ErrorHandling.onErrorInPipe))
      .pipe(Plugins.gulpif(Config.debugMode, Plugins.debug({
          title: "Checking SASS Compile errors and linting"
      })))
     .pipe(Plugins.sasslint())
     .pipe(ErrorHandling.SASSlintErrors());
 });

var tasks = [
    'Linting-typescript',
    'Linting-componentStyles',
    'Linting-spacesTabs'
];

//Build Fabric Component Samples
gulp.task('Linting', tasks);
BuildConfig.buildTasks.push('Linting');