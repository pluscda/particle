import './style.css'
import * as R from "ramda"
const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];

const mouse = {radius:150}

window.addEventListener('pointermove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})
class Particle {
  constructor(x, y) {
    this.x = x ;
    this.y = y;
    this.size = 10;
    this.weight = 2;
    this.directionX = 1;
    this.directionY = 1;
  }
  draw() {
    ctx.fillStyle="red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size , 0 , Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    this.weight += 0.01;
    this.y += this.weight;
  }
}
const particle1 = new Particle(1000,10);

function init() {
  particleArray = [];

}

init();

;(function animate() {
  //ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.fillStyle="rgba(255,255,255,0.01)";
  ctx.fillRect(0,0, canvas.width, canvas.height);
  particle1.update();
  particle1.draw();
  requestAnimationFrame(animate)
}())
