function getRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let startSet = {
    makeCards: function (cardNum) {
        return Array.from({ length: cardNum });
    },
    suffleCard: function (cardArr) {
        for (let i = 1; i <= 10; i++) {
            for (let j = 0; j < 2; j++) {
                let index;
                do {
                    index = getRand(0, 19);
                } while (cardArr[index] !== undefined);
                cardArr[index] = i;
            }
        }
        return cardArr;
    },
    assignNumberToCard: function (cardArr) {
        let index = 0;
        Array.from(document.getElementById("gameview").children).forEach(
            (target) => {
                Array.from(target.children).forEach((child) => {
                    child.textContent = cardArr[index];
                    index++;
                });
            }
        );
    },
};

function gameStart(cardNum) {
    let cards = startSet.makeCards(cardNum);
    cards = startSet.suffleCard(cards);
    startSet.assignNumberToCard(cards);
}

gameStart(20);
