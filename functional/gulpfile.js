"use strict";

const gulp = require("gulp"),
  watch = require("gulp-watch"),
  batch = require("gulp-batch"),
  split = require("gulp-split-files"),
  markdownToJSON = require("gulp-markdown-to-json"),
  marked = require("marked"),
  render = require("gulp-handlebars-render"),
  glob = require("glob"),
  path = require("path"),
  rename = require("gulp-rename"),
  fs = require("fs"),
  del = require("del"),
  staticPages = {
    slides: "./slides/*.md",
    template: "../assets/index.html",
    dest: "./build/",
    split: "./build/split/",
    json: "./build/json/"
  };

marked.setOptions({
  highlight: function (code) {
    return require("highlight.js").highlightAuto(code).value;
  }
});

gulp.task("clean", () => {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del([`${staticPages.json}*.json`, `${staticPages.split}*.md`, `${staticPages.dest}*.html`]);
});

gulp.task("split", ["clean"], () => {
  return gulp.src(staticPages.slides)
   .pipe(split())
   .pipe(gulp.dest(staticPages.split));
});

gulp.task("markdown", ["split"], () => {
  return gulp.src(`${staticPages.split}*.md`)
   .pipe(markdownToJSON(marked))
   .pipe(gulp.dest(staticPages.json));
});

function buildHTML() {
  return (source) => {
    return gulp.src(staticPages.template)
    .pipe(render({file: source.content}))
    .pipe(rename(source.name))
    .pipe(gulp.dest(staticPages.dest));
  };
}

gulp.task("static-pages", ["markdown"], () => {
  return glob(`${staticPages.json}*.json`, (err, files) => {
    if (err) {
      return err;
    }
    const sources = files.map((file) => {
      return {
        name: `${path.basename(file, ".json")}.html`,
        content: JSON.parse(fs.readFileSync(file))
      };
    });
    sources.forEach(buildHTML());
    return null;
  });
});

gulp.task("watch", () => {
  watch([staticPages.slides, "../assets/*.html", "../assets/js/*.js", "../assets/css/*.css"], batch((events, done) => {
    gulp.start("build", done);
  }));
});

gulp.task("build", ["static-pages"]);
