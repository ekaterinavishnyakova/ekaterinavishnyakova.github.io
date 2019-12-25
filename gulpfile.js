//const gulp = require("gulp");
const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require( 'gulp-rm' );
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
//const svgo = require('gulp-svgo');
//const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');
//const imagemin = require('gulp-imagemin');

const env = process.env.NODE_ENV;

const {SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS} = require('./gulp.config');
sass.compiler = require('node-sass');

task('clean', () => {
  return src(`${DIST_PATH}/**/*`, { read: false })
    .pipe(rm())
 })


task('copy:html', () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
 })

 task('copy:img', () => {
  return src(`${SRC_PATH}/img/picture/*.*`)
    .pipe(dest('dist/img/picture'))
    .pipe(reload({ stream: true }));
 })

 task('copy:video', () => {
  return src(`${SRC_PATH}/video/*.*`)
    .pipe(dest('dist/video'))
    .pipe(reload({ stream: true }));
 })

 task('fonts', () => {
  return src(`${SRC_PATH}/fonts/**/*.*`)
    .pipe(dest('dist/fonts'))
    .pipe(reload({ stream: true }));
 })

task('icons', () => {
  return src(`${SRC_PATH}/img/icons/*.*`)
 //   .pipe(svgo())
 //   .pipe(svgSprite({
 //     mode: {
 //       symbol: {
//          sprite: '../sprite.svg'
//        }
////      }
//    }))
    .pipe(dest('dist/img/icons'));
 });

 task('styles', () => {
  return src([...STYLE_LIBS, 'src/styles/main.scss'])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(px2rem())
    .pipe(gulpif(env === 'prod', autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })))
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
 });
  
const libs = [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/fullpage.js/dist/fullpage.js',
    
   ];
 
  
 task('scripts', () => {
  return src('src/scripts/*.js')
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js', {newLine: ';'}))
    .pipe(gulpif(env === 'prod', babel({
        presets: ['@babel/env']
      })))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
 });

 task('scriptsVendors', () => {
  return src(libs)
    .pipe(concat('vendors.min.js', {newLine: ';'}))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
 });



task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});



task('watch', () => {
  watch('./src/styles/**/*.scss', series('styles'));
  watch('./src/*.html', series('copy:html'));
  watch('./src/scripts/*.js', series('scripts'));
  watch('./src/img/icons/*.*', series('icons'));
  watch('./src/img/picture/*.*', series('copy:img'));
  watch('./src/fonts/**/*.*', series('fonts'));
  watch('./src/video/*.*', series('copy:video'));
})
'copy:video'
 
 task('default',
 series(
   'clean',
   parallel('copy:html', 'styles', 'scriptsVendors', 'scripts', 'fonts', 'icons', 'copy:img', 'copy:video'),
   parallel('watch', 'server')
));

task('build',
 series(
   'clean',
   parallel('copy:html', 'styles', 'scriptsVendors', 'scripts', 'fonts', 'icons','copy:img', 'copy:video'))
);
