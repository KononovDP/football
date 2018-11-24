var gulp           = require('gulp'),
	sass           = require('gulp-sass'),
	browserSync    = require('browser-sync'),
	concat         = require('gulp-concat'),
	uglify         = require('gulp-uglify'),
	cleanCSS       = require('gulp-clean-css'),
	rename         = require('gulp-rename'),
	del            = require('del'),
	imagemin       = require('gulp-imagemin'),
	cache          = require('gulp-cache'),
	autoprefixer   = require('gulp-autoprefixer'),
	sourcemaps     = require('gulp-sourcemaps'),
	notify         = require("gulp-notify");


// Таск для преобразования .sass файлов в .css
gulp.task('sass', function() {
	// берем все .sass файлы по указанному шаблону
	return gulp.src('resources/sass/**/*.sass')
	// инициализируем sourcemaps, чтобы в инспекторе отображался корректный путь к файлу
	.pipe(sourcemaps.init())
	// преобразовуем .sass в .css
	.pipe(sass({outputStyle: 'expanded'}).on("error", notify.onError()))
	// добавляем вендорные префиксы
	.pipe(autoprefixer(['last 15 versions']))
	// минифицируем стили
	.pipe(cleanCSS())
	// фиксируем sourcemaps
	.pipe(sourcemaps.write())
	// выгружаем полученные стили в указанную папку
	.pipe(gulp.dest('resources/css'))
	// перезагружаем страницу в браузере
	.pipe(browserSync.reload({stream: true}));
});

// Таск для сбора сторонних .css файлов (плагины)
gulp.task('lib-css', function() {
	// указываем путь к необходимым файлам
	return gulp.src([
		'resources/libs/slick-carousel/slick/slick.css'
	])
	// склеиваем их в один файл, с учетом из порядка на предыдущем шаге 
	.pipe(concat('lib.min.css'))
	// минифицируем стили
	.pipe(cleanCSS())
	// выгружаем полученный файл в указанную папку
	.pipe(gulp.dest('resources/css'));
});

// Таск для кастомных скриптов
gulp.task('js', function() {
	// берем файл скриптов
	return gulp.src('resources/js/common.js')
	// выгружаем его в указанную папку
	.pipe(gulp.dest('resources/js'))
	// перезагружаем страницу в браузере
	.pipe(browserSync.reload({stream: true}));
});

// Таск для сбора сторонних .js файлов (плагины)
gulp.task('lib-js', function() {
	// указываем путь к необходимым файлам
	return gulp.src([
		'resources/libs/jquery/dist/jquery.min.js',
		'resources/libs/object-fit-images/dist/ofi.browser.js',
		'resources/libs/slick-carousel/slick/slick.js'
	])
	// склеиваем их в один файл, с учетом их порядка на предыдущем шаге 
	.pipe(concat('lib.min.js'))
	// минимизируем получившийся файл
	.pipe(uglify()) 
	// выгружаем полученные скрипты в указанную папку
	.pipe(gulp.dest('resources/js'))
	// перезагружаем страницу в браузере
	.pipe(browserSync.reload({stream: true}));
});

// Таск для автоматической перезагрузки страницы в браузере
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			// указываем папку, при изменениях в которой, будет запускаться перезагрузка
			baseDir: 'resources'
		},
		notify: false
	});
});

// Таск для автоматической отслеживания любых изменений в файлах
gulp.task('watch', ['sass', 'lib-css', 'js', 'lib-js', 'browser-sync'], function() {
	// смотрим за стилями
	gulp.watch('resources/sass/**/*.sass', ['sass']);
	// смотрим за скриптами
	gulp.watch(['resources/libs/**/*.js', 'resources/js/common.js'], ['js']);
	// смотрим за html и перезагружаем страницу
	gulp.watch('resources/*.html', browserSync.reload);
});

// Таск для оптимизации картинок
gulp.task('imagemin', function() {
	return gulp.src('resources/img/**/*')
	.pipe(imagemin()) 
	.pipe(gulp.dest('public/img')); 
});

// Таск для сборки проекта на продакшн
gulp.task('build', ['removedist', 'imagemin', 'sass', 'lib-css', 'js', 'lib-js'], function() {
	var buildFiles = gulp.src([
		'resources/*.html',
		'resources/.htaccess',
		]).pipe(gulp.dest('public'));

	var buildCss = gulp.src([
		'resources/css/lib.min.css',
		'resources/css/main.css'
		]).pipe(gulp.dest('public/css'));

	var buildJs = gulp.src([
		'resources/js/lib.min.js',
		'resources/js/common.js'
		])
		.pipe(uglify())
		.pipe(gulp.dest('public/js'));

	var buildImg = gulp.src([
		'resources/img/**/*',
		]).pipe(gulp.dest('public/img'));

	var buildFonts = gulp.src([
		'resources/fonts/**/*',
		]).pipe(gulp.dest('public/fonts'));
});


gulp.task('removedist', function() { return del.sync('public'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
