const canvas = document.querySelector("canvas"); 
const ctx = canvas.getContext("2d"); //context는 캔버스에 그림을 그리는 붓이라고 생각하면 됨
canvas.width = 800; 
canvas.height = 800;

ctx.fillRect(50, 50, 100, 200); //사각형을 그리고 채우는 func
ctx.fillText("새미",100,300);