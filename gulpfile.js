/**
 * Created by JIANBO on 2016/11/13.
 */
var gulp = require('gulp');

var del = require('del'),
    cleancss = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    minifyhtml = require('gulp-minify-html'),
    autoprefixer = require('gulp-autoprefixer'),
    useref=require('gulp-useref'),
    gulpif=require('gulp-if'),
    lazypipe=require('lazypipe'),
    uglify=require('gulp-uglify'),
    rev=require('gulp-rev'),
    filter=require('gulp-filter'),
    revreplace=require('gulp-rev-replace');

var indexHtmlFilter = filter(['**/*', '!**/index.html'], { restore: true });


var csstasks = lazypipe()
    .pipe(autoprefixer,{
        browsers: ['last 2 versions'],
        cascade: false
    })
    .pipe(cleancss);

gulp.task('doimages',function(){
    return gulp.src('src/assets/imgs/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/imgs'));
});



gulp.task('douseref',function(){
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpif('*.html', minifyhtml()))
        .pipe(gulpif('*.css', csstasks()))
        .pipe(gulpif('*.js',uglify()))
        .pipe(indexHtmlFilter)
        .pipe(rev())                // Rename the concatenated files (but not index.html)
        .pipe(indexHtmlFilter.restore)
        .pipe(revreplace())
        .pipe(gulp.dest('dist'));
});

gulp.task('delcss',function(){
    return del.sync('dist/assets/css');
});

gulp.task('deljs',function(){
    return del.sync('dist/assets/js');
});

gulp.task('delimages',function(){
    return del.sync('dist/assets/imgs');
});

gulp.task('delhtml',function(){
    return del.sync('dist/*.html');
});

gulp.task('delall', ['delcss', 'deljs', 'delimages','delhtml']);

gulp.task('doall', ['delall','douseref', 'doimages']);