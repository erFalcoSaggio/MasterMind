let i = 0;
let r = 1;
let n = 1;
let r1 = 1;
let n1 = 1;

let sequence = randomSequence();
let userSequence = [];
console.log(sequence) // mosto un attimo la sequenza

// genero la sequenza randomicamente
function randomSequence() {
    let sequence = [];
    let colors = ['red', 'blue', 'green', 'yellow', 'orange', 'violet', 'white', 'black'];

    // genero 4 colori
    for (let i = 0; i < 4; i++) {
        let randomIndex = Math.floor(Math.random() * colors.length);
        sequence.push(colors[randomIndex]);
    }

    // console.log(sequence); => dg

    return sequence;
}

// avvio il gioco
function play() {
    let playBtn = document.getElementById('start-game-btn');
    let chooseCirclesDiv = document.getElementById('choose-circle');

    playBtn.style.display = 'none';
    chooseCirclesDiv.style.display = 'flex';
}

// prendo il colore del bottone
function choosed(color) {
    let ball = document.getElementById(`${r}-${n}`);
    console.log(`${r} ${n}`);

    if (i < 4 && r < 11) {
        console.log(color);
        i++;
        n++;
        ball.id = `${color}`; // assegno l'id del colore così mette background uguale
        userSequence.push(color);
        if (i === 4) {
            checkUserSequence(userSequence); // richiamo la sequenza appena raggionge i colori necessari
            r++; // aumento r
            // reimposto i valori
            i = 0;
            n = 1;
            userSequence = [];
        }
    }
}

function checkUserSequence(userSequence) {
    console.log(userSequence);
    let hintBtn = document.getElementById(`${r1}-${n1}-hint`)

    // controllo se esiste il colore nella sequenza generata
    for (let j = 0; j < userSequence.length; j++) {
        n1++;
        console.log(n1);
        if (sequence.indexOf(userSequence[j]) != -1) {
            // vuol dire che c'è
            console.log('c');
            hintBtn.id = 'white';
            
            // se uno è nella posizione esatta 
            if (userSequence[j] === sequence[j]) {
                console.log('uguale');
                hintBtn.id = 'black';
            }
        } else {
            console.log('nc');
        }
    }
}
