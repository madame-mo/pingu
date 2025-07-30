//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject;
let youWon
var score = 0;
var gameActive = true
var winStreak = 0


// images 
let backgroundImg;

let catcherImg;
let catcherGetImg;
let catcherLoseImg;

let fallingObjectImg;

let youWonImg;
let youLoseImg;

let catcherG;
let catcherL;

// time 
let imgStart = 0;
let pinguChange = false;
let imgShowT = 500;

/* PRELOAD LOADS FILES */
function preload(){
  
  fallingObjectImg = loadImage("assets/fish.PNG");
  catcherImg = loadImage("assets/pinguwalk.PNG");
  
  youWonImg = loadImage("assets/pinguwon.JPG");
  youLoseImg = loadImage("assets/pingulose.PNG");
  
  catcherGetImg = loadImage("assets/pinguyay.PNG");
  catcherLoseImg = loadImage("assets/pingumiss.PNG");

  catcherG = catcherGetImg;
  catcherL = catcherLoseImg;
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);

  
  catcherImg.resize(250,0);
  fallingObjectImg.resize(90,0);
  youWonImg.resize(100,0);
  youLoseImg.resize(150,0);
  catcherG.resize(200,0);
  catcherL.resize(150,0);
  

  youWon = new Sprite(youWonImg, -200, -200);
  youLose = new Sprite(youLoseImg, -200, -200);

  //Create catcher 
  catcher = new Sprite(catcherImg, 200,380,100,20);
  catcher.color = color(95,158,160);
  catcher.collider = "k";
  
  //Create falling object
  fallingObject = new Sprite(fallingObjectImg, 100,0,10);
  fallingObject.color = color(0,128,128);
  fallingObject.vel.y = random(1,5);
  fallingObject.rotationLock = true;

}

/* DRAW LOOP REPEATS */
function draw() {
  background(224,224,224);

  
  // control buttons
  if (kb.pressing("left")){
    catcher.vel.x = -3;
  } else if (kb.pressing("right")){
    catcher.vel.x = 3;
  } else {
    catcher.vel.x = 0;
  }

  
// win or lose 
  
  if (score < 0) {
    loseScreen();
    restart(); 
    gamePlay();
    
  } else if(score >= 15){
    winScreen();
    restart();
    gamePlay();
  }

  // restart score !!
  
  if (kb.pressing("R")){
    score = 0;
  }

  // run stuff :P
  gamePlay();
  timeSwap();
  
  
  // Draw directions to screen
  fill("#82889e");
  textSize(15);
  text("press r to \nreset the score ! ,,", width/2 + 100, 20);

  fill("#82889e");
  textSize(15);
  text("Score \n " + score, 10, 30);

  text("Win Streak \n " + winStreak,  width/2 - 50, 20);
  
}

// you lose
function loseScreen(){
  youLose.pos = {x: width/2 - 10, y: height/2 - 100};
  background(224,224,224);
  catcher.pos = {x: -200, y:-200};
  fallingObject.pos = {x: -200, y:-200};
  text("You lost!", width/2 - 50, height/2);
   
}

// you win
function winScreen(){

  youWon.pos = {x: width/2 - 10, y: height/2 - 100};
  background(224,224,224);
  youWonImg.resize(90,0);
  catcher.pos = {x: -200, y:-200};
  fallingObject.pos = {x: -200, y:-200};
  text("You win!", width/2 - 50, height/2);
}

// load game
function gamePlay(){
  
  if (fallingObject.y >= height){
    fallingObject.y = 0;
    fallingObject.x = random(width);

    score = score -1
    winStreak = 0;
    
    catcher.img = catcherL;
    imgStart = millis();
    pinguChange = true;
  }
  
  if (catcher.x < 50){
    catcher.x = 50;
  } else if (catcher.x > 350){
    catcher.x = 350;
  }

  // reset ball if catcher catches it
  if (fallingObject.collides(catcher)){
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1, 5);
    fallingObject.direction = "down";
    
    score = score +1;
    winStreak = winStreak +1;

    // changes pingu 
    catcher.img = catcherG;
    imgStart = millis();
    pinguChange = true;
    //
  } 
}

// restart the game
function restart(){
  if(mouseIsPressed){
  youWon.pos = {x: -200, y: -200};
  youLose.pos = {x: -200, y: -200};
  score = 0;
  fallingObject.y = 0;
  fallingObject.x = random(width);
  fallingObject.vel.y = random(1, 5);
  fallingObject.direction = "down";
  catcher.pos = {x: 200, y: 380};
  }
    
}


// show pingu images
function timeSwap(){
  if (pinguChange && millis() - imgStart > imgShowT){
    catcher.img = catcherImg;
    pinguChange = false;
  }
}