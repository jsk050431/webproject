let card = Array.from({ length: 20 });

function getRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

for (let i = 1; i <= 10; i++) {
    for (let j = 0; j < 2; j++) {
        let index;
        do {
            index = getRand(0, 19);
        } while (card[index] !== undefined);
        card[index] = i;
    }
}

let index = 0;
Array.from(document.getElementById("gameview").children).forEach((target) => {
    Array.from(target.children).forEach((child) => {
        child.textContent = card[index];
        index++;
    });
});
