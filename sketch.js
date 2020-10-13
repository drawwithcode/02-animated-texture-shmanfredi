const colorPalette = ["Crimson", "Teal", "Chocolate", "Maroon"]
const colorPalette_2 = ["White", "Gray", "Gainsboro", "Silver", "DarkGrey"];

let cols;
let rws;

const scl = 10;
let flying = 0;

let grd = [];

const s = 200;

function setup() {
  console.log("Hello World!")
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function windowResized() {
  resizeCanvas(windowWidth,windowHeight)
}

function draw() {

  let w = window.innerWidth/1.25;
  let h = window.innerHeight/1.25;

  cols = w / scl;
  rws = h / scl;

  for (let x = 0; x < cols; x++) {
    grd[x] = [];
    for (let y = 0; y < rws; y++) {
      grd[x][y] = 1;
    }
  }

  noStroke();

  flying -= 0.1;
  let yoff = flying;
  for (let y = 0; y < rws; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      grd[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  rotateX(mouseY/s);
  rotateY(mouseX/s);

  translate(-w / 2, -h / 4);

if(mouseX <= windowWidth/2){
  background(0);
} else {
  background(255);
}

  for (let y = 0; y < rws - 1; y++) {
    beginShape(TRIANGLE_STRIP);

    let randomColor = random(colorPalette);
    let randomColor_2 = random(colorPalette_2);

if (mouseY >= windowHeight/2){
  fill(randomColor_2);
} else {
  fill(randomColor);
}

    for (let x = 0; x < cols; x++) {

      let randomColor = random(colorPalette);
      let randomColor_2 = random(colorPalette_2);

  if (mouseY >= windowHeight/2){

    fill(randomColor_2);
  } else {
    fill(randomColor);
  }
      vertex(x * scl, y * scl, grd[x][y]);
      vertex(x * scl, (y + 1) * scl, grd[x][y + 1]);
    }
    endShape();
  }
}
