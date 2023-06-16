var som1, som2;
 function preload(){
    som1 = loadSound("musica.mpeg");
    som2 = loadSound("mario.mp3");
}
function setup(){
    canvas = createCanvas(640, 480);
    canvas.position(windowWidth/2 - 320, 480);
    background("white");

    video = createCapture(VIDEO);
    video.hide();
    video.size(640, 480);

    mixer = ml5.poseNet(video, modelReady);
    mixer.on("pose", gotPose);
}
function modelReady(){
    console.log("mixer está pronto para mexer o¬o");
}

var ePontos = 0;
var dPontos = 0;

var XE = 0;
var YE = 0;
var XD = 0;
var YD = 0;

function gotPose(result){
    //checa se deu resultado
    if(result.length>0){

        ePontos = result[0].pose.keypoints[9].score;
        dPontos = result[0].pose.keypoints[10].score;

        XE = result[0].pose.leftWrist.x;
        YE = result[0].pose.leftWrist.y;

        XD = result[0].pose.rightWrist.x;
        YD = result[0].pose.rightWrist.y;
    }
}
function draw(){
    image(video, 0, 0, 640, 480);
    //define a cor das bolinhas
    fill ("red");
    //checa se o pulso esquerdo esta na imagem
    if(ePontos>0.2){
        circle(XE, YE, 20);
        if(ePontos > dPontos && !som1.isPlaying()){
            document.getElementById("nome").innerHTML = "Kirby";
            som2.stop();
            som1.setVolume(0.2);
            som1.play();
        }
    }
    if(dPontos>0.2){
        circle(XD, YD, 20);
        if(dPontos > ePontos && !som2.isPlaying()){
            document.getElementById("nome").innerHTML = "WaluigiPinball";
            som1.stop();
            som2.setVolume(0.2);
            som2.play();
        }
    }
}