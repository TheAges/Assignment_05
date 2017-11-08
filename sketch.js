var r1 = 150,
    aMax = 150, //Ampiezza massima raggiungibile dalla curva dello spetro
    r2 = 235/2,
    dv = 150, //disturbo della vibrazione in + e in - sull'onda, calcolato in pixel con 500px di lato (poi scalato a seconda di W)
    W = 1;

function preload(){
  song = loadSound('assets/song.mp3');
  back = loadImage("assets/back.png");
  play = loadImage("assets/play.png");
  stop = loadImage("assets/stop.png");

}

function setup(){
  createCanvas(windowWidth,windowHeight);
  angleMode(DEGREES)
  fft = new p5.FFT();
  song.amp(0.2);
 if (windowWidth > windowHeight) {W = windowHeight/500} else {W = windowWidth/500}
}

function draw() {

  noFill()
  stroke(230,46,0);
  strokeWeight(3);

  translate(width/2,height/2)
  scale(W)

  background(14,4,5);
  image(back, -250, -250, 500, 500);

  var waveform = fft.waveform();
  var spectrum = fft.analyze();

  push()
  rotate()

  /*
  //Spetro:
  beginShape();

  for (var i = 0; i< spectrum.length; i++){
    var w = map(i, 0, spectrum.length, 0, 360);
    var h = map(spectrum[i], 0, 255, r1, r1+aMax);
    vertex(sin(w)*h,cos(w)*h)
  }
  endShape(CLOSE);
  pop()
  */

  //Vibrazione:
  beginShape();
  for (var i = 0; i< waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, 360);
    var y = map( waveform[i], -1, 1, r2-dv, r2+dv); //mappa ogni valore della array waveform[i] che vanno da -1 a 1 (essendo la vibrazione), in valori che vanno dal raggio - il disturbo al raggio + disturbo, si ha cosi che quando non si ha virbrazzione (ossia l'onda è piatta) la disorzione si annulla.
    vertex(sin(x)*y,cos(x)*y);
  }
  endShape(CLOSE);

  if (song.isPlaying()) {image(stop,-25,93,50,50)} else {image(play,-25,93,50,50)}

}

function windowResized() { //redi la finestra Responsive
  resizeCanvas(windowWidth, windowHeight);

 if (windowWidth > windowHeight) {W = windowHeight/500} else {W = windowWidth/500}
}

function mouseClicked() {
  var d = dist(mouseX, mouseY, (width/2)-(0*W), (height/2)+(118*W))
  if (d<(25*W)) {togglePlay()

  }
  //console.log(d)
}

function togglePlay() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    //song.loop();
    song.play();
  }
}
