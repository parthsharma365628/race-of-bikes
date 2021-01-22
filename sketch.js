var path, mainCyclist;
var pathImg, mainRacerImg1, mainRacerImg2;

//var END = 0;
//var PLAY = 1;
var gameState = "PLAY";

var distance = 0;

var ob, ob1, ob2, ob3
var obst

var opp, opp1, opp2
var pinkcg, redcg, yellowcg
var c1, c2, c3
var bell1
var op4,op5,m3
var ov,ov1


function preload() {
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png", "images/mainPlayer2.png");
  mainRacerImg2 = loadAnimation("images/mainPlayer3.png");
  ob1 = loadImage("obstacle1.png")
  ob2 = loadImage("obstacle2.png")
  ob3 = loadImage("obstacle3.png")
  opp1 = loadAnimation("opponent1.png", "opponent2.png")
  opp2 = loadAnimation("opponent7.png", "opponent8.png")
  opp3 = loadAnimation("opponent4.png", "opponent5.png")
  op4=loadAnimation("opponent3.png")
  op5=loadAnimation("opponent6.png")
  bell1=loadSound("sound/bell.mp3")
  ov1=loadImage("gameOver.png") 
}

function setup() {

  createCanvas(700, 300);

  // Moving background
  path = createSprite(100, 150);
  path.addImage(pathImg);
  path.velocityX = -(distance/100+5);

  //creating boy running
  mainCyclist = createSprite(70, 150, 20, 20);
  mainCyclist.addAnimation("run", mainRacerImg1);
  mainCyclist.scale = 0.07;

  obst = createGroup()
  pinkcg = createGroup()
  redcg = createGroup()
  yellowcg = createGroup()
  
  ov=createSprite(350,150,1,1)
  ov.addImage(ov1)
  
  
}

function draw() {
  background(0);

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: " + distance, 550, 30);

  if (gameState === "PLAY") {
    ov.visible=false;

    distance = distance + round(getFrameRate() / 60)

    var p = round(random(1, 4))

    if (frameCount % 200 === 0) {
      if (p === 1) {
        pinkc()
      } else if (p === 2) {
        redc()
      } else if (p === 3) {
        yellowc()
      } else {
        obs()
      }
    }
    mainCyclist.y = World.mouseY;

    edges = createEdgeSprites();
    mainCyclist.collide(edges);

    //code to reset the background
    if (path.x < 0) {
      path.x = width / 2;
    }

    if(pinkcg.isTouching(mainCyclist)){
    gameState="end"
    c1.addAnimation("1",op4)
    c1.velocityX=0
    }
    

    if(yellowcg.isTouching(mainCyclist)){
    gameState="end"
    c3.addAnimation("3",op5)
    c3.velocityX=0
    }
    
    
    if(obst.isTouching(mainCyclist)){
    gameState="end"
    ob.velocityX=0
    }
    
    
    
    
  if(keyDown("space")){
    bell1.play()
    
  }

  }

  else if(gameState==="end"){
    mainCyclist.visible=false;
    path.velocityX=0
    ov.visible=true;
    textSize(20)
    text("PRESS 'R' TO RESET",240,250)
    
    if(keyDown("R")){
      reset()
      
    }
    
  }
  
}

function obs() {


  ob = createSprite(1000, round(random(20, 250)), 20, 20)
  ob.velocityX = -5
  ob.scale = 0.2
  obst.add(ob)

  num = round(random(1, 3))

  if (num === 1) {



    ob.addImage(ob1)


  } else if (num === 2) {
    ob.addImage(ob2)
  } else {
    ob.addImage(ob3)
  }

}

function pinkc() {

  c1 = createSprite(1000, round(random(30, 250)), 20, 20)
  c1.velocityX = -4.2
  c1.scale = 0.08
  c1.addAnimation("1", opp1)
  pinkcg.add(c1)


}

function redc() {

  c2 = createSprite(1000, round(random(30, 250)), 20, 20)
  c2.velocityX = -4.2
  c2.scale = 0.08
  c2.addAnimation("2", opp2)
  redcg.add(c2)



}

function yellowc() {

  c3 = createSprite(1000, round(random(30, 250)), 20, 20)
  c3.velocityX = -4.2
  c3.scale = 0.08
  c3.addAnimation("3", opp3)
  yellowcg.add(c3)
}
function reset(){
  gameState="PLAY"
  ov.visible=false;
  pinkcg.destroyEach()
  redcg.destroyEach()
  yellowcg.destroyEach()
  obst.destroyEach()
  mainCyclist.visible=true;
  path.velocityX=-(distance/100+5)
  distance=0
  
}



