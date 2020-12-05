const { src, dest, symlink, parallel, watch } = require('gulp');
const gulpSass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// BROWSER-SYNC
function browser() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
    watch('index.html').on('change', browserSync.reload)
}

// SCSS TO CSS
function sass() {
    return src('./sass/import.scss')
    .pipe(gulpSass())
    .pipe(dest('./css/'))
    .pipe(browserSync.stream());
}

// SCSS WATCHER
function watcher(done) {
    watch('./sass/', sass)
    browserSync.reload();
    done();
}

// EXPORTS
module.exports = {
    sass,
    watcher,
    browser: parallel(browser, watcher)
}