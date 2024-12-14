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

    // Raccolgo tutti i hint button per la riga corrente
    let hintBtns = [];
    for (let j = 0; j < 4; j++) {
        let hintBtn = document.getElementById(`${r1}-${n1 + j}-hint`);
        if (!hintBtn) {
            console.error(`Hint button ${r1}-${n1 + j}-hint not found`);
            return; // Esco dalla funzione se un bottone non è trovato
        }
        hintBtns.push(hintBtn);
    }

    let sequenceCopy = [...sequence];
    let userCopy = [...userSequence];

    // Prima passata: controllo esatti
    for (let j = 0; j < 4; j++) {
        if (userSequence[j] === sequence[j]) {
            hintBtns[j].id = 'black';
            sequenceCopy[j] = null;
            userCopy[j] = null;
        }
    }

    // Seconda passata: controllo presenti ma in posizione errata
    for (let j = 0; j < 4; j++) {
        if (userCopy[j] !== null) {
            let index = sequenceCopy.indexOf(userCopy[j]);
            if (index !== -1) {
                hintBtns[j].id = 'white';
                sequenceCopy[index] = null;
            }
        }
    }

    // Controllo vittoria: confronto diretto con le sequenze
    let isCorrect = true;
    for (let i = 0; i < 4; i++) {
        if (userSequence[i] !== sequence[i]) {
            isCorrect = false;
            break;
        }
    }

    if (isCorrect) {
        alert('Hai vinto!');
        return;
    }

    // Controllo sconfitta
    if (r1 === 10 && n1 === 37) { // Ultima riga (r1 === 10) e ultima colonna (n1 === 37, cioè 4 hint già verificati)
        alert(`Hai perso! La sequenza da indovinare era: ${sequence.join(", ")}`);
        return;
    }

    // Avanzo al prossimo set di hint
    n1 += 4;
}
