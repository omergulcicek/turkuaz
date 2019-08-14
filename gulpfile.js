"use strict";

const alphabetical    = require("css-declaration-sorter"),
      autoprefixer    = require("gulp-autoprefixer"),
      browserSync     = require("browser-sync").create(),
      concat          = require("gulp-concat"),
      sourcemaps      = require("gulp-sourcemaps"),
      gulp            = require("gulp"),
      postcss         = require("gulp-postcss"),
      sass            = require("gulp-sass")

gulp.task("browserSync", () => {
  browserSync.init({
    server: "./"
  })
})

gulp.task("sass", () => {
  return gulp.src("turkuaz.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
    .pipe(concat("turkuaz.min.css"))
    .pipe(postcss([alphabetical({order: "alphabetically"})]))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("css"))
    .pipe(browserSync.stream())
})

gulp.task("watch", function() {
  gulp.watch("scss/**/*.scss", gulp.series("sass"))
})

gulp.task("default", gulp.parallel("sass", "watch", "browserSync"))