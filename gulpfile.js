let project_folder = "dist";
let source_folder = "#src";

let path={
	build:{
		html: project_folder + "/",
		css: project_folder + "/CSS/",
		js: project_folder + "/js/",
		img: project_folder + "/images/",
	},
	src:{
		html:[source_folder + "/*.html", "!" + source_folder + "/_*.html"],
		css: source_folder + "/CSS/style.css",
		js: source_folder + "/js/script.js",
		img: source_folder + "/images/**/*.{jpg,png,svg,gif,ico,webp}",
	},
	watch:{
		html: source_folder + "/**/*.html",
		css: source_folder + "/CSS/**/*.css", //Maybe change
		js: source_folder + "/js/**/*.js",
		img: source_folder + "/images/**/*.{jpg,png,svg,gif,ico,webp}"
	},
	clean: "./" + project_folder + "/"
}


let { src, dest} = require('gulp'),
	gulp = require('gulp'),
	browsersync = require("browser-sync").create(),
	fileinclude = require("gulp-file-include"),
	del = require("del"),
	scss = require("gulp-sass");


function browserSync(params) {
	browsersync.init({
		server: {
			baseDir: "./" + project_folder + "/"
		},
		port: 3000,
		notify: false
	})
}


function html() {
	return src(path.src.html) //reffering to sources
		.pipe(fileinclude()) //collecting file
		.pipe(dest(path.build.html)) //unloading to result
		.pipe(browsersync.stream()) //page refresh
}


function css() {
	return src(path.src.css)
		.pipe(
			scss({
				outputStyle: "expanded"
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}


function watchFiles(params) {
/*for online changes*/
	gulp.watch([path.watch.html], html);
}


function clean(params) {
	return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(css, html);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.css = css;
exports.build = build;
exports.watch = watch;
exports.default = watch;