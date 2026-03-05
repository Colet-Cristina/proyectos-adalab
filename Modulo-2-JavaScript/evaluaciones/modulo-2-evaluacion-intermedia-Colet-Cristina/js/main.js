"use strict";

// SECCIÓN QUERY SELECTOR //


const playBtn = document.querySelector(".js_playBtn");
const movePlayerSelect = document.querySelector(".js_movePlayerSelect");
const resultBox = document.querySelector(".js_resultBox");

const playerResult = document.querySelector(".js_playerResult");
const computerResult = document.querySelector(".js_computerResult")


// SECCIÓN FUNCIONES //
/*function getRandomNumber(max) {
    return 1 + parseInt(Math.random() * max);
}*/



// SECCIÓN EVENTOS //
playBtn.addEventListener("click", (ev) => {
    ev.preventDefault(); // que no recarge

    //valor select
    const movePlayer = movePlayerSelect.value

    //jugada com
    const moveComp = "papel";

    //comparar dos jugadas
    let winner;

    if (movePlayer === moveComp) {
        winner = "empate"
    }

    else if (
        (movePlayer === "tijeras" && moveComp === "papel") ||
        (movePlayer === "papel" && moveComp === "piedra") ||
        (movePlayer === "piedra" && moveComp === "tijeras")
    ) {
        winner = "jugadora";
    } else if (
        (movePlayer === "tijeras" && moveComp === "papel") ||
        (movePlayer === "papel" && moveComp === "piedra") ||
        (movePlayer === "piedra" && moveComp === "tijeras")
    ) {
        winner = "compu"
    }
    //mostrar quien gana
    if (winner === 'jugadora') {
        resultBox.innerHTML = '¡Has ganado!';
    }
    else if (winner === 'compu') {
        resultBox.innerHTML = '¡Has perdido!';
    }
    else {
        resultBox.innerHTML = '¡Empate!';
    }
});
