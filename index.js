function getRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let startSet = {
    makeCards: function () {
        return Array.from({ length: 20 });
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

function gameStart() {
    let cards = startSet.makeCards();
    cards = startSet.suffleCard(cards);
    startSet.assignNumberToCard(cards);
    document
        .getElementById("gameview")
        .addEventListener("click", function (event) {
            if (!wait && event.target.classList.contains("leftCard")) {
                cardClicked(event.target);
            }
        });
}

function cardClicked(target) {
    console.log(target.textContent);
    if (selectedCard[0] === null) {
        selectedCard[0] = target;
        target.classList.toggle("card_hidden");
    } else if (selectedCard[1] === null && target !== selectedCard[0]) {
        selectedCard[1] = target;
        target.classList.toggle("card_hidden");
        wait = true;
        setTimeout(() => {
            wait = false;
            checkSame(selectedCard[0], selectedCard[1]);
        }, 600);
    }
}

function checkSame(left, right) {
    if (left.textContent === right.textContent) {
        [left, right].forEach((i) => {
            i.classList.add("card_matched");
            i.textContent = "";
            i.classList.remove("leftCard");
        });
        matchEffect.correct([left, right]);
        console.log("correct");
    } else {
        console.log("wrong");
        left.classList.toggle("card_hidden");
        right.classList.toggle("card_hidden");
        matchEffect.wrong([left, right]);
    }
    selectedCard = [null, null];
    console.log(selectedCard);
}

let matchEffect = {
    correct: function (targets) {
        colorTransition(targets, "color_correct");
    },
    wrong: function (targets) {
        colorTransition(targets, "color_wrong");
    },
};

function colorTransition(targets, color) {
    targets.forEach((i) => {
        i.classList.toggle(color);
        
        requestAnimationFrame(() => {
            i.classList.add("card_transition");
            requestAnimationFrame(() => {
                i.classList.toggle(color);
            });
        });

        setTimeout(() => {
            i.classList.remove("card_transition");
        }, 250);
    });
}

gameStart();
let selectedCard = [null, null];
let wait = false;
