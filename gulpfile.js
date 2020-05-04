let gulp                = require('gulp');
let concat              = require('gulp-concat');
let sass                = require('gulp-sass');
let autoprefixer        = require('gulp-autoprefixer');
let cleanCSS            = require('gulp-clean-css');
let terser              = require('gulp-terser');
let del                 = require('del');
let rename              = require('gulp-rename');
let cache               = require('gulp-cache');
let browserSync         = require('browser-sync');
let rigger              = require('gulp-rigger');

gulp.task('sass', function(){
    return gulp.src('app/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

gulp.task('styles', function () {
    return gulp.src('scss/*.scss')
        .pipe(sass({
            includePaths: bourbone.includePaths
        }).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(autoprefixer({
            browsers: [' > 0.1%'],
            cascade: false
        }))
        .pipe(cleanCSS({ level: 2}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

gulp.task('css-libs', ['sass'], function() {
    return gulp.src([
        'app/css/app.css',
        'app/css/additional.css'
    ])
        .pipe(cleanCSS({ level: 2 }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

// gulp.task('html', function () {
//    return gulp.src('./app/**/*.html')
//         // .pipe(rigger())
//         .pipe(gulp.dest('./app'))
//         .pipe(browserSync.stream());
//
// });

gulp.task('scripts', function () {
    return gulp.src(
        [
            'app/libs/jquery.min.js',
            'app/libs/popper.js/dist/umd/popper.min.js',
            'app/libs/bootstrap/dist/js/bootstrap.min.js',
            'app/libs/selectize.min.js',
            'app/libs/date/datepicker.js',
            'app/libs/slick.min.js'
        ]
    )
        .pipe(concat('libs.min.js'))
        .pipe(terser())
        .pipe(gulp.dest('app/js'))
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/**/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {

    let buildCss = gulp.src([
        'app/css/main.css',
        'app/css/app.min.css'
    ])
        .pipe(gulp.dest('dist/css'));

    let buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    let buildJs = gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'));

    let buildHtml = gulp.src('app/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('dist'));

});

gulp.task('default', ['watch']);

gulp.task('clear', function () {
    return cache.clearAll();
});
