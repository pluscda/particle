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

ctx.fillStyle = "white";
ctx.font = "90px Verdana"
ctx.fillText("A", 20,60)
ctx.strokeStyle = "white"
ctx.strokeRect(0,0,100,100)
const textCord = ctx.getImageData(0,0,100,100);

class Particle {
  constructor(x, y) {
    this.x = x + 100;
    this.y = y;
    this.size = 3;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 40 + 5;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.closePath();
    ctx.fill();
  }
  update() {
     const dx = mouse.x  - this.x;
     const dy = mouse.y - this.y;
     const distance = Math.sqrt(dx * dx + dy * dy);
     const forceDirectionX = dx / distance;
     const forceDirectionY = dy / distance;
     const maxDistance = mouse.radius;
     const force = (maxDistance - distance) / maxDistance;
     const directionX = forceDirectionX * force * this.density;
     const directionY = forceDirectionY * force * this.density;
     if(distance < mouse.radius){
       this.x -= directionX
       this.y -= directionY;
     }else {
        if(this.x != this.baseX){
           const dx  = this.x  - this.baseX;
           this.x -= dx/5;
        }
        if(this.y != this.baseY){
           const dy  = this.y  - this.baseY;
           this.y -= dy/5;
        }
     }

  }
}

function init() {
  particleArray = [];
  R.range(1,1000).forEach( _ => {
     const x = Math.random() * canvas.width;
     const y = Math.random() * canvas.height;
     particleArray.push(new Particle(x, y))
  })
}

init();

;(function animate() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  particleArray.forEach( s => {
    s.update();
    s.draw();
   
  })
  requestAnimationFrame(animate);
}())
