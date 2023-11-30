
// @param{number}min
// @param{number}max
// @return
function getRandomNumber(min=0,max=1){
    return min + Math.random()* (max-min)
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
function distance(x1,y1,x2,y2){
    const dx = x2-x1;
    const dy = y2-y1;
     return Math.sqrt(dx * dx +dy * dy)
}
/** 
 * 
 */