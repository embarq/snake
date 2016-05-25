var gulp = require('gulp'),
	sync = require('browser-sync'),
	gulpify = require('gulp-browserify');

gulp.task('default',['gulpify', 'sync'], function() {
  gulp.watch(['scripts/**/*.js'], ['gulpify', 'reload']);
});

gulp.task('sync', function() {
	sync({
		server: {
			baseDir: './'
		},
		notify: false
	});
});

gulp.task('reload', function() {
    sync.reload();
});

gulp.task('gulpify', function() {
    gulp.src('scripts/app.js')
      .pipe(gulpify({
      	insertGlobals: true
      }))
      .pipe(gulp.dest('./'));
});