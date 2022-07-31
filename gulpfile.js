const { src, dest, watch, series, parallel } = require('gulp');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const cssdeclsort = require('css-declaration-sorter');
// const del = require('del');
const ejs = require("gulp-ejs");
const gcmq = require('gulp-group-css-media-queries');
const imagemin = require('gulp-imagemin');
const mode = require('gulp-mode')();
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const sass = require('gulp-sass')(require('sass'));

const compileSass = done => {
    const postcssPlugins = [
        autoprefixer({
            cascade: false,
        }),
        cssdeclsort({ order: 'alphabetical' })
    ];

    src('./src/scss/**/*.scss', { sourcemaps: true })
        .pipe(
            plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
        )
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(postcss(postcssPlugins))
        .pipe(mode.production(gcmq()))
        .pipe(dest('./dist/css', { sourcemaps: './sourcemaps' }))
        .pipe(notify({
            message: 'sassをコンパイルしました!',
            onLast: true
        }));
    done();
};

const compileEjs = done => {
    src(["./src/ejs/**/*.ejs", "!" + "./src/ejs/**/_*.ejs"])
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(ejs())
        .pipe(rename({ extname: ".html" }))
        .pipe(replace(/[\s\S]*?(<!DOCTYPE)/, "$1"))
        .pipe(dest("./dist"))
        .pipe(notify({
            message: 'ejsをコンパイルしました!',
            onLast: true
        }));
    done();
}

const compressImages = done => {
    src("./src/assets/images/**")
        .pipe(imagemin())
        .pipe(dest("./dist/images"))
    done()
}

const buildServer = done => {
    browserSync.init({
        port: 8080,
        notify: false,
        files: ["**/*"],
        // 静的サイト
        server: { baseDir: './dist' },
        // 動的サイト
        // proxy: "http://localsite.local/",
        open: true,
        watchOptions: {
            // debounceDelay: 1000,
        },
    });
    done();
};

const browserReload = done => {
    browserSync.reload();
    done();
};

const watchFiles = () => {
    watch('./src/scss/**/*.scss', series(compileSass, browserReload))
    watch('./src/ejs/**/*.ejs', series(compileEjs, browserReload))
};

// const clean = () => del(['./dist/**'], { force: true });

exports.default = series(
    // clean,
    parallel(compileSass, compileEjs),
    parallel(buildServer, watchFiles)
);

exports.build = series(
    // clean,
    // parallel(compileSass, compileEjs, imgFunc, jsFunc),
    parallel(compileSass, compileEjs, compressImages),
);
