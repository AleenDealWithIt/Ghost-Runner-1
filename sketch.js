var tower,towerImage;
var door, doorsGrp, doorImg;
var climber,climberImg,climbersGrp;
var ghost, ghostStandImg, ghostImg;
var invisibleObstacle,invisibleObstacleGrp;
var spookySound;

var gameState = "play";

function preload(){
  
  towerImage = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-jumping.png")
  ghostStandingImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  
  doorsGrp = new Group();
  climbersGrp = new Group();
  invisibleObstacleGrp = new Group();
}

function setup(){
  
  createCanvas(600,400);
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY = 2;
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage(ghostStandingImg);

  
  
  
}

function draw(){
  
  background(0);
  
  spookySound.loop();
  
  if(gameState === "play"){
  console.log(tower.y);
  if(tower.y > 600){
    
    tower.y = 350;
  }
  
  if(keyDown("left_arrow")){
    
    ghost.x += -3;
  }
  
  if(keyDown("right_arrow")){
    
    ghost.x += 3;
  }
  
  if(keyDown("space")){
    
    ghost.velocityY = -5;
  }
    spawnDoors();
  
  
  if(invisibleObstacleGrp.isTouching(ghost)){
    
    ghost.destroy();  
    gameState = "end";
  }
  
  if(climbersGrp.isTouching(ghost)){
    
    ghost.velocityY = 0;
  }
  ghost.velocityY += 0.8;
  drawSprites();
  }
  
  if(gameState === "end"){
   textSize(30); 
   stroke("cyan");
   text("GAME OVER",230,250);
  }
  
}

function spawnDoors(){
 if(frameCount % 240 == 0) {
   
door = createSprite(random(120,400),-50)
invisibleObstacle = createSprite(200,10);
invisibleObstacle.height = 2;
invisibleObstacle.x = door.x;
invisibleObstacle.velocityY = 1;
invisibleObstacle.visible = false
climber = createSprite(200,10)
climber.x = door.x;
door.velocityY = 1;
invisibleObstacle.width = climber.width;
climber.velocityY = 1;
door.addImage(doorImg);
climber.addImage(climberImg);
   
   ghost.depth = door.depth;
   ghost.depth += ghost.depth;
   
  doorsGrp.add(door);
  climbersGrp.add(climber);
  invisibleObstacleGrp.add(invisibleObstacle);
  door.lifetime = 800;
  climber.lifetime = 800;
  invisibleObstacle.lifetime = 800;
  invisibleObstacle.debug = true
}
}

