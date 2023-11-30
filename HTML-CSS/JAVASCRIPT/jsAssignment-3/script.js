const viewport = document.querySelector('.viewport');
const ballsArray =[];
for (let i =0; i<BALL_COUNT;i++){
    const r =getRandomNumber(0,VIEWPORT_WIDTH-BALL_WIDTH)
    const x =getRandomNumber(0,VIEWPORT_WIDTH-BALL_WIDTH)
    const y =getRandomNumber(0,VIEWPORT_HEIGHT-BALL_HEIGHT)
    const ball = new Ball(x,y);
    ball.element.style.width =  BALL_WIDTH + 'px'    
    ball.element.style.height =  BALL_HEIGHT + 'px'  
    ballsArray.push(ball)  
}
//add balls in viewport
ballsArray.forEach(ball =>{
    viewport.appendChild(ball.getElement());
})
// new Date();
//
function render (){
    ballsArray.forEach(ball =>{
     ball.draw()
     ball.move()
     ball.checkWallCollision(0,0,VIEWPORT_WIDTH,VIEWPORT_HEIGHT)
     ballsArray.forEach(otherBall =>{
        if(ball == otherBall) return;
        ball.checkBallCollision(otherBall)
     })
    })
    requestAnimationFrame(render);
}
render();