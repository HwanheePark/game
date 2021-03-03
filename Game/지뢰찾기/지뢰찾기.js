var table = document.querySelector('#table');
var tbody = document.querySelector('#table tbody');
var result = document.querySelector('#result');
var stop_flag = false;
var dataset = []; //Two-dimensional array
var open = 0;

document.querySelector('#execution').addEventListener('click', function(){
    tbody.innerHTML = ``; //tbody안의 내용을 제거
    dataset = [];
    result.textContent = ``;
    stop_flag = false;
    open = 0;
    //parseInt() : 문자열을 정수로 바꾸는 함수 //'value'(문자) -> value(정수)
    var row = parseInt(document.querySelector('#row').value);
    var column = parseInt(document.querySelector('#column').value);
    var mine = parseInt(document.querySelector('#mine').value);
    console.log(row, column, mine);

    var cell_array = Array(row * column) //지뢰 위치 뽑기
        .fill()
        .map(function (element, index) {
            return index;
        });
    console.log(cell_array);
    var mine_locate = [];
    while (mine > 0) {
        var select = cell_array.splice(Math.floor(Math.random() * cell_array.length), 1)[0];
        mine_locate.push(select);
        mine -= 1;
    } //이와 같은 알고리즘을 피셔예이츠 셔플이라한다.
    console.log(mine_locate);
    //입력한 양의 table만들기
    for (var i = 0; i < row; i += 1) {
        var tr = document.createElement('tr');
        var arr = [];
        dataset.push(arr);
        for (var j = 0; j < column; j += 1) {
            var td = document.createElement('td');
            arr.push(0);
            //느낌표 이벤트
            td.addEventListener('contextmenu', function (event) { //contextmenu는 우클릭
                event.preventDefault();
                if (stop_flag) {
                    return; //return을 하면 함수가 끝나기 때문에 함수의 실행을 중간에 끊을 수 있다.
                }
                var target_td = event.currentTarget;
                var target_tr = event.currentTarget.parentNode;
                var target_tbody = event.currentTarget.parentNode.parentNode;
                var index_row = Array.prototype.indexOf.call(target_tbody.children, target_tr);
                var index_cell = Array.prototype.indexOf.call(target_tr.children, target_td);
                //배열이 아닌것에 indexOf를 강제로 적용하려면
                //Array.prototype.indexOf.call(indexOf전까지 원래코드, 적용대상)를 이용할 수 있다.
                //클로저 문제로 td대신 event.currentTarget입력
                if(dataset[index_row][index_cell] === 1) {
                    return;
                } else if (target_td.textContent === `` || target_td.textContent === `X`) {
                    target_td.textContent = `!`;
                    target_td.classList.add('exclamation_mark');
                } else if (target_td.textContent === '!') {
                    target_td.textContent = `?`;
                    target_td.classList.remove('exclamation_mark');
                    target_td.classList.add('question_mark');
                } else if (target_td.textContent === `?`) {
                    target_td.classList.remove('question_mark');
                    if (dataset[index_row][index_cell] === 0) {
                        target_td.textContent = ``;
                    } else {
                        target_td.textContent = `X`;
                    }
                } 
            });
            td.addEventListener('click', function (event) {
                if (stop_flag) {
                    return; //return을 하면 함수가 끝나기 때문에 함수의 실행을 중간에 끊을 수 있다.
                }
                var target_td = event.currentTarget;
                var target_tr = target_td.parentNode;
                var target_tbody = target_tr.parentNode;
                var index_row = Array.prototype.indexOf.call(target_tbody.children, target_tr);
                var index_cell = Array.prototype.indexOf.call(target_tr.children, target_td);
                if (dataset[index_row][index_cell] === 1) {
                    return;
                }
                if (target_td.textContent === '!' || target_td.textContent === '?') {
                    return;
                }
                target_td.classList.add('opened');
                open += 1;
                if (dataset[index_row][index_cell] === 'X') {
                    target_td.textContent = `펑`;
                    target_td.classList.add('mine');
                    result.textContent = `You failed.`;
                    stop_flag = true;
                } else {
                    dataset[index_row][index_cell] = 1;
                    var surroundings = [
                        dataset[index_row][index_cell-1], dataset[index_row][index_cell+1]
                    ]
                    if (dataset[index_row-1]) {
                        surroundings = surroundings.concat(
                        dataset[index_row-1][index_cell-1], dataset[index_row-1][index_cell], dataset[index_row-1][index_cell+1]);
                    }
                    if (dataset[index_row+1]) {
                        surroundings = surroundings.concat(
                        dataset[index_row+1][index_cell-1], dataset[index_row+1][index_cell], dataset[index_row+1][index_cell+1]);
                    }
                    var surrounding_mines = surroundings.filter(function(v) {
                        return v === 'X';
                    }).length; //filter()에서 return값은 배열로 나온다. ex)['X','X','X','X']
                    target_td.textContent = surrounding_mines || ``;
                    // ||은 거짓인 값이 나올 경우 뒤의 값을 쓴다. 알아두면 편리하다.
                    //거짓인 값 : '', 0, NaN, null, undefined, false

                    //주변 8칸 동시 오픈 (재귀함수)
                    if (surrounding_mines === 0) {
                        // tbody.children[index_row].children[index_cell-1].click();
                        var surrounding_cell = [];
                        if (tbody.children[index_row-1]) {
                            surrounding_cell = surrounding_cell.concat([
                                tbody.children[index_row-1].children[index_cell-1],
                                tbody.children[index_row-1].children[index_cell],
                                tbody.children[index_row-1].children[index_cell+1],
                            ]);
                        }
                        surrounding_cell = surrounding_cell.concat([
                            tbody.children[index_row].children[index_cell-1],
                            tbody.children[index_row].children[index_cell+1],
                        ]);
                        if (tbody.children[index_row+1]) {
                            surrounding_cell = surrounding_cell.concat([
                                tbody.children[index_row+1].children[index_cell-1],
                                tbody.children[index_row+1].children[index_cell],
                                tbody.children[index_row+1].children[index_cell+1],
                            ]);
                        }
                        surrounding_cell.filter(function (v) { return !!v; })
                            .forEach(function(side_cell){
                            //filter(function (v) {return !!v})는 empty, null, undefined같은 정의되지
                            //않은 것들을 없애고 return해준다. (불리언 형 변환)
                            var target_tr = side_cell.parentNode;
                            var target_tbody = target_tr.parentNode;
                            var index_row = Array.prototype.indexOf.call(target_tbody.children, target_tr);
                            var cellindex_cell = Array.prototype.indexOf.call(target_tr.children, side_cell);
                            if (dataset[index_row][cellindex_cell] !== 1) {
                                side_cell.click();
                            }
                        });
                    }
                }
                console.log(open, row * column - mine_locate.length);
                if (open === row * column - mine_locate.length) {
                    stop_flag = true;
                    result.textContent = `Mission Complete!`;
                }
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    console.log(dataset);

    //마인심기
    for (var k = 0; k < mine_locate.length; k++) {
        var mine_row = Math.floor(mine_locate[k] / column); 
        var mine_column = mine_locate[k] % column; // %는 뒤의 숫자로 나눈 뒤 나머지값을 리턴한다.
        // tbody.children[mine_row].children[mine_column].textContent = 'X';
        dataset[mine_row][mine_column] = 'X';
    }
    console.log(dataset);
});