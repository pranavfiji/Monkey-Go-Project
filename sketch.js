 
var monkey,monkeyAnimation;
var ground,groundImage;

var bananaImage,banana;

var rockGroup,bananaGroup;

var gameState="play";

var score=0;

var invisibleGround;


function preload(){
  
  
  backImage = loadImage("jungle2.jpg");
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImage = loadImage("Banana.png");
  obstacle_img = loadImage("stone.png");
 
}


function setup() {
  createCanvas(800, 400);
  
  gameState="play";
  
  score=0;

    
   ground=createSprite(0,0,800,400);
  ground.scale=1.5;
  
  
  ground.addImage(backImage);
  monkey=createSprite(20,380,5,5);
  monkey.scale=0.1;
  monkey.addAnimation("Animation",monkey_running);
  
  invisibleGround=createSprite(400,800,800,800);
  invisibleGround.visible=false;
  rockGroup= new Group();
  bananaGroup=new Group();
  
 monkey.setCollider("rectangle",50,50);
  
  
}

function draw() {

  
  background(220);
   

  if(gameState==="play"){
  
  ground.velocityX=-(10+2*score/100);
  
  if(monkey.isTouching(bananaGroup)){
    score=score+1
    bananaGroup.destroyEach(monkey);
  }
 
 if(ground.x<0){
   ground.x=ground.width/2;
 }
 
  if(keyDown("space")&&monkey.y>=360){
    monkey.velocityY=-12
    
  }
  monkey.velocityY=monkey.velocityY+.8;
 if(monkey.isTouching(rockGroup)){
 // text("You Lose",400,200);
  //  textSize(30);
   
   gameState="END";
     
 }

  
     
    rocks();
    food();
}
  if(gameState==="END"){
    
     
    
    ground.velocityX=0;
    monkey.velocityY=0;
     //   bananaGroup.setVeloctiyXEach(0);
    
  
    
    rockGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
   
    rockGroup.setVelocityXEach(0);
    

    
    
  }
 
  monkey.collide(invisibleGround);
  
  
  
  drawSprites();
 textSize(15);
  text("Score:"+score,10,10);
  
  
}

function rocks(){
  if(World.frameCount%100===0){
    
    var rock=createSprite(800,random(210,395));
    rock.velocityX=-(15);
    rock.addImage("Image",obstacle_img);
   
     
     rock.scale=0.1;
     rock.lifetime=200;
     rockGroup.add(rock);
     
  }
  
}

function food(){
    if(World.frameCount%100===0){
      var banana=createSprite(800,random(200,380),5,5);
      var rand=(random(200));   
      banana.velocityX=-(5);
     banana.addImage("Image",bananaImage);
      
      banana.scale=0.1;
      banana.lifetime=200;
      bananaGroup.add(banana);
      
    }
  }
