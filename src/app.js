//css 資源輸入
import './css/style.css';
// import './css/header.css';
// import './css/footer.css';

// gsap 注入
import { TweenMax } from 'gsap';

// jquery
import $ from 'jquery';



$('body').css('background-color' , 'green');


TweenMax.to('.box' , 1 , {
 x: 400,
 rotation : 360,
 repeat: -1,
 yoyo: true
})




const add = (a, b) => a * b ;
console.log(add(100 , 20) + '像素'); 