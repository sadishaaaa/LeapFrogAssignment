import { SPEED } from "./constant";
export type Position = {
  x: number;
  y: number;
};
interface IBall{
   position:Position;
   radius:number;
   color:string;
   element:HTMLElement;
   dy:number;
   setStyles:()=>void;
   renderBallMove:()=>void;
   move:(speed:number)=>void;
   addToContainer:(container:HTMLElement)=>void;
}
export class Ball implements IBall {
  //we can alaso use private
  position: Position;
  radius: number;
  color: string;
  element: HTMLElement;
  dy:number;
  constructor(position: Position, radius: number, color: string = "#a22") {
    this.position = position;
    this.radius = radius;
    this.color = color;
    this.element = document.createElement("div");
    this.setStyles();
    this.dy = 1;
  }
  setStyles() {
    this.element.style.left = this.position.x + "px";
    this.element.style.top = this.position.y + "px";
    this.element.style.width = this.radius * 2 + "px";
    this.element.style.height = this.radius * 2 + "px";
    this.element.style.position = "absolute";
    this.element.style.borderRadius = "50%";
    this.element.style.background = this.color;
    this.renderBallMove()
  }
  addToContainer(container: HTMLElement) {
    container.appendChild(this.element);
  }
  move(speed: number) {
    // this.position.x += speed;
    this.position.y += speed;
   this. renderBallMove();
  }
  renderBallMove() {
    this.element.style.left = this.position.x + "px";
    this.element.style.top = this.position.y + "px";
  }
}
