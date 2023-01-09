import * as player from "/scripts/player/player.js";

let map = document.querySelector(".map");
let menu = document.querySelector("menu");

var start = function(name){
    menu.classList.add("inactive");
    map.classList.add("run");
    player.spawn(name);
    console.log("Starting game with name: ", name);
};

window.requestAnimationFrame(gameLoop);
function gameLoop() {
    player.update();
    window.requestAnimationFrame(gameLoop);
}

export {start}