var num=1333;
var as;
var rs;
var theta=0;

var analyzer;

var song;
var reverb;

function preload() {
 // song = loadSound('https://res.cloudinary.com/de3c6e2g5/video/upload/v1504497673/hypNo_qpbdwj.wav');
  song = loadSound('https://res.cloudinary.com/de3c6e2g5/video/upload/v1597964942/boxLoop15_b_norm_fzhxwq.wav');
}

function setup()
{

  createCanvas(windowWidth,windowHeight);

  reverb = new p5.Reverb();
  song.disconnect();
  reverb.process(song,3,7);
  song.loop();

  analyzer = new p5.Amplitude();
  // Patch the input to an volume analyzer
  analyzer.setInput(song);
}

function draw()
{
  var volume = map(mouseX, 0, width, .1, 1);
 
  song.amp(volume);

  // Changing the rate alters the pitch
  var speed = map(mouseY, 0, height, 0.1, 3);
  song.rate(speed);
  var vol = analyzer.getLevel();
  for (var j=0; j<18; j++){
         var sum =+ vol;
  }

  var vol_adj = (sum/17)*37777;
  stroke(vol_adj, 57);//adjust in different range

  background(0,23);
  // background(0, mouseX-127);//

  as = map(mouseY, 0,width,   1.91, 1.13);
  rs = map(mouseX, 0,height, .437, 1.13);
  // rs = map(mouseY, 0,height, .373, 7.43);

  var x, y, sq, angle=0, radius=20;

  for (var i=0; i<num; i++) {
        x = width/2 + sin(angle)*radius;
        y = height/2 + cos(angle)*radius;
        var sz = map(sin(theta + TWO_PI/num*i*40), -1, 1, 10, 93);
        var scal = 0.2+1.0/num*i;
        ellipse(x, y, sz*scal, sz*scal);
        radius += rs;
        angle += as;
  }

  theta -= vol_adj/113;
 // theta -= vol_adj/173;
  // theta -= .47;
}

function mousePressed() { getAudioContext().resume() }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
