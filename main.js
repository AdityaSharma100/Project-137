var status = "";
objects = [];
var value = "";
function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(640, 420);
    video.hide();
}

function start(){
  objectDetector = ml5.objectDetector("cocoSSD", modelLoaded);
  document.getElementById('status').innerHTML = "Detecting Objects";
  value = document.getElementById('input').value;
}

function preload(){

}

function draw(){
  image(video, 0, 0, 640, 420);
  if(status != ""){
    objectDetector.detect(video, gotResults);
    for(i = 0; i < objects.length; i++){
       document.getElementById('status').innerHTML = "Detected objects";
       document.getElementById('number_of_objects').innerHTML = "Number of objects detected are : "+objects.length;

       noFill()
       stroke("lime");
       rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       percent = floor(objects[i].confidence) * 100;
       text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15);
    }
  }
}

function modelLoaded(){
   console.log("Model is Loaded!");
   status = true;
}

function gotResults(error, results){
  if(error){
    console.error(error);
  }else{
    console.log(results);
    objects = results;
  }
}