/**
 * Created by abelghazinyan on 7/7/17.
 */
var random = [0];
var deleted=0;
var elem1=null,elem2=null;
var table;

function generateRandomNumber(){
    var x = Math.floor(Math.random()*25);
    if(random[x]===4) {
        while (true) {
            x = Math.floor(Math.random() * 25);
            if(random[x]!==4){
                break;
            }
        }
    }
    random[x]++;
    return x;
}

function endGame(){
    table.parentNode.removeChild(table);
    var div = document.createElement('div');
    document.getElementById('container').appendChild(div);
    div.style.margin = "auto auto";
    div.style.width = "480px";
    div.style.height = "100px";
    div.style.marginTop = "150px";
    var h1 = document.createElement('h1');
    h1.textContent = "You have found all pairs!"
    div.appendChild(h1);
    var button = document.createElement('button');
    button.textContent = "Play Again";
    div.appendChild(button);
    button.addEventListener('click',function () {
        div.parentNode.removeChild(div);
        for(i=0;i<25;i++){
            random[i]=0;
        }

        elem1 = null;
        elem2 = null;
        deleted = 0;
        setTimeout(createBoard,1000);
    });
}

function check() {
    if(elem1.getAttribute('id')===elem2.getAttribute('id')){
        deleted +=2;
        elem1.style.backgroundColor = "white";
        elem2.style.backgroundColor = "white";
        elem1.textContent = "";
        elem2.textContent = "";
        elem1.removeEventListener('click',click);
        elem2.removeEventListener('click',click);
        elem1.style.cursor="default";
        elem2.style.cursor="default";
        elem1 = null;
        elem2 = null;
    }
    else {
        elem1.style.backgroundColor = "dodgerblue";
        elem2.style.backgroundColor = "dodgerblue";

        elem1.textContent = "";
        elem2.textContent = "";
        elem1 = null;
        elem2 = null;

    }
    if(deleted === 2){
        endGame();
    }
}

function click(element) {
    if(elem1===null){
        elem1=element.target;
        elem1.style.backgroundColor = "orange";
        elem1.textContent = parseInt(elem1.getAttribute('id'))+1;
    }else if(elem1!=element.target){
        elem2=element.target;
        elem2.style.backgroundColor = "orange";
        elem2.textContent = parseInt(elem2.getAttribute('id'))+1;
        setTimeout(check,1000);
    }
}

function createBoard() {
    table = document.createElement('table');
    document.getElementById('container').appendChild(table);
    for(i=0;i<10;i++){
        var row = table.insertRow(i);
        for(j=0;j<10;j++){
            var cell = row.insertCell(j);
            var num = generateRandomNumber();
            //cell.textContent = num+1;
            cell.setAttribute('id',num+'');
            cell.addEventListener('click',click);
        }
    }
}

for(i=0;i<25;i++){
    random[i]=0;
}

createBoard();
