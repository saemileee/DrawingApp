const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas"); 
const ctx = canvas.getContext("2d"); //context는 캔버스에 그림을 그리는 붓이라고 생각하면 됨
canvas.width = 800; 
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
let isPainting = false;

function onMove(event){
    if(isPainting == true){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting(){
    isPainting = true;
}

function cancelPainting() {
    isPainting = false;
    ctx.beginPath(); //mouseup할 때마다 새로운 패쓰로 시작하게 해주는 것
}

function onLineWidthChange(event){
    ctx.lineWidth = event.target.value; //range의 변경된 value 값을 잡아주는 func
}

function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting); // 마우스가 캔버스를 떠났을 때 계속 끌고가는 버그를 잡아주는 것
lineWidth.addEventListener("change", onLineWidthChange)
color.addEventListener("change", onColorChange);