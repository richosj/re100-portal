import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import cssnano from 'cssnano';
import { deleteSync } from 'del';
import gulp from 'gulp';
import babel from 'gulp-babel';
import cached from 'gulp-cached';
import concat from 'gulp-concat';
import fileInclude from 'gulp-file-include';
import plumber from 'gulp-plumber';
import postCss from 'gulp-postcss';
import rename from 'gulp-rename';
import gulpSass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import * as sass from 'sass';

const sassCompiler = gulpSass(sass);
const server = browserSync.create();

const paths = {
  html: 'src/html/**/*.html',
  includeHtml: 'src/html/include/**/*.html',
  scss: 'src/assets/css',
  js: 'src/assets/js/**/*.js',
  vendorJs: 'src/assets/js/vendor/**',
  images: 'src/assets/images/**/*.{jpg,jpeg,png,svg}',
  fonts: 'src/assets/fonts/**/*',
  dist: 'dist',
  distCss: 'dist/assets/css',
  distJs: 'dist/assets/js',
  distVendorJs: 'dist/assets/js/vendor',
  distImages: 'dist/assets/images',
  distFonts: 'dist/assets/fonts',
};

const separateFiles = ['src/assets/js/main.js'];

// 공통 오류 방지 및 sourcemaps + sass + postcss 처리 함수
function compileSass(src, outName, minify = false) {
  return gulp.src(src, { allowEmpty: true })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(postCss([autoprefixer(), ...(minify ? [cssnano()] : [])]))
    .pipe(rename(outName)) // 이게 없으면 원래 파일명/경로 유지됨
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.distCss)) // 절대 경로로 지정
    .pipe(server.stream());
}


// Clean
function clean() {
  deleteSync([paths.dist]);
  return Promise.resolve();
}

// HTML
function html() {
  return gulp.src([paths.html, `!${paths.includeHtml}`])
    .pipe(plumber())
    .pipe(fileInclude({ prefix: '@@', basepath: '@file' }))
    .pipe(cached('html'))
    .pipe(gulp.dest(paths.dist))
    .pipe(server.stream());
}

// SCSS 관련 task
function styles() {
  return compileSass(`${paths.scss}/index.scss`, 'styles.css');
}
function minifyStyles() {
  return compileSass(`${paths.scss}/index.scss`, { suffix: '.min' }, true);
}
function slickStyles() {
  return compileSass(`${paths.scss}/slick.scss`, 'slick.css');
}
function cssReset() {
  return compileSass(`${paths.scss}/reset.scss`, 'reset.css', true);
}

// JS
function scripts() {
  return gulp.src([
      paths.js,
      `!${paths.vendorJs}`,
      ...separateFiles.map(file => `!${file}`)
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.distJs))
    .pipe(rename('main.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.distJs))
    .pipe(server.stream());
}

function separateScripts() {
  return separateFiles.map(file => {
    return function separate() {
      return gulp.src(file)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(rename(file.split('/').pop()))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.distJs))
        .pipe(server.stream());
    };
  });
}

// Vendor JS
function vendors() {
  return gulp.src(paths.vendorJs)
    .pipe(gulp.dest(paths.distVendorJs));
}

// Assets
function images() {
  return gulp.src(paths.images, { encoding: false })
    .pipe(gulp.dest(paths.distImages));
}
function fonts() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.distFonts));
}

// Serve
function serve(done) {
  server.init({ server: { baseDir: paths.dist } });

  gulp.watch([paths.html], html);
  gulp.watch(`${paths.scss}/**/*.scss`, gulp.series(styles, minifyStyles));
  gulp.watch(paths.js, scripts);
  gulp.watch(separateFiles, gulp.parallel(...separateScripts()));
  gulp.watch(paths.vendorJs, vendors);
  gulp.watch(paths.images, images);
  gulp.watch(paths.fonts, fonts);

  done();
}

// Build
const build = gulp.series(
  clean,
  cssReset,
  gulp.parallel(
    html,
    gulp.series(styles, minifyStyles),
    slickStyles,
    vendors,
    scripts,
    ...separateScripts(),
    images,
    fonts
  )
);

// Default
export default gulp.series(build, serve);
export { clean };

