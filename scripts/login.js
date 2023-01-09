import * as game from "/scripts/game.js"

let nicknameEl = document.querySelector("#nickname");
let form = document.querySelector(".login");
let startButton = document.querySelector(".startBtn");

form.addEventListener('submit', function(e){
    e.preventDefault();
    let nickname = nicknameEl.value;
    if(!nickname){ return; }
    game.start(nickname);
}, false);

nicknameEl.addEventListener('input', function(){
    let num = nicknameEl.value.length;
    if(num >= 3){
        startButton.classList.add("visible");
    }else{
        startButton.classList.add("notVisible");
        setTimeout(() => {
            startButton.classList.remove("visible");
            startButton.classList.remove("notVisible");
        }, 300);
    }
}, false);