const { src, dest, series, watch } = require("gulp");
const autoPrefixer = require("gulp-autoprefixer");
const scss = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");

function styles() {
  return src("./sass/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(scss({ outputStyle: "compressed" }).on("error", scss.logError))
    .pipe(autoPrefixer("last 2 version"))
    .pipe(sourcemaps.write("./"))
    .pipe(dest("./css"));
}

function watchTask() {
  watch(["./sass/**/*.scss"], series(styles));
}

exports.default = series(styles, watchTask);
