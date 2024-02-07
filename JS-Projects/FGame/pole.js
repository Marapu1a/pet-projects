import Card from './main.js';



function newGame (container, cardsCount) {
    let cardsNumberArray = [];
    let cardsArray = [];
    let firstCard = null;
    let secondCard = null;

    for (let i = 1; i <= cardsCount / 2; i++) {
        cardsNumberArray.push(i);
        cardsNumberArray.push(i);
    }
    cardsNumberArray = cardsNumberArray.sort(() => Math.random() - 0.5)

    for (const cardNumber of cardsNumberArray) {
        cardsArray.push(new Card(container, cardNumber, flip))
    }

    function flip (card) {
        if (firstCard !== null && secondCard !== null) {
            if(firstCard.number != secondCard.number) {
                firstCard.open = false
                secondCard.open = false
                firstCard = null
                secondCard = null
            }
        }

        if (firstCard == null) {
            firstCard = card
        } else { 
            if (secondCard == null) {
            secondCard = card
        }

        if (firstCard !== null && secondCard !== null) {
            if(firstCard.number == secondCard.number) {
                firstCard.success = true
                secondCard.success = true
                firstCard = null
                secondCard = null
            }
        }
    }

    if (document.querySelectorAll('.card.success').length == cardsNumberArray.length) {
        alert('Победа!')
        window.location.reload()
    }
    }
}

let form = document.querySelector('.form')
let cards_count = document.querySelector('.cards_count')

form.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();

    this.style.display = "none";
    newGame(document.getElementById('game'), cards_count.value)
    timerId = setTimeout(() => {
        alert('Время игры закончилось');
        window.location.reload();
      }, 6000);
})