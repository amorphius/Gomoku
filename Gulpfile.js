var gulp = require("gulp");
var del = require("del");
var coffee = require("gulp-coffee");
var header = require("gulp-header");
var jsx = require("gulp-react");

// gulp.task("coffee", function(){
//     gulp.src(["./src/**/*.coffee"])
//         .pipe(coffee({bare: true}))
//         .pipe(gulp.dest("./build"));
// });

gulp.task("jsx", function(){
    gulp.src("./src/**/*.coffee")
        .pipe(coffee({bare: true}))
        .pipe(header("/** @jsx React.DOM */\n\n"))
        .pipe(jsx())
        .pipe(gulp.dest("./build"));
});

gulp.task("watch", function(){
    gulp.watch("./src/**/*.coffee", ["jsx"]);
});

gulp.task("build", function(){
    del("build", function(){
        gulp.start(["jsx", "watch"]);
    });
});

gulp.task("default", ["build"]);