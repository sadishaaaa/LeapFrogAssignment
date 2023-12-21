import './styles/style.css';
import {VIEWPORT_WIDTH,VIEWPORT_HEIGHT,SPEED} from './constant'
import { Ball,Position} from './ball';


const ballPosition:Position={
x:100,
y:100,
}
const ball = new Ball(ballPosition,50);
const viewport = document.getElementById("viewport");
if(viewport){
  ball.addToContainer(viewport);
  
  draw()
}

function draw(){
  ball.move(SPEED);
  if(ball.position.y+ (ball.radius*2)>VIEWPORT_HEIGHT){
    ball.dy= ball.dy;
  }
  requestAnimationFrame(draw)
}

//TYPES