var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  mon = loadAnimation("sprite_0.png")
  bannanasImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgm = loadImage("bgf.png")
  jumpSound = loadSound("jump.mp3")
}



function setup() {
   createCanvas(600, 600);

   bg = createSprite(300, 300, 600, 600)
  bg.addImage("cjhgjdra", bgm)
  bg.scale = 1.05
  
  
  monkey = createSprite(50,160,20,50);
  
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("table", mon)
  monkey.scale = 0.1;
  
invisibleGround = createSprite(300,590,600,10);
  invisibleGround.visible = false;
  
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
 // monkey.debug = true
  survivalTime = 0;
  
  obstaclesGroup = createGroup();
  bannanasGroup = createGroup();
}


function draw() {
background("white");
  
   if(gameState === PLAY){
    
    bg.velocityX = -(4 + 3* survivalTime/100)
  
    if (bg.x < 70){
      bg.x = bg.width/2;
    }
    
    if(monkey.isTouching(bannanasGroup)){
      bannanasGroup.destroyEach();
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
        jumpSound.play();
    }
       monkey.velocityY = monkey.velocityY + 0.8;
     monkey.collide(invisibleGround)
     
     spawnObstacles();
     spawnbannanas()
   
     
     if(obstaclesGroup.isTouching(monkey)){
        monkey.velocityY = -12;
        jumpSound.play();
        gameState = END;
        
    }
     
     
   }
  
  else if(gameState == END){
    
    monkey.changeAnimation("table", mon)
    invisibleGround.velocityX = 0;
      monkey.velocityY = 0
      bg.velocityX = 0
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
     
     obstaclesGroup.setVelocityXEach(0);
         
  }
    
    
    
    
    
    
    
    
  
  
  drawSprites();
  
  if(gameState == PLAY){
    textSize (25)
    fill("white")
    survivalTime = Math.ceil(frameCount/frameRate())
    text ("Survival Time - "+ survivalTime, 400, 50)
    }
}


function spawnObstacles(){
 if (frameCount % 120 === 0){
   var obstacle = createSprite(600,Math.round(random(10, 590)) ,10,40);
   //monkey.Y = Math.round(random(10,600));
   obstacle.velocityX = -(6 + survivalTime/100);
   obstacle.addImage(obstacleImage)
    obstacle.scale = 0.17
   
    //assign scale and lifetime to the obstacle           
    obstacle.lifetime = 300;
  
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}


function spawnbannanas(){
 if (frameCount % 80 === 0){
   var bannanas = createSprite(600,Math.round(random(10, 590)) ,10,40);
   
   bannanas.velocityX = -(8 + survivalTime/100);
   bannanas.addImage(bannanasImage)
    bannanas.scale = 0.2
   
    //assign scale and lifetime to the obstacle           
    bannanas.lifetime = 300;
  
   //add each obstacle to the group
    bannanasGroup.add(bannanas);
 }
}
