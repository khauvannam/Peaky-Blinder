const { src, dest, series, watch } = require("gulp");
const autoPrefixer = require("gulp-autoprefixer");
const scss = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();

function browserSyncServe(cb) {
  browserSync.init({ server: { baseDir: "." } });
  cb();
}

function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

function styles() {
  return src("./sass/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(scss({ outputStyle: "compressed" }).on("error", scss.logError))
    .pipe(autoPrefixer("last 2 version"))
    .pipe(sourcemaps.write("./"))
    .pipe(dest("./css"));
}

function watchTask() {
  watch("*.html", browserSyncReload);
  watch(["./sass/**/*.scss"], series(styles, browserSyncReload));
}

exports.default = series(styles, browserSyncServe, watchTask);

//? npm install gulp gulp-sass sass gulp-autoprefixer gulp-browsersync gulp-sourcemaps
