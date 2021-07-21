const {
    src, dest, series, parallel, watch
} = require('gulp');

// 任務一
function defaultask(cb) {
    console.log('hi gulp4');
    cb();
}

// 任務輸出
exports.do = defaultask;


//執行順序


//任務Ａ
function missionA(cb) {
    console.log('missionA');
    cb();
}


//任務Ｂ
function missionB(cb) {
    console.log('missionB');
    cb();
}

//任務C
function missionC(cb) {
    console.log('missionC');
    cb();
}

//任務D
function missionD(cb) {
    console.log('missionD');
    cb();
}



//series 順序 
exports.async = series(missionA, missionB);

exports.tasks = series(missionA, missionB, parallel(missionC, missionD));


//  同時執行
exports.sync = parallel(missionA, missionB);


// uglify js

const uglify = require('gulp-uglify');
const rename = require('gulp-rename');


function ugjs() {
    return src('./src/js/scripts.js') //來源
        .pipe(uglify()) //打包js
        .pipe(rename({
            extname: '.min.js'
        })) // 換檔名
        .pipe(dest('dist/js/mini/')) // 目的地
}


exports.taskjs = ugjs


// 壓縮 css

const cleanCSS = require('gulp-clean-css');


function mincss() {
    return src('./src/sass/style.css')
        .pipe(cleanCSS({ compatibility: 'ie10' }))
        .pipe(rename({
            extname: '.min.css'
        })) // 換檔名
        .pipe(dest('dist/css/'))
}
exports.css = mincss

//同時執行 壓縮css js

exports.alltask = parallel(ugjs, mincss);


// 拷貝多個檔案


function copy() {
    //return src(['sass/*.css' ,'!sass/about.css'])// 排除
    return src(['./src/sass/*.*', './src/sass/**/*.scss'])
        .pipe(dest('dist/css/all'))
}

exports.move = copy;

const fileinclude = require('gulp-file-include');



function html() {
    return src('./src/*.html')
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    })).pipe(dest('dist'))
}

exports.h = html


// sass gulp 


const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');



function sassmap(){
  return src('./src/sass/*.scss')
       .pipe(sourcemaps.init())
       .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
       .pipe(sourcemaps.write())
       .pipe(dest('./dist/css'))
   }

function sassstyle(){
  return src('./src/sass/*.scss')
       .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
       .pipe(dest('./dist/css'))
   }


exports.style_online = sassstyle // 上線
exports.style = sassmap // dev

// arrow
// exports.style = () => 
//         src('./src/sass/*.scss')
//        .pipe(sass.sync().on('error', sass.logError))
//        .pipe(dest('./dist/css'))


// function watchs(){
//    watch(['./src/sass/*.scss' , './src/sass/**/*.scss'] , sassmap);
//    watch(['./src/*.html' , './src/**/*.html'] , html);
// }

// exports.w = watchs



exports.watch = () =>
   watch(['./src/sass/*.scss' , './src/sass/**/*.scss'] , sassmap);
   watch(['./src/*.html' , './src/**/*.html'] , html);
   watch(['./src/js/*.js'] , ugjs);


// 壓縮圖片

const imagemin = require('gulp-imagemin');

function minify(){
    return src('src/images/*.*')
    .pipe(imagemin([
        imagemin.mozjpeg({quality: 80, progressive: true}), // 壓縮品質      quality越低 -> 壓縮越大 -> 品質越差 
        imagemin.optipng({optimizationLevel: 3}) // png
    ]))
    .pipe(dest('dist/images'))
}

exports.img = minify






























