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
    this.size = Math.random() * 15 + 1;
    this.weight = Math.random() * 1 + 1;
    this.directionX = -2;
  }
  draw() {
    ctx.fillStyle="orangered";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size , 0 , Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    if( this.y > canvas.height) {
      this.y = 0 - this.size;
      this.weight  = Math.random() * 1 + 1;
      this.x = Math.random() * canvas.width * 1.3;
    }
    this.weight += 0.05;
    this.y += this.weight;
    this.x += this.directionX;
  }
}

(function init() {
  particleArray = [];
  R.range(1,300).forEach( _  => {
    const x = Math.random() * canvas.width;
    const y = Math.random()* canvas.height;
    particleArray.push(new Particle(x, y));
  })

})();

;(function animate() {
  //ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.fillStyle="rgba(255,255,255,0.01)";
  ctx.fillRect(0,0, canvas.width, canvas.height);
  particleArray.forEach(s => {
    s.update();
    s.draw();
  })
  requestAnimationFrame(animate)
}())
