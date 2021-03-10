var tbody = document.querySelector('#tbody');
var result = document.querySelector('#result');
var execution = document.querySelector('#execution');

document.querySelector('#execution').addEventListener('click', function() {
    tbody.innerHTML = ``;
    dataset = [];
    result.textContent = ``;
    stop_flag = false;
    open_count = 0;
    
    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);
    
    var cell_array = Array(hor * ver)
        .fill()
        .map(function (element, index) {
            return index;
        });
    var mine_location = [];
    while (mine > 0) {
        var select = cell_array.splice(Math.floor(Math.random() * cell_array.length), 1)[0];
        mine_location.push(select);
        mine -= 1;
    }
    mine = parseInt(document.querySelector('#mine').value);
    
    for (var i = 0; i < hor; i++) {
        var tr = document.createElement('tr');
        var arr = [];
        dataset.push(arr);
        for (var j = 0; j < ver; j++) {
            var td = document.createElement('td');
            arr.push(0);
            td.addEventListener('contextmenu', function (event) {
                event.preventDefault();
                if (stop_flag) {
                    return;
                }
                var index_hor = Array.prototype.indexOf.call(tbody.children, this.parentNode);
                var index_ver = Array.prototype.indexOf.call(this.parentNode.children, this);
                if (dataset[index_hor][index_ver] === 1) {
                    return;
                } else if ([``, `X`].includes(this.textContent)) {
                    this.textContent = `!`;
                    this.classList.add(`exclamation_mark`);
                } else if (this.textContent === `!`) {
                    this.textContent = `?`;
                    this.classList.remove(`exclamation_mark`);
                    this.classList.add(`question_mark`);
                } else if (this.textContent === `?`) {
                    this.classList.remove(`question_mark`);
                    if (dataset[index_hor][index_ver] === `X`) {
                        this.textContent = `X`;
                    } else {
                        this.textContent = ``;
                    }
                }
            });
            td.addEventListener('click', function (event) {
                if (stop_flag) {
                    return;
                }
                var index_hor = Array.prototype.indexOf.call(tbody.children, this.parentNode);
                var index_ver = Array.prototype.indexOf.call(this.parentNode.children, this);
                console.log(index_hor, index_ver);
                if (dataset[index_hor][index_ver] === 1) {
                    return;
                }
                if ([`!`, `?`].includes(this.textContent)) {
                    return;
                }
                open_count++;
                this.classList.add(`opened`);
                if (dataset[index_hor][index_ver] === `X`) {
                    this.textContent = `펑`;
                    this.classList.remove(`opened`);
                    this.classList.add(`mine`);
                    result.textContent = `You failed.`;
                    stop_flag = true;
                } else {
                    dataset[index_hor][index_ver] = 1;
                    var surroundings = [
                        dataset[index_hor][index_ver-1],
                        dataset[index_hor][index_ver+1]
                    ]
                    if (dataset[index_hor-1]) {
                        surroundings = surroundings.concat(
                            dataset[index_hor-1][index_ver-1],
                            dataset[index_hor-1][index_ver],
                            dataset[index_hor-1][index_ver+1]
                            );
                    }
                    if (dataset[index_hor+1]) {
                        surroundings = surroundings.concat(
                            dataset[index_hor+1][index_ver-1],
                            dataset[index_hor+1][index_ver],
                            dataset[index_hor+1][index_ver+1]
                            );
                    }
                    var surrounding_mines = surroundings.filter(function (v) {
                        return v === `X`;
                    }).length;
                    this.textContent = surrounding_mines || ``;

                    if (surrounding_mines === 0) {
                        var surrounding_cell = [
                            tbody.children[index_hor].children[index_ver-1],
                            tbody.children[index_hor].children[index_ver+1]
                        ];
                        if (tbody.children[index_hor-1]) {
                            surrounding_cell.push(
                                tbody.children[index_hor-1].children[index_ver-1],
                                tbody.children[index_hor-1].children[index_ver],
                                tbody.children[index_hor-1].children[index_ver+1]
                            )
                        }
                        if (tbody.children[index_hor+1]) {
                            surrounding_cell.push(
                                tbody.children[index_hor+1].children[index_ver-1],
                                tbody.children[index_hor+1].children[index_ver],
                                tbody.children[index_hor+1].children[index_ver+1]
                            )
                        }
                        surrounding_cell.filter(function (v) {return !!v})
                            .forEach(function (sidecell) {
                                var sidecell_tr = sidecell.parentNode;
                                var index_sidecell_hor = Array.prototype.indexOf.call(tbody.children, sidecell_tr);
                                var index_sidecell_ver = Array.prototype.indexOf.call(sidecell_tr.children, sidecell);
                                if (dataset[index_sidecell_hor][index_sidecell_ver] !== 1) {
                                    sidecell.click();
                                }
                            });
                    }
                }
                if (open_count >= hor * ver - mine) {
                    stop_flag = true;
                    result.textContent = `Misstion Complete!`;
                }
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    for (var k = 0; k < mine; k++) {
        var mine_hor = Math.floor(mine_location[k] / ver);
        var mine_ver = mine_location[k] % ver;
        tbody.children[mine_hor].children[mine_ver].textContent = `X`;
        dataset[mine_hor][mine_ver] = `X`;
    }
    console.log(dataset);
});
execution.click();