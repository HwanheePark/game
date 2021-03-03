var numbers = Array(45)
    .fill() //fill은 empty를 undefined로 채워준다.
    .map(function(element, index){
        return index + 1;
    })
console.log(numbers);

var shuffle = [];
while (numbers.length > 0){
    var select = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0];
    shuffle.push(select);
}
console.log(shuffle);

var bonus = shuffle[shuffle.length - 1];
var select_numbers = shuffle.slice(0, 6).sort(function (p, c){return p - c});
console.log(`당첨숫자 : ${select_numbers}, 보너스 : ${bonus}`);

// var result = document.getElementById('result');
var result = document.querySelector('#result'); //id가 result인 태그를 선택

function decoration(index, result){
    var ball = document.createElement('div');
    ball.textContent = index;
    ball.style.display = 'inline-block';
    ball.style.border = '1px solid black';
    ball.style.borderRadius = '100px' //border-radius를 자바스크립트에선 borderRadius
    ball.style.width = '25px';
    ball.style.height = '25px';
    ball.style.textAlign = 'center';
    ball.style.marginRight = '10px';
    ball.style.fontSize = '20px';
    var backgroundcolor; //아직 변수의 내용을 넣지 않은 상태
    if (index <= 10) {
        backgroundcolor = 'red';
    } else if (index <= 20) {
        backgroundcolor = 'orange';
    } else if (index <= 30) {
        backgroundcolor = 'yellow';
    } else if (index <= 40) {
        backgroundcolor = 'skyblue';
    } else {
        backgroundcolor = 'green';
    }
    ball.style.background = backgroundcolor;
    result.appendChild(ball);
}


//closure를 배우지 않았기 때문에 무식한 방법으로 반복표현해서 구현.
// setTimeout(function async_callback(){
//     decoration(select_numbers[0], result);
// }, 1000); //1000밀리초
// setTimeout(function async_callback(){
//     decoration(select_numbers[1], result);
// }, 2000);
// setTimeout(function async_callback(){
//     decoration(select_numbers[2], result);
// }, 3000);
// setTimeout(function async_callback(){
//     decoration(select_numbers[3], result);
// }, 4000);
// setTimeout(function async_callback(){
//     decoration(select_numbers[4], result);
// }, 5000);
// setTimeout(function async_callback(){
//     decoration(select_numbers[5], result);
// }, 6000);
for (var i = 0; i < select_numbers.length; i++) {
    (function closure (j) {
        setTimeout(function() {
            decoration(select_numbers[j], result);   
        }, (j + 1) * 1000);
    })(i);
}
setTimeout(function async_callback(){
    //class는 여러번 쓸 수 있기 때문에 배열처럼 저장되어서 불러올때 index를 적어야 한다.
    //자바스크립트는 class가 중요한 곳에 쓰이므로 className으로 대체해서 적는다.
    // var bonus_class = document.getElementsByClassName('bonus')[0];
    var bonus_class = document.querySelector('.bonus');
    decoration(bonus, bonus_class);
}, 7000);