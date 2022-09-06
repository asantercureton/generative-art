const canvas = document.querySelector('canvas');
const generateBtn = document.querySelector('.generate-btn');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let curve, curve2;

function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    ctx.lineWidth = branchWidth;
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgb(0,0,0,.5)';
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI/180);
    ctx.moveTo(0,0);
    if (angle) {
        ctx.bezierCurveTo(curve2, -len/2, curve2, -len/2, 0, -len);
    } else {
        ctx.bezierCurveTo(curve2, -len/2, -curve2, -len/2, 0, -len);
    }
        
    ctx.stroke();

    if (len < 8) {
        // leaves
        ctx.beginPath();
        ctx.arc(0, -len, 10, 0, Math.PI/2);
        ctx.fill();
        ctx.restore();
        return;
    }
    drawTree(0, -len, len * 0.75, angle + curve, branchWidth * 0.9);
    drawTree(0, -len, len * 0.75, angle - curve, branchWidth * 0.4);

    ctx.restore();
}
drawTree(canvas.width/2, canvas.height - 80, 380, 0, 20, 'blue', 'orangered');

function generateRandomTree() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    // startX, startY, len, angle, branchWidth, color1, color2
    let centerPointX = canvas.width/2;
    let len = Math.floor((Math.random() * 20) + 100);
    let angle = Math.floor((Math.random() * 10) - 5);
    let branchWidth = (Math.random() * 70) + 1;
    let color1 = 'rgb(' + Math.random() * 255 + ', ' + Math.random() * 255 + ', ' + Math.random() * 255 + ')';
    let color2 = 'rgb(' + Math.random() * 255 + ', ' + Math.random() * 255 + ', ' + Math.random() * 255 + ')';
    let color3 = 'rgb(' + Math.random() * 255 + ', ' + Math.random() * 255 + ', ' + Math.random() * 255 + ')';
    let randomNum = toString(curve2);
    generateBtn.style.background = color1;
    generateBtn.style.color = canvas.style.background = color3;
    curve = (Math.random() * 20) + 2;
    curve2 = Math.random() * 50;
    generateBtn.style.borderRadius = randomNum;

    drawTree(centerPointX, canvas.height - 80, len, angle, branchWidth, color1, color2);
}

generateBtn.addEventListener('click', generateRandomTree);