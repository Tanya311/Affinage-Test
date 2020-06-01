"use strict";
const gulp = require("gulp");
const sourcemap = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const minify = require('gulp-minify');
const svgstore = require("gulp-svgstore");
const imagemin = require("gulp-imagemin");
const server = require("browser-sync").create();
const del = require("del");


gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("html", function () {
    return gulp.src("source/index.html")
      .pipe(gulp.dest("build"))
});

gulp.task("js", function () {
  return gulp.src("source/js/*.js")
    .pipe(minify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest("build/js/"));
});


gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
});

gulp.task("server", function () {
    server.init({
      server: "build/",
      notify: false,
      open: true,
      cors: true,
      ui: false
  });
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/sass/**/*.scss", gulp.series("css"));
  gulp.watch("source/js/*.js").on("change", gulp.series("js", "html", "refresh"));
  gulp.watch("source/*.html").on("change", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
    server.reload();
    done();
});

gulp.task("copy", function () {
    return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/css/**",
      "source/js/**",
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", gulp.series("copy", "css", "images", "sprite", "js", "html"));
gulp.task("start", gulp.series("build", "server"));
