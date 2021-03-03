var _body = document.body;

function reset(){
    numbers = [1,2,3,4,5,6,7,8,9];
    q_numbers = [];
    for (var i = 0; i < 4; i++){
        //splice로 나온 리턴값은 배열로서 나오기 때문에 꼭 [0]을 붙여주어 값으로 만든다.
        //밑의 랜덤식은 i가 1이 될때부터 완벽한 랜덤은 아니다.
        choice = numbers.splice(Math.floor(Math.random()*(9 - i)), 1)[0];
        q_numbers.push(choice);
    };
};
reset();

var result = document.createElement('h3');
_body.append(result);
var _form = document.createElement('form');
_body.append(_form);
var _input = document.createElement('input');
_input.type = 'text';
//최대 4글자까지 입력가능
_input.maxLength = 4;
_form.append(_input);
var sub_button = document.createElement('button');
sub_button.textContent = `입력`;
_form.append(sub_button);
var _boolean = document.createElement('div');
_body.append(_boolean);
var h1_boolean = document.createElement('h1');
_boolean.append(h1_boolean);
_input.focus();

var fault_count = 0;
_form.addEventListener('submit', function(_event){
    _event.preventDefault();
    var answer = _input.value;
    //console.log로 답볼수있게 해놓음 (괄호안에 ,로 여러 속성들 나열가능)
    console.log(`정답:${q_numbers.join('')}`, q_numbers.join('')===answer);
    //배열.join('') 하면 숫자배열은 문자가 된다.
    if (q_numbers.join('') === answer){
        result.textContent = `홈런~~!`;
        h1_boolean.textContent = `홈런~~!`;
        reset();
        _input.value = '';
        _input.focus();
        fault_count = 0;
    } else {
        var answer_arr = answer.split('');
        var strike = 0;
        var ball = 0;
        fault_count ++;
        if (fault_count >= 10){
            result.textContent = `You Lose!`;
            h1_boolean.textContent = `당신은 졌습니다. 정답 : ${q_numbers.join('')}`;
            fault_count = 0;
            reset();
            _input.value = '';
            _input.focus();
        } else {
            for (var i = 0; i < 4; i++){
                //q_numbers의 값들은 숫자여서 answer_arr의 값들을 문자에서 숫자로 바꾼다.
                if (q_numbers[i] === Number(answer_arr[i])){
                    strike ++;
                } else if (q_numbers.indexOf(Number(answer_arr[i])) > -1){
                    ball ++;
                }
            };
            result.textContent = `입력 숫자 : ${answer} / ${strike}스트라이크 ${ball}볼 / 
            틀린횟수 : ${fault_count}`;
            h1_boolean.textContent = ``;
            _input.value = '';
            _input.focus();
        }
    }
});