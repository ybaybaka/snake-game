document.addEventListener('DOMContentLoaded',()=>{
    let table = document.createElement('table'),
        playground = document.querySelector('.playground'),
        tRow = addRow(),
        tCell;

        tRow.forEach((el)=>{ // заполнить <table> десятью <tr> 
            tCell = addCell();

            tCell.forEach((eltd)=>{   //заполнить <tr> десятью <td>
                el.appendChild(eltd);
            });

            table.appendChild(el);
        });

        playground.appendChild(table); //добавить <table> в игровое поле

        let tableTd = document.querySelectorAll('td');

        let matrix = makeMatrixArr();

        let tableTdArr = Array.from(tableTd); //формируем массив из псевдомассива
        
        for (let out = 0; out < 10; out++) {   //извлекаем <td> из массива и заполняем матрицу
            for(let inn = 0; inn < 10; inn++) {
                matrix[out][inn] = tableTdArr.shift();
            }
        } 

        




        
    function addRow() {
        let arr = [];

        for (let i = 0; i < 10; i++) {
            arr.push(document.createElement('tr'));
        }

        return arr;
    } 
        
    function addCell() {
        let arr = [];
        for (let i = 0; i < 10; i++) {
            arr.push(document.createElement('td'));
        }
        return arr;
    }

    function makeMatrixArr() {
        let arr = [];

        for(let i = 0; i < 10; i++) {
            arr.push([]);
        }

        return arr;
    }
});