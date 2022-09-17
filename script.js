document.addEventListener('DOMContentLoaded', () => {
    init();
})


function init() {
    const startBtn = document.getElementById('startBtn');
    startBtn.addEventListener('click', startGame);

    if(localStorage.getItem('rodadaLS') != null){
        let listItens = document.getElementById('listItens');
        let roundListLS = localStorage.getItem('roundsLS');
        listItens.innerHTML = roundListLS.replaceAll(',', "");
    }

    let scoringSymbols = document.querySelectorAll('.scoringSymbols');
    for (let symbols of scoringSymbols) {
        symbols.addEventListener('click', changeScore);
    }

    document.getElementById('buttonFinish').addEventListener('click', finishRound);

    document.getElementById('menuIcon').addEventListener('click', openRoundScreen);

    document.getElementById('restartScore').addEventListener('click', ()=>{
        localStorage.clear();
        init();
        document.getElementById('listItens').innerHTML = '';
    });


}


function startGame() {

    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('setMarker').style.display = 'flex';
    let number = document.querySelectorAll('.number');
    for (let i = 0; i < number.length; i++) {
        number[i].addEventListener('click', howManyPlay);
    }
}

function howManyPlay(numbers) {
    let number = numbers.target.dataset.number;
    document.getElementsByClassName('containerOfPlayers')[0].style.display = 'flex';
    document.getElementsByClassName('buttonArea')[0].style.display = 'block';

    let playerDisplay = document.querySelectorAll('.playerDisplay');
    let playerName = document.querySelectorAll('.playerName');
    let points = document.querySelectorAll('.points');
    for (let currentNumber = 0; currentNumber < number; currentNumber++) {
        playerDisplay[currentNumber].style.display = 'block';
        playerName[currentNumber].dataset.onGame = false;
        points[currentNumber].dataset.onGame = false;

        for (let notCurrentNumber = number; notCurrentNumber < 6; notCurrentNumber++) {
            playerDisplay[notCurrentNumber].style.display = 'none';
            playerName[currentNumber].dataset.onGame = true;
            points[currentNumber].dataset.onGame = true;
        }
    }

    document.getElementById('buttonPlay').addEventListener('click', () => {

        document.getElementById('setMarker').style.display = 'none';
        document.getElementsByClassName('containerOfPlayers')[0].style.display = 'none';
        document.getElementsByClassName('buttonArea')[0].style.display = 'none';
        document.getElementsByClassName('buttonArea')[1].style.display = 'block';
        document.getElementById('menuIcon').style.display = 'block';

        for (let currentNumber = 0; currentNumber < number; currentNumber++) {
            document.querySelectorAll('.playerMarker')[currentNumber].style.display = 'block';
            document.getElementsByClassName('containerOfPlayers')[1].style.display = 'flex';

            for (let notCurrentNumber = number; notCurrentNumber < 6; notCurrentNumber++) {
                document.querySelectorAll('.playerMarker')[notCurrentNumber].style.display = 'none';
            }
        }

        setNamePlayers();
    });
}

function setNamePlayers() {
    let inpName = document.querySelectorAll('.inpName');
    let playerName = document.querySelectorAll('.playerName');
    for (let i = 0; i < inpName.length; i++) {
        if (inpName[i].value == '') {
            playerName[i].innerText = `Player ${[i + 1]}`
        } else {
            playerName[i].innerText = inpName[i].value;
        }
    }
}

function changeScore() {
    let playerScoreToChange = event.target.innerText;
    let score = event.composedPath()[2].children[1];
    score.innerText = parseInt(score.innerText) + parseInt(playerScoreToChange);
}

function finishRound() {
    if (localStorage.getItem('rodadaLS') == null) {
        localStorage.setItem('rodadaLS', "1");
    }else{
    let listItens = document.getElementById('listItens');
    let roundListLS = localStorage.getItem('roundsLS');
    listItens.innerHTML = roundListLS.replaceAll(',', "");
    }

    let playerName = document.querySelectorAll('.playerName');
    let points = document.querySelectorAll('.points');

    let roundListArray = [];

    let numero = parseInt(localStorage.getItem('rodadaLS'));

    let rodada = `<span>Rodada ${numero++}</span>`;
    localStorage.setItem('rodadaLS', numero);

    roundListArray.push(rodada);

    let roundListLS = localStorage.getItem('roundsLS');
    for (let i = 0; i < 6; i++) {
        if (playerName[i].dataset.onGame && points[i].dataset.onGame) {
            names = playerName[i].innerText;
            point = points[i].innerText;

            let li = `<li>${names} fez ${point} pontos</li>`;
            roundListArray.push(li);

            if (roundListLS != null) {
                let updateList = roundListLS + roundListArray;
                localStorage.setItem('roundsLS', updateList);
            } else {
                localStorage.setItem('roundsLS', roundListArray);
            }
        }
        points[i].innerText = 0;
    }


    updateListRound();
}

function updateListRound() {
    let listItens = document.getElementById('listItens');
    let roundListLS = localStorage.getItem('roundsLS').replaceAll(',', "");
    listItens.innerHTML = roundListLS;
}

function openRoundScreen() {
    let menuIcon = document.getElementById('menuIcon');
    let roundScreen = document.getElementById('roundScreen');
    menuIcon.style.display = 'none';
    roundScreen.style.display = 'block';

    document.getElementById('closeIcon').addEventListener('click',()=>{
        roundScreen.style.display = 'none';
        menuIcon.style.display = 'block';
    })
}