let mapElem = document.querySelector(".map");
let mapBounds = mapElem.getBoundingClientRect();
console.log(mapBounds)

let lastFire = new Date();
var keys = {};
    keys.UP     = 38;
    keys.LEFT   = 37;
    keys.RIGHT  = 39;
    keys.DOWN   = 40;
    keys.SPACE  = 32;

let options = {
    position:{
        x:100,
        y:100
    },
    size:1,
    name:"Player",
    element:null,
    speedMultiplier:2,
    fireInterval:300,
    isAlive:true
};

var addListeners = function(){
    document.body.onkeyup = 
    document.body.onkeydown = function(e){
        if (e.preventDefault) { 
            e.preventDefault();
        }else {
            e.returnValue = false; 
        }
        var kc = e.keyCode || e.which;
        keys[kc] = e.type == 'keydown';
    };
};

var spawn = function(name){
    options.name = name;
    options.id = `player_${crypto.randomUUID()}`;
    mapElem.insertAdjacentHTML("beforeend",`
    <div class="player" id=${options.id}>
        <span class="player-name">${name}</span>
        <span class="player-body"></span>
        <span class="player-hp-wrap">
            <span class="player-hp" width="100%"></span>
        </span>
    </div>`);
    options.element = document.querySelector(`#${options.id}`);
    addListeners();
};

var moveCharacter = function(dx, dy){
    options.position.x += (dx||0) * options.speedMultiplier;
    options.position.y += (dy||0) * options.speedMultiplier;
    options.element.style.left = options.position.x + 'px';
    options.element.style.top = options.position.y + 'px';
};

var fire = function(){
    let now = new Date();
    if( now - lastFire >= options.fireInterval ){
        lastFire = now;
        console.log(`${options.name} firing!`);
    }
};

var checkKeys = function(){
    if ( keys[keys.LEFT] ) {
        moveCharacter(-1, 0);
    }
    if ( keys[keys.RIGHT] ) {
        moveCharacter(1, 0);
    }
    if ( keys[keys.UP] ) {
        moveCharacter(0, -1);
    }
    if ( keys[keys.DOWN] ) {
        moveCharacter(0, 1);
    }
    if( keys[keys.SPACE] ){
        fire();
    }
}

/*
*   Checking map collision.
*   Only checks for the player's body bounds and not the entire player element.
*/
var checkMapCollision = function(){
    if(!options.element){ return; }
    let playerBody = options.element.querySelector(".player-body");
    let playerBounds = playerBody.getBoundingClientRect();

    let isOut = false;
    // Player is outside of the map at the top
    if( playerBounds.y < mapBounds.y ){
        //console.log("top out");
        isOut = true;
        collisionDirections[keys.UP] = false;
    }
    // Player is outside of the map at left
    if( playerBounds.x < mapBounds.x ){
        //console.log("left out");
        isOut = true;
        collisionDirections[keys.LEFT] = false;
    }
    // Player is outside of the map at right
    if( playerBounds.x + playerBounds.width > mapBounds.x + mapBounds.width ){
        //console.log("right out");
        isOut = true;
        collisionDirections[keys.RIGHT] = false;
    }
    // Player is outside of the map at the bottom
    if( playerBounds.y + playerBounds.height > mapBounds.y + mapBounds.height ){
        //console.log("bottom out");
        isOut = true;
        collisionDirections[keys.DOWN] = false;
    }

    if(isOut){
        mapElem.classList.add("collision");
    }else{
        mapElem.classList.remove("collision");
    }
};

let lastPlayerUpdate = 0;
let throttleUpdate = false;
var update = function(){
    if( !options.isAlive ){ return; }
    checkKeys();
    checkMapCollision();
    if(throttleUpdate){
        let now = new Date();
        if( !(now - lastPlayerUpdate >= 2000) ){
            return;
        }
        lastPlayerUpdate = now;
    }
}

export {spawn,update}