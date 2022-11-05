/*
Il Gioco inizia da un popup di benvenuto che indica di selezionare la difficolà e il bottone play.
Funzione al bottone play:
    - Puliamo tutta la griglia (consigliato così da non avere griglie doppioni ad ogni click)
    - Aggiungiamo la classe "hidden" al popup
    - Rimuoviamo la classe "hidden" alla griglia

    - Definiamo il livello di dificoltà selezionato prendendone il valore così da ottenere il numero di celle
    - Definiamo la larghezza, nonchè l'altezza di ogni cella, andando a calcolare la radice quadrata del numero di celle
    - Inseriamo il valore ricavato prima per attribuirlo ad una variabile css che determina la width e la height
    
    -Creiamo un'array contenente 16 numeri random che rappresenteranno le bombe (anche tramite funzione)
        - utilizziamo una funzione di generazione di numeri random
        - questi numeri saranno inseriti dentro l'array solo se non sono doppioni PER 16 VOLTE
    
*/
const selectLevel = document.querySelector('#select-difficulty');
const playButton = document.querySelector('.header__playgame');
const gridElement = document.querySelector('.field__grid');
const popupElement = document.querySelector('.popup');
