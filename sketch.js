const colorPalette = ["Crimson", "Teal", "Chocolate", "Maroon"]
const colorPalette_2 = ["White", "Gray", "Gainsboro", "Silver", "DarkGrey"];

let cols;
let rws;

const scl = 20;
const w = 1400;
const h = 1400;

let flying = 0;

let grd = [];

function setup() {
  console.log("Hello World!")

  createCanvas(windowWidth, windowHeight, WEBGL);
  cols = w / scl;
  rws = h / scl;

  for (let x = 0; x < cols; x++) {
    grd[x] = [];
    for (let y = 0; y < rws; y++) {
      grd[x][y] = 1;
    }
  }
}


function draw() {

  noStroke();

  flying += 0.1;
  let yoff = flying;
  for (let y = 0; y < rws; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      grd[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  rotateX(mouseY/scl);
  rotateY(mouseX/scl);

  translate(-w / 2, -h / 2);

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
