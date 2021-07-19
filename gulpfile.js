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


function ugjs() {
    return src('js/scripts.js') //來源
    .pipe(uglify()) //打包js
    .pipe(dest('js/minify/')) // 目的地
}


exports.taskjs = ugjs 






















