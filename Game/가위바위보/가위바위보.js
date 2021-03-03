var my_image = document.querySelector('#my_image');
var result = document.querySelector('#result');
var rsp_object = { //dictionary 자료구조
    scissor : 0,
    rock : '-100px',
    paper : '100px'
};
var image_coordinates = rsp_object.scissor;
console.log(Object.entries(rsp_object)); //Object.entries(객체)는 객체를 2차원 배열로 만들어준다.

function interval_maker() {
    interval = setInterval(function(){
        if (image_coordinates === rsp_object.scissor) {
            image_coordinates = rsp_object.rock;
        } else if (image_coordinates === rsp_object.rock) {
            image_coordinates = rsp_object.paper;
        } else {
            image_coordinates = rsp_object.scissor;
        }
        document.querySelector('#computer_image').style.background =
        `url(가위바위보.png) ${image_coordinates} 0`;
    }, 100);
}
interval_maker();

var score = {
    scissor: 1,
    rock: 0,
    paper: -1
}; //draw: 0 / win: 2, -1 / lose: 1, -2

function computers_select(){
    return Object.entries(rsp_object).find(function(v) {
        //find에 findIndex를 넣으면 인덱스를 알수있다. //0~순으로 찾는다. //find는 반복문이다.
        // console.log(v); //배열.find는 반복문이지만 원하는 것을 찾으면(return이 true) 멈춘다.
        return v[1] === image_coordinates; //v[1]의 1은 인덱스이다.
    })[0]; //return값은 [key값, value값]로 나오기 때문에 [0]을 붙여준다.
}

function clean(){
    setTimeout(() => {
        result.textContent = ``;
        my_image.style.background = ``;
    }, 1500);
}

document.querySelectorAll('.btn').forEach(function(btn){ //forEach는 대상을 선택해야 적용가능
    btn.addEventListener('click', function(){
        clearInterval(interval);
        setTimeout(function(){
            interval_maker();
        }, 1500);
        clean();
        var my_select = this.id;
        var my_score = score[my_select];
        var computer_score = score[computers_select()];
        var score_compare = my_score - computer_score;
        if (score_compare === 0) {
            result.textContent = `Draw~!`;
            my_image.style.background = `url(가위바위보.png) ${rsp_object[my_select]} 0`;
        } else if ([-1, 2].includes(score_compare)) {
            result.textContent = `You win~!`;
            my_image.style.background = `url(가위바위보.png) ${rsp_object[my_select]} 0`;
        } else {
            result.textContent = `You lose~!`;
            my_image.style.background = `url(가위바위보.png) ${rsp_object[my_select]} 0`;
        }
    });
});