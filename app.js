const fontFamily = document.getElementById("font-family");
const fontSize = document.getElementById("font-size");
const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas"); 
const ctx = canvas.getContext("2d"); //context는 캔버스에 그림을 그리는 붓이라고 생각하면 됨
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

// let f = new FontFace('text', 'url(https://fonts.googleapis.com/css2?family=Gaegu:wght@300&display=swap" rel="stylesheet)');
// f.load().then(function()
// {
//     ctx.font = 'bold 48px text';
// });

canvas.width = 800; 
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
ctx.font = `${fontSize.value}px ${fontFamily.value}`;

let isPainting = false;
let isFilling = false;

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

function onColorClick(event){
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

function onModeClick(){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else{
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onDestroyClick(){
    if (confirm("Are you sure you want to destroy?")){
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onEraserClick(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}

function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value=null;
    }
}

function onSaveClick(){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

function onFontSizeChange(event){
    ctx.font = `${event.target.value}px ${fontFamily.value}`
}

function onFontFamilySelect(event){
    ctx.font = `${event.target.value}px ${fontFamily.value}`
}

function onDoubleClick(event){
    const text = textInput.value;
    if (text !=="") {
        ctx.save();
        ctx.lineWidth = 1;
        // ctx.font = "68px serif";
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
    }
}


fontSize.addEventListener("change", onFontSizeChange);
canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting); // 마우스가 캔버스를 떠났을 때 계속 끌고가는 버그를 잡아주는 것
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange)
color.addEventListener("change", onColorChange);
colorOptions.forEach(color => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
fontFamily.addEventListener("select", onFontFamilySelect);