const selectLevel = document.querySelector('#select-difficulty');
const playButton = document.querySelector('.header__playgame');
const gridElement = document.querySelector('.field__grid');
const popupElement = document.querySelector('.popup');

playButton.addEventListener('click', function(){
    gridElement.replaceChildren();

    popupElement.classList.add('hidden');
    gridElement.classList.remove('hidden');

    //inserisco il il valore del livello di difficoltà all'interno di una variabile per stabilire le celle del campo.
    const numberCell = parseInt(selectLevel.value);
    //di questo valore ne faccio la radice quadrata in modo da avere il numero di celle per ogni riga e colonna
    const sideSquare = Math.sqrt(numberCell);
    //associo SideSquare ad una variabile all'interno del css in modo da cambiare dinamicamente le celle alla selezione di ogni difficoltà
    gridElement.style.setProperty('--sideSquare', sideSquare);

    for (let i = 1; i <= numberCell; i++) {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
    
        gridElement.append(cellElement);
        cellElement.append([i]);

        cellElement.addEventListener ('click', function() {
            this.classList.toggle('active');
        })
    }
})

