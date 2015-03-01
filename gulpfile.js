var gulp = require('gulp');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');
require("harmonize")();

gulp.task('cleanBuild', function (cb) {
	var rimraf = require('rimraf');
	rimraf('./build/', cb);
});

gulp.task('copyIndexAndCss', ['cleanBuild'], function () {
	return gulp.src([
		'./src/index.html',
		'./node_modules/react-select/dist/default.css'
	])
	.pipe(gulp.dest('./build/'));
});

gulp.task('webpackInc', function (cb) {
	var config = {
		entry: './src/main.js',
		output: {
			filename: './build/bundle.js'
		},
		devtool: 'inline-source-map',
		module: {
			loaders: [
				{ test: /\.js$/, loader: 'babel-loader' }
			]
		},
		resolve: {
			extensions: ['', '.js']
		},
		watch: true,
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify('development')
				}
			})
		]
	};

	return gulp.src('')
	.pipe(gulpWebpack(config))
	.pipe(gulp.dest(''));
});

gulp.task('copyBower', ['copyIndexAndCss'], function () {
	return gulp.src('./src/bower_components/**')
	.pipe(gulp.dest('./build/bower_components/'));
});

gulp.task('webpack', ['copyBower'], function (cb) {
	var config = {
		entry: './src/main.js',
		output: {
			filename: './build/bundle.js'
		},
		module: {
			loaders: [
			{ test: /\.js$/, loader: 'babel-loader' }
			]
		},
		resolve: {
			extensions: ['', '.js']
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify('production')
				}
			})
		]
	};
	var uglify = require('gulp-uglify');

	return gulp.src('')
	.pipe(gulpWebpack(config))
	.pipe(uglify())
	.pipe(gulp.dest(''));
});

gulp.task('jest', function (callback) {
	var jest = require('jest-cli');
	var argv = require('minimist')(process.argv.slice(2));
	console.dir(argv);
	testPathDirs = argv.path || './src';
	var options = {
		rootDir: __dirname,
		scriptPreprocessor: "<rootDir>/node_modules/babel-jest",
		unmockedModulePathPatterns: ["<rootDir>/node_modules/bluebird"],
		testPathDirs: [testPathDirs],
		testDirectoryName: "__tests__",
		testFileExtensions: ["js"]
	}

	var onComplete = function(result){callback();};
	jest.runCLI({config: options}, __dirname, onComplete);
});

gulp.task('easymock', function () {
	var MockServer = require('easymock').MockServer;
	var options = {
		keepalive: true,
		port: 3000,
		path: './webAPI'
	};
	var server = new MockServer(options);
	server.start();
});

gulp.task('devServer', ['easymock'], function() {
	var webserver = require('gulp-webserver');
	gulp.src('./build/')
	.pipe(webserver({
		livereload: false,
		directoryListing: false,
		port:9001,
		open: false,
		proxies: [{
			source: '/webAPI',
			target: 'http://localhost:3000/'
		}]
	}));
});

gulp.task('watch', ['webpackInc'], function () {
	gulp.watch(['./src/**/*.js', './src/index.html'], ["webpackInc"]);
});

gulp.task("develop", ["devServer", "watch", "copyBower"]);
gulp.task("build", ["webpack", "jest"]);
