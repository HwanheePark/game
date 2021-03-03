var body = document.body;
var table = document.createElement('table');
var result = document.createElement('div');
var rows = [];
var cells = [];
var turn = 'X';

var async_callback = function(event){
    // console.log(event.target);
    // console.log(event.target.parentNode);

    var what_row = rows.indexOf(event.target.parentNode);
    console.log(`what row : `, what_row + 1);
    var what_cell = cells[what_row].indexOf(event.target);
    console.log(`what cell : `, what_cell + 1);

    if(cells[what_row][what_cell].textContent !== '') { //칸이 이미 채워져 있는지
        console.log(`빈칸이 아닙니다.`);
    } else {
        console.log(`빈칸입니다.`);
        cells[what_row][what_cell].textContent = turn;
        //세칸 다 채워졌나?
        var clear = false;
        //가로줄 검사
        if (
            cells[what_row][0].textContent === turn &&
            cells[what_row][1].textContent === turn &&
            cells[what_row][2].textContent === turn
        ) {clear = true;}
        //세로줄 검사
        if (
            cells[0][what_cell].textContent === turn &&
            cells[1][what_cell].textContent === turn &&
            cells[2][what_cell].textContent === turn
        ) {clear = true;}
        //대각선 검사
        if (what_row - what_cell === 0 || Math.abs(what_row - what_cell) === 2){
            if (
                cells[0][0].textContent === turn &&
                cells[1][1].textContent === turn &&
                cells[2][2].textContent === turn
            ) {clear = true;} 
            else if (
                cells[2][0].textContent === turn &&
                cells[1][1].textContent === turn &&
                cells[0][2].textContent === turn
            ) {clear = true;}
        }
        //다 찼으면
        if (clear){
            result.textContent = `${turn}님이 승리!`;
            turn = 'X';
            setTimeout(function () {
                result.textContent = ``;
                cells.forEach(function (element){
                    element.forEach(function (cell){
                        cell.textContent = ``;
                        result.textContent = ``;
                    })
                })
            }, 1500);
        } else {
            //다 안찼으면
            if (turn === 'X'){
                turn = 'O';
            } else {
                turn = 'X';
            }
        }
    }
};

for (var i = 0; i < 3; i += 1){
    var row = document.createElement('tr');
    rows.push(row);
    cells.push([]);
    for (var j = 0; j < 3; j += 1){
        var cell = document.createElement('td');
        cell.addEventListener('click', async_callback);
        cells[i].push(cell);
        //var cell을 선언하고 적용하는 과정은 한번만 가능하다.
        //td를 한개 더 만드려면 var cell을 또 다시 선언하고 적용해야한다.
        //두 번 적용하더라도 한번만 적용된다.
        row.appendChild(cell);
    }
    table.appendChild(row);
}
body.appendChild(table);
body.appendChild(result);
console.log(`rows : `, rows, `cells : `, cells);