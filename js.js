"use strict";

document.addEventListener('DOMContentLoaded', () => {

    let table = document.createElement('table'),
        playground = document.querySelector('.playground'),
        numForSquare = 20,
        tRow = addRow(numForSquare),
        tCell,
        [up, right, down, left, start, restart] = document.querySelectorAll('button'),
        gameState,
        currentMove = moveRight;

    const BODY = 'snakeBody',
        HEAD = 'snakeHead',
        FOOD = 'food';

    tRow.forEach((el) => { // заполнить <table> десятью <tr> 
        tCell = addCell(numForSquare);

        tCell.forEach((eltd) => { //заполнить <tr> десятью <td>
            el.appendChild(eltd);
        });

        table.appendChild(el);
    });

    playground.appendChild(table); //добавить <table> в игровое поле

    let tableTd = document.querySelectorAll('td'),
        matrix = makeMatrixArr(numForSquare),
        tableTdArr = Array.from(tableTd);


    // извлекаем <td> из массива и заполняем матрицу
    for (let out = 0; out < numForSquare; out++) {
        for (let inn = 0; inn < numForSquare; inn++) {
            matrix[out][inn] = tableTdArr.shift();
        }
    }

    const maxRow = matrix.length,
        maxCell = matrix[0].length;

    let currentPosition = pointSnake(Math.round(maxRow / 2), Math.round(maxCell / 2));

    start.addEventListener('click', () => {
        gameState = setInterval(() => {

            if (currentPosition.nextEl.classList.contains(FOOD)) {

                currentPosition.nextEl.classList.remove(FOOD);

                currentPosition.body.push(currentPosition.nextEl);

                pointFood();
            }

            currentPosition = currentMove(currentPosition);

        }, 300);
        pointFood();
    });

    restart.addEventListener('click', () => {

        tableTd.forEach(el => {
            el.classList.remove(BODY, HEAD);
        });

        clearInterval(gameState);
        currentPosition = pointSnake(Math.round(maxRow / 2), Math.round(maxCell / 2));
        currentMove = moveRight;
    });

    up.addEventListener('click', () => {

        if (currentMove != moveDown) {
            currentMove = moveUp;
        }
    });

    right.addEventListener('click', () => {
        if (currentMove != moveLeft) {
            currentMove = moveRight;
        }
    });

    down.addEventListener('click', () => {

        if (currentMove != moveUp) {
            currentMove = moveDown;
        }
    });

    left.addEventListener('click', () => {
        if (currentMove != moveRight) {
            currentMove = moveLeft;
        }
    });


    // движения

    function moveLeft(current) {
        let refresh = Object.assign({}, current);

        if (refresh.cellI < 1) {
            refresh.cellI = maxCell;
        }

        refresh.body.push(refresh.head);
        refresh.body[0].classList.remove(BODY);

        refresh.body.shift();

        refresh.body.forEach(el => {
            el.classList.add(BODY);
            el.classList.remove(HEAD);
        });

        refresh.nextEl = matrix[refresh.rowI][refresh.cellI - 1];

        refresh.head = refresh.nextEl;
        refresh.head.classList.add(HEAD);

        refresh.cellI--;

        return refresh;
    }

    function moveDown(current) {
        let refresh = Object.assign({}, current);

        if (refresh.rowI > maxRow - 2) {
            refresh.rowI = -1;
        }

        refresh.body.push(refresh.head);
        refresh.body[0].classList.remove(BODY);

        refresh.body.shift();

        refresh.body.forEach(el => {
            el.classList.add(BODY);
            el.classList.remove(HEAD);
        });

        refresh.nextEl = matrix[refresh.rowI + 1][refresh.cellI];

        refresh.head = refresh.nextEl;
        refresh.head.classList.add(HEAD);

        refresh.rowI++;

        return refresh;
    }

    function moveUp(current) {
        let refresh = Object.assign({}, current);



        if (refresh.rowI < 1) {
            refresh.rowI = maxRow;
        }

        refresh.body.push(refresh.head);
        refresh.body[0].classList.remove(BODY);

        refresh.body.shift();

        refresh.body.forEach(el => {
            el.classList.add(BODY);
            el.classList.remove(HEAD);
        });

        refresh.nextEl = matrix[refresh.rowI - 1][refresh.cellI];

        refresh.head = refresh.nextEl;
        refresh.head.classList.add(HEAD);


        refresh.rowI--;

        return refresh;
    }

    function moveRight(current) {
        let refresh = Object.assign({}, current);

        if (refresh.cellI > (maxCell - 2)) {
            refresh.cellI = -1;
        }

        refresh.body.push(refresh.head);
        refresh.body[0].classList.remove(BODY);

        refresh.body.shift();

        refresh.body.forEach(el => {
            el.classList.add(BODY);
            el.classList.remove(HEAD);
        });

        refresh.nextEl = matrix[refresh.rowI][refresh.cellI + 1];

        refresh.head = refresh.nextEl;
        refresh.head.classList.add(HEAD);

        refresh.cellI++;

        return refresh;
    }


    // нарисовать змейку
    function pointSnake(row = 5, cell = 5) {

        cell = (cell < 2) ? 2 :
            (cell > maxCell) ? maxCell - 2 :
            cell;

        row = (row < 0) ? 0 :
            (row > maxRow) ? maxRow - 1 :
            row;

        let current = {
            rowI: row,
            cellI: cell,
            nextEl: matrix[row][cell + 1],
            head: matrix[row][cell],
            body: [],
        };

        current.body.push(
            matrix[row][cell - 4], //удалить

            matrix[row][cell - 3], // удалить

            matrix[row][cell - 2],
            matrix[row][cell - 1],
        );

        current.body.forEach(el => el.classList.add(BODY));
        current.head.classList.add(HEAD);



        return current;
    }

    // создает n строк
    function addRow(numOfRows = 10) {
        let arr = [];

        for (let i = 0; i < numOfRows; i++) {
            arr.push(document.createElement('tr'));
        }

        return arr;
    }
    // создает n ячеек
    function addCell(numOfCells = 10) {
        let arr = [];
        for (let i = 0; i < numOfCells; i++) {
            arr.push(document.createElement('td'));
        }
        return arr;
    }
    // пустая матрица, стандартный размер = 10
    function makeMatrixArr(innerArrs = 10) {
        let arr = [];

        for (let i = 0; i < innerArrs; i++) {
            arr.push([]);
        }

        return arr;
    }


    function pointFood() {
        let row = Math.ceil(Math.random() * (maxRow - 1));
        let cell = Math.ceil(Math.random() * (maxCell - 1));

        if (matrix[row][cell].classList.contains(BODY) ||
            matrix[row][cell].classList.contains(HEAD)
        ) {
            return pointFood();
        }

        matrix[row][cell].classList.add('food');
    }
});