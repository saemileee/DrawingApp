const canvas = document.querySelector("canvas"); 
const ctx = canvas.getContext("2d"); //context는 캔버스에 그림을 그리는 붓이라고 생각하면 됨
canvas.width = 800; 
canvas.height = 800;

// ctx.fillRect(50, 50, 100, 200); //사각형을 그리고 채우는 func
ctx.rect(50,50,100,100);
ctx.rect(150,50,100,200);
ctx.rect(250,50,100,300);
ctx.rect(350,50,100,400);
ctx.fillStyle = "blue";
ctx.fill(); // fill 기능을 사용하면 이 전에 그렸던 친구들이 다 채워짐


ctx.beginPath(); // 새로운 경로를 정해주는 기능
ctx.rect(450,50,100,500);
ctx.rect(550,150,100,600);
ctx.fillStyle = "red";
ctx.fill(); //fillstyle을 설정해 주고 fill 기능을 추가해야 페인팅이 됨, 같은 경로의 rect을 모두 색칠한다는 의미로 이전에 다른 색상을 설정하였더라도 가장 마지막 컬러로 변경됨
