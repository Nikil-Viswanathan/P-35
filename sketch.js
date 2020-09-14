//Create variables here
var dog , happyDog , database  , foodStock;
var foodS = 0;
var fedTime , lastFed;
var foodObj;
function preload()
{
  img = loadImage("images/dogImg.png");
  img1 = loadImage("images/dogImg1.png");
	//load images here
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
    dog = createSprite(250,250,50,50);
    dog.addImage(img);
    dog.scale = 0.5;
    foodStock = database.ref('Food');
    foodStock.on("value",readStock);
    feed=createButton("Feed the Dog");
    feed.position(850,95);
    feed.mousePressed(feedDog);

    addFood=createButton("Add Food");
    addFood.position(950 , 95);
    addFood.mousePressed(addFoods)

    foodObj = new Food()
}


function draw() {  
 background(46 , 139 , 87);
 
 foodObj.display();
 fedTime=database.ref('FeedTime');
 fedTime.on("value" , function(data){
lastFed=data.val();
 });
 fill(255,255,254);
 textSize(15);
if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + " PM" , 350 , 30);
}else if(lastFed ==0){
  text("last Feed : 12 AM" , 350 ,30);
}else{
  text("Last Feed : "+lastFed+" AM" , 350 , 30);
}
  drawSprites();
  
  //add styles here
textSize(25);
text("Food Available: " + foodS , 250 , 50 );

}

function addFoods(){
foodS++;
database.ref('/').update({
  Food:foodS
})
}
function feedDog(){
  dog.addImage(img1);
console.log()
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function readStock(data){
foodS = data.val();
foodObj.updateFoodStock(foodS);
}

/*function writeStock(x){
  database.ref('/').update({
    Food:x 
})
}*/
