const gulp = require('gulp'),
      sass = require('gulp-sass'),
      newer = require('gulp-newer')
      autoprefixer = require('gulp-autoprefixer'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
      header = require('gulp-header'),
      imagemin = require('gulp-imagemin'),
      jshint = require('gulp-jshint'),
      combiner = require('stream-combiner2'),
      pngquant = require('imagemin-pngquant'),
      sourcemaps = require('gulp-sourcemaps');


const paths = {
		sass: {
			src: 'sass/**/*.scss',
			dest: '../creator'
		},
		scripts: {
			src: 'scripts/*.js',
			dest: '../creator/js'
		},
		images: {
			src : 'img/**/*',
			dest : '../creator/img'
		}
	},
	banner = "/* Copyright <%= new Date().getFullYear() %> Lizzy Lebbing */";


// Compile Sass
gulp.task('compileSass',  () => {

    return gulp.src(paths.sass.src)
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: 'sass',
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'IE 10'],
            cascade: false
        }))
        .pipe(header(banner))
        .pipe(gulp.dest(paths.sass.dest));

});

// Compile JS
gulp.task('compileScripts', () => {

    var combined = combiner.obj([

    gulp.src(paths.scripts.src)
        .pipe(jshint({
            "strict": true,
            "scripturl": true,
            "devel": true,
            "curly": true,
            "undef": true,
            "unused": true,
            "eqeqeq": true,
            "eqnull": true,
            "browser": true,
            "camelcase": false,
            "esversion": 6,
            "jquery": false,
            "globals": {
                "linkMt": true
            }
        }))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint().on('error', errorAlert))
        .pipe(concat('built.js'))
        .pipe(gulp.dest('scripts/dist'))
        .pipe(uglify().on('error', errorAlert))
        .pipe(rename('main.min.js'))
        .pipe(header(banner))
        .pipe(gulp.dest(paths.scripts.dest))

    ]);

    combined.on('error', console.error.bind(console));

    return combined;
});

function errorAlert(err) {
    console.log(err.toString());
    this.emit("end");
}

// Compile Images
gulp.task('minifyImages', () => {
    return gulp.src(paths.images.src)
        .pipe(newer(paths.images.dest))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(paths.images.dest));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(paths.sass.src, ['compileSass']);
    gulp.watch(paths.scripts.src, ['compileScripts']);
    gulp.watch(paths.images.src, ['minifyImages']);
});

gulp.task('minify', ['minifyImages'] );
gulp.task('default', ['watch'] );

