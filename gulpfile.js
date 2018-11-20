/*eslint-disable node/no-unpublished-require */
const gulp = require("gulp");
//const browserSync = require('browser-sync').create();
const sass = require("gulp-sass");
/*eslint-enaable node/no-unpublished-require */

//Compile Sass & Inject Into Browser

gulp.task("sass", function() {
  return gulp
    .src(["node_modules/bootstrap/scss/bootstrap.scss", "dev/scss/*.scss"])
    .pipe(sass())
    .pipe(gulp.dest("public/stylesheets"));
});

//Move JS Files to src/js

gulp.task("js", function() {
  return gulp
    .src([
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/popper.js/dist/umd/popper.min.js"
    ])
    .pipe(gulp.dest("public/javascripts"));
});

//Watch Sass & Server

gulp.task("serve", ["sass"], function() {
  gulp.watch(
    ["node_modules/bootstrap/scss/bootstrap.scss", "dev/scss/*.scss"],
    ["sass"]
  );
});

// Move Fonts Folder to src/fonts

gulp.task("fonts", function() {
  return gulp
    .src("node_modules/font-awesome/fonts/*")
    .pipe(gulp.dest("public/fonts"));
});

//Move Font Awesome CSS to src/css

gulp.task("fa", function() {
  return gulp
    .src("node_modules/font-awesome/css/font-awesome.min.css")
    .pipe(gulp.dest("public/stylesheets"));
});

gulp.task("default", ["js", "serve", "fa", "fonts"]);
