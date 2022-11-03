const selectLevel = document.querySelector('#select-difficulty');
const playButton = document.querySelector('.header__playgame');
const gridElement = document.querySelector('.field__grid');
const popupElement = document.querySelector('.popup');

playButton.addEventListener('click', function(){
    gridElement.replaceChildren();

    popupElement.classList.add('hidden');
    gridElement.classList.remove('hidden');

    const numberCell = parseInt(selectLevel.value);
    const sideSquare = Math.sqrt(numberCell);
    gridElement.style.setProperty('--sideSquare', sideSquare);


    const myArray = [];
    for (let i = 1; i <= 16; i++) {
        let randomNum;
        do {
            randomNum = randomNumber(1, 16);
        } while (myArray.includes(randomNum)){
            myArray.push(randomNum);
        }
    }
    
    // var prova = myArray.slice();
    // console.log(prova);

    for (let i = 1; i <= numberCell; i++) {


        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
    
        gridElement.append(cellElement);
        cellElement.append([i]);

        cellElement.addEventListener ('click', function() {
            this.classList.toggle('active');
        })
    }
    console.log(myArray);

    function randomNumber (min, max) {
        return Math.floor(Math.random() * (numberCell - 16 + 1)) + 16;
    }


})
