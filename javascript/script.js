/*
Il Gioco inizia da un popup di benvenuto che indica di selezionare la difficolà e il bottone play.
Funzione al bottone play:
    - Puliamo tutta la griglia (consigliato così da non avere griglie doppioni ad ogni click)
    - Aggiungiamo la classe "hidden" al popup
    - Rimuoviamo la classe "hidden" alla griglia

    - Definiamo il livello di dificoltà selezionato prendendone il valore così da ottenere il numero di celle
    - Definiamo la larghezza, nonchè l'altezza di ogni cella, andando a calcolare la radice quadrata del numero di celle
    - Inseriamo il valore ricavato prima per attribuirlo ad una variabile css che determina la width e la height
    
    -Creiamo un'arrayDiBombe contenente 16 numeri random che rappresenteranno le bombe (anche tramite funzione)
        - utilizziamo una funzione di generazione di numeri random
        - questi numeri saranno inseriti dentro l'array solo se non sono doppioni PER 16 VOLTE
    
    -Creiamo un FOR che itera per un numero di volte uguale alle celle (che variano in base alla difficoltà)
        - creiamo i div
        - aggiungiamo la classe .cell
        - ad ogni cella attribuiamo un numero con .innerHTML = i;
        - inseriamo le celle nella griglia
        - aggiungiamo un addEventListener ad ogni cella che ha funzione di:

            - SE arrayDiBombe include il numero stesso della cella .include(this.innerHTML) (quindi è una bomba)
                - Aggiungiamo la classe .bomb alle celle che ne corrispondono
                
                - disabilitiamo il click a tutte le celle con funzione che:
                    - selezioniamo tutte le classi .cell (così da effettuare un controllo su tutte)

                    - Apriamo un ciclo FOR che itera per il numero delle celle:
                        - prendiamo dentro una costante tutti i numeri delle celle
                            - SE si (cioè è vero) e arrayDiBombe include i numeri delle celle
                                - a tutte le celle corrispondenti aggiungiamo la classe .bomb
                            togliamo l'eventListener a tutti
            
            - ALTRIMENTI
                - andiamo avanti e rimuoviamo l'event listener dalla cella cliccata per evitare di accumulare punteggio
                - aumentiamo la variabile punteggio 
                -SE il punteggio è = al punteggio massimo consentito (.cell - .bomb)
                    - fine gioco, vittoria.
*/

const selectLevel = document.querySelector('#select-difficulty');
const playButton = document.querySelector('.header__playgame');
const gridElement = document.querySelector('.field__grid');
const popupElement = document.querySelector('.back__popup');

//funzione per creare dei numeri random
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min +1)) + min;
}

//funzione per creare un'array di numeri random che non siano uguali tra loro
function getMines(numberMines, min, max) {
    const randomArray = [];
    for (let i = 0; i < numberMines; i++){
        do {
            randomNum = getRandomInteger(min, max);
        } while (randomArray.includes(randomNum))
        randomArray.push(randomNum);
    }

    console.log(randomArray);
    return randomArray
}

//funzione di controllo che l'elemento cliccato sia una bomba
function stopGame(showMines) {
    const cellList = gridElement.querySelectorAll('.cell');

    for(let i = 0; i < cellList.length; i++) {
        const innerCell = parseInt(cellList[i].innerHTML);

        if (showMines && arrayBomb.includes(innerCell)) {
            cellList[i].classList.add('bomb');

            // console.log(cellList[i]);
        }

        cellList[i].removeEventListener('click', clickCell);
    }
}

function winGame() {
    gridElement.classList.add('hidden');
    popupElement.classList.remove('hidden');
    popupElement.innerHTML = '';
  
    popupElement.innerHTML = `
    <div class="popup">
        <h2>Complimenti, hai vinto!</h2>
        <p>Il tuo punteggio è di: ${score}</p>
    </div>`
}

function loseGame() {
    gridElement.classList.add('hidden');
    popupElement.classList.remove('hidden');
    popupElement.innerHTML = '';
  
    popupElement.innerHTML = `
    <div class="popup">
        <h2>Che sfortuna, hai perso!</h2>
        <p>Il tuo punteggio è di: ${score}</p>
        </div>`
}

//funzione di click di ogni cella 
function clickCell() {
    if (arrayBomb.includes(parseInt(this.innerHTML))) {
        this.classList.add('bomb');

        stopGame(true);
        setTimeout(loseGame, 1000);

    } else {
        this.removeEventListener('click', clickCell);
        this.classList.add('active');
        score++;

        console.log('punteggio:', score);

        if (score == maxScore) {
            setTimeout(winGame, 1000);
            stopGame(false);
        }
    }
}

let score;
let maxScore;
playButton.addEventListener('click', function() {
    score = 0;

    gridElement.innerHTML= '';
    gridElement.classList.remove('hidden');
    popupElement.classList.add('hidden');

    const numberCells = selectLevel.value;
    
    nMines = 16;
    maxScore = numberCells - nMines;

    const cellSize = Math.sqrt(numberCells);
    gridElement.style.setProperty('--sideSquare', cellSize);

    arrayBomb = getMines(16, 1, numberCells);

    for(let i = 1; i <= numberCells; i++) {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.innerHTML = [i];
        gridElement.append(cellElement);

        cellElement.addEventListener('click', clickCell);
    }
})