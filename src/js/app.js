//css 資源輸入
import './../sass/style.scss';


// gsap 注入
import { TweenMax } from 'gsap';

// vue 注入

import Vue from "vue";

// jquery
// import $ from 'jquery';


// jquery
$('body').css('background-color', 'yellow');


// vue 
new Vue({
    el: '#app',
    data: {
        message: '首頁tfd102'
    }

})


// tweenmax
TweenMax.to('.box', 1, {
    x: 400,
    rotation: 360,
    repeat: -1,
    scale: 2,
    yoyo: true
})




const add = (a, b) => a * b;
console.log(add(100, 20) + '像素');