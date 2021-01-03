var tower, towerImg;
var START = 0, PLAY = 1, END = 2;
var door, doorImg, doorGroup;
var score = 0;
var climber, climberImg, climberGroup;
var invisibleblock, invisibleGroup;
var ghost, ghostjumpImg, ghoststillImg;
var gameState = START;


function preload(){
  towerImg = loadImage("tower.png");
  ghostjumpImg = loadImage("ghost-jumping.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghoststillImg = loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300,600,600)
  tower.addImage("towers",towerImg);
  tower.velocityY = 5;
  
  ghost = createSprite(300,200,10,10);
  ghost.addImage("ghosts",ghostjumpImg);
  ghost.scale = 0.4;
  ghost.debug = false;
  ghost.setCollider("rectangle",0,25,300,220);
  ghost.addImage("ghoststanding", ghoststillImg);
  
  climberGroup = new Group();
  invisibleGroup = new Group();
  doorGroup = new Group();
  
}

function draw(){
  background("black");
  drawSprites();
  
  fill("white");
  textSize(27);
  stroke("purple");
  strokeWeight(4);
  text("SCORE: " + score,400,40);
  
  if (tower.y>400){
    tower.y = 300;
  }
  
  if (gameState === START){
    ghost.velocityY = 0;
    tower.velocityY = 0;
    fill ("white");
    textSize(25);
    stroke("black");
    strokeWeight(4);
    text("PRESS 'SPACE' TO START",150,450)
  }
  
  if (keyDown("space") && gameState===START){
    gameState = PLAY;
  }
  
  if (gameState === PLAY){
    tower.velocityY = 5;  
  if (ghost.isTouching(climberGroup)){
    ghost.velocityY = 0;
    ghost.changeAnimation("ghoststanding", ghoststillImg);    
  }
  
  if (ghost.isTouching(invisibleGroup)||ghost.y>600){
    console.log("game over");
    ghost.destroy();
    gameState = END; 
  }
    
    score = score + Math.round(getFrameRate()/60);
 
  ghost.velocityY = ghost.velocityY + 0.5;
  
  if(keyDown("space")){
    ghost.velocityY = -7;
    ghost.changeAnimation("ghosts",ghostjumpImg);    
  }
  
  if(keyDown(LEFT_ARROW)){
    ghost.x = ghost.x - 3;
  }
  
  if(keyDown(RIGHT_ARROW)){
    ghost.x = ghost.x + 3;
  }  
  
  spawnDoors();
 }
  
  if (gameState === END){
    tower.velocityY = 0;
    doorGroup.destroyEach();
    climberGroup.destroyEach();
    invisibleGroup.destroyEach(); 
    fill("white");
    textSize(40);
    stroke("red")
    strokeWeight(4);
    text("GAME OVER",190,300);
  }
}

function spawnDoors(){
  if(frameCount%140===0){    
    door = createSprite(200,05,20,20);
    door.addImage("doors",doorImg);
    door.velocityY = 3;
    door.x = Math.round(random(150,500));
    door.lifetime = 600;
    doorGroup.add(door);
    
    climber = createSprite(200,70,20,20);
    climber.addImage("railing",climberImg);
    climber.velocityY = 3
    climber.x = door.x;
    climber.debug = false;
    climber.setCollider("rectangle",0,-5,90,5);
    climber.lifetime = 600;
    
    invisibleblock = createSprite(200,80,70,10);
    invisibleblock.x = climber.x;
    invisibleblock.velocityY = 3;
    invisibleblock.debug = false;
    invisibleblock.visible = false;    
    invisibleblock.lifetime = 600;
    
    climberGroup.add(climber);
    invisibleGroup.add(invisibleblock);
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;    
  }

}