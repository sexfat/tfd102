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



























