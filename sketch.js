var player, playerImg
var edges= []
var gMiddle
var coin
var obstacle
var rand
var score = 0
var gameState = "info"
var coinGroup
var obGroup
var coinImg
var bgImg
var comet
var comGroup
var invPowerUp
var rand1
var invPowerGroup
var fcount
var playButton
var playImg
function preload(){
playerImg = loadImage("images/creature.png")
coinImg = loadImage("images/coin.png")
bgImg = loadImage("images/bg.jpg")
playImg = loadImage("images/playy.png")
}

function setup() {
  createCanvas(800,600);
  player = createSprite(100, 100, 50, 50);
  player.addImage(playerImg)
  player.scale = 0.1
  player.setCollider("circle",0,0,300)
  edges = createEdgeSprites()

  gTop = createSprite(400,180,800,10)
  gMiddle = createSprite(400,400,800,10)
  
  coinGroup = new Group()
  obGroup = new Group()
  comGroup = new Group();
  invPowerGroup = new Group();
}

function draw() {
  background(bgImg);  
  drawSprites();
if (gameState === "info") {
playButton = createSprite(400,300,20,20)
//playButton.addImage(playImg)
//playButton.scale = 0.7
if (mousePressedOver(playButton)) {
  gameState = "play"
  playButton.visible = false;
}
gMiddle.visible = false;
gTop.visible = false;
player.visible = false;

}



if (gameState === "play"||gameState === "invincible") {

  if (keyDown("space")&&(player.collide(gTop)||player.collide(gMiddle)||player.collide(edges[3]))) {
    player.velocityY = -12;
  }
  player.velocityY =  player.velocityY+0.8;

  if (keyDown(DOWN_ARROW)&&player.y < 400) {
    player.y = player.y+180;
  }

  if (keyDown(UP_ARROW)&&player.y > 160) {
    player.y = player.y-190;
  }

  if (invPowerGroup.isTouching(player)) {
    //change image
    gameState = "invincible"
var count = frameCount
fcount = frameCount+60
console.log(count)
if (count > fcount) {
  //change image
gameState = "play"
count = 0;
}
  }

  if (player.collide(gMiddle)) {
    player.velocityY = 0;
  }
  gMiddle.visible = true;
gTop.visible = true;
player.visible = true;
playButton.visible = false;
spawnCoins();
spawnOb();
spawnComet();
spawnInvPowerUp();
for (var i =0; i < coinGroup.length; i++) {
  if (coinGroup.get(i)!= null&&coinGroup.get(i).isTouching(player)) {
  coinGroup.get(i).destroy();
  score++
  }
  }
  if ((obGroup.isTouching(player)||comGroup.isTouching(player))&&gameState != "invincible") {
    gameState = "end"
  }
} else if (gameState === "end") {
coinGroup.setVelocityXEach(0)
obGroup.setVelocityXEach(0)
player.velocityY = 0;
coinGroup.setLifetimeEach(-1)
obGroup.setLifetimeEach(-1)
comGroup.setLifetimeEach(-1)
comGroup.setVelocityXEach(0)
}
  player.collide(gTop)
  player.collide(gMiddle)
  player.collide(edges[3])
  player.collide(edges[2])
  if (gameState != "info") {
textSize(20)
fill("white")
text("Score: "+score,660,50)
  }

}

function spawnCoins() {
  rand = Math.round(random(1,3))
  if (frameCount % 80 == 0) {
coin = createSprite(820,300,10,10)
coin.addImage(coinImg)
coin.scale = 0.1
coin.velocityX = -5;
coin.lifetime = 164;
if (rand == 1) {
  coin.y = 575;
} else if (rand == 2) {
  coin.y = 370
} else if(rand == 3) {
  coin.y = 150;
}
coinGroup.add(coin)
  } 
}

function spawnOb() {
  rand = Math.round(random(1,3))
  if (frameCount % 100 == 0) {
    obstacle = createSprite(820,300,10,20)
    obstacle.velocityX = -5;
    obstacle.lifetime = 164;
    obstacle.shapeColor = "red"
    
    if (rand == 1) {
      obstacle.y = 575;
    } else if (rand == 2) {
      obstacle.y = 370
    } else if(rand == 3) {
      obstacle.y = 150;
    }
    obGroup.add(obstacle)
  }
}

function spawnComet() {
if (frameCount % 150 ===  0) {
comet = createSprite(800,random(0,600),20,20)

comet.lifetime = 300;
comet.shapeColor = "yellow"
comet.velocityX = random(-10,-5)
comet.velocityY = random(-10,10)
comGroup.add(comet)
}
}

function spawnInvPowerUp() {
  rand1 = Math.round(random(1,3))
  if (frameCount % 120 === 0) {
  invPowerUp = createSprite(820,300,10,10)
  invPowerUp.shapeColor ="white"
    invPowerUp.lifetime = 164;
    invPowerUp.velocityX = -5;

    if (rand1 == 1) {
      invPowerUp.y = 575;
    } else if (rand1 == 2) {
      invPowerUp.y = 370
    } else if(rand == 3) {
      invPowerUp.y = 150;
    }
    invPowerGroup.add(invPowerUp)
  }
}

