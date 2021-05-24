import './style.css'
import * as R from "ramda"
const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
let adjustX = -570;
let adjustY = -752;

const mouse = {radius:150}

window.addEventListener('pointermove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

ctx.fillStyle = "white";
ctx.font = "20px Verdana"
ctx.fillText("DTC", 20,60);
const textCord = ctx.getImageData(0,0,100,100);

class Particle {
  constructor(x, y) {
    this.x = x  + 180;
    this.y = y + 200;
    this.size = 3;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 40 + 5;
  }
  draw() {
    ctx.fillStyle = "white";
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

(function init() {
  particleArray = [];
  const pixels = textCord.data;
  const w = textCord.width;
  const h = textCord.height;
  const len = w * h;
  for(let i = 0; i < len; ++i){
     const a = pixels[ i * 4  + 3];
     if(a >= 128){
        const y = parseInt( i/w , 10);
        const x = i - y * w;
        const posX = x * 25 + adjustX;
        const posY = y * 20 + adjustY;
        particleArray.push(new Particle(posX, posY));
     }
  }
})()

function connect(){
  particleArray.forEach( (_, i) => {
    for(let b = i ; b < particleArray.length; ++b){
      const dx = particleArray[i].x - particleArray[b].x;
      const dy = particleArray[i].y - particleArray[b].y
      const  distance = Math.sqrt(dx * dx + dy * dy );
      if(distance < 50){
        ctx.strokeStyle = "white";
        ctx.lineWidth = "2";
        ctx.beginPath();
        ctx.moveTo(particleArray[i].x, particleArray[i].y);
        ctx.lineTo(particleArray[b].x, particleArray[b].y);
        ctx.stroke();
      }

    }
  })
}



;(function animate() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  particleArray.forEach( s => {
    s.update();
    s.draw();
  })
  connect();
  requestAnimationFrame(animate);
}())
