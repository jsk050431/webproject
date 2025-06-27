class CardFlipGame {
    constructor(boardSelector, pairCount = 10) {
        this.gameboard = document.querySelector(boardSelector);
        this.pairCount = pairCount;
        this.cards = [];
        this.isPreventingClick = false;
        this.selectedCard = [null, null];

        // this.cardClicked = this.cardClicked.bind(this);
        this.init();
    }

    init() {
        this.makeCards();
        this.shuffleCards();
        this.printCards();
        this.gameboard.addEventListener("click", (event) => {
            if (
                !this.isPreventingClick &&
                event.target.classList.contains("card_cursor")
            ) {
                this.cardClicked(event.target);
            }
        });
    }

    makeCards() {
        let arr = this.cards;
        for (let n = 1; n <= this.pairCount; n++) {
            arr.push(n, n);
        }
        console.log(arr);
    }

    shuffleCards() {
        let arr = this.cards;
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        console.log(arr);
    }

    printCards() {
        this.cards.forEach((num) => {
            let target = document.createElement("div");
            target.className = "card card_cursor card_hidden";
            target.textContent = num;
            console.log(target);
            this.gameboard.appendChild(target);
        });
    }

    cardClicked(target) {
        console.log(target.textContent);
        let selectedCard = this.selectedCard;
        const [first, second] = this.selectedCard;
        if (selectedCard[0] === null) {
            selectedCard[0] = target;
            target.classList.toggle("card_hidden");
        } else if (selectedCard[1] === null && target !== selectedCard[0]) {
            selectedCard[1] = target;
            target.classList.toggle("card_hidden");
            this.isPreventingClick = true;
            setTimeout(() => {
                this.isPreventingClick = false;
                this.checkSame(selectedCard[0], selectedCard[1]);
            }, 600);
        }
    }

    checkSame(left, right) {
        if (left.textContent === right.textContent) {
            [left, right].forEach((i) => {
                i.classList.add("card_matched");
                i.classList.remove("card_cursor");
                i.textContent = "";
            });
            this.colorTransition([left, right], "color_correct");
            console.log("correct");
        } else {
            console.log("wrong");
            [left, right].forEach((i) => {
                i.classList.add("card_hidden");
                i.classList.remove("card_cursor");
            });
            this.colorTransition([left, right], "color_wrong");
            setTimeout(() => {
                left.classList.add("card_cursor");
                right.classList.add("card_cursor");
            }, 100);
        }
        this.selectedCard = [null, null];
        console.log(this.selectedCard);
    }

    colorTransition(targets, color_class) {
        targets.forEach((i) => {
            i.classList.add(color_class);

            requestAnimationFrame(() => {
                i.classList.add("card_transition");
                requestAnimationFrame(() => {
                    i.classList.remove(color_class);
                });
            });

            setTimeout(() => {
                i.classList.remove("card_transition");
            }, 250);
        });
    }
}

let game = new CardFlipGame("#gameview");
