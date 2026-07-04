const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const memoryBlocks = [];

function cpuStress() {
    let x = 0;

    for(let i = 0; i < 25000000; i++) {
        x += Math.sqrt(i) * Math.random() * Math.sin(i);
    }

    requestAnimationFrame(cpuStress);
}

function memoryStress() {
    // allocate in chunks to avoid instant crash
    memoryBlocks.push(new Array(25000000).fill(Math.random()));

    if(memoryBlocks.length < 100) {
        setTimeout(memoryStress, 200);
    }
}

function graphicsStress() {
    const image = ctx.createImageData(
        canvas.width,
        canvas.height
    );

    for(let i = 0; i < image.data.length; i += 4) {
        image.data[i] = Math.random() * 255;
        image.data[i + 1] = Math.random() * 255;
        image.data[i + 2] = Math.random() * 255;
        image.data[i + 3] = 255;
    }

    ctx.putImageData(image,0,0);

    // Draw on canvas aggressively
    for(let j = 0; j < 100; j++) {
        ctx.fillStyle = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
        ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*500, Math.random()*500);
    }

    requestAnimationFrame(graphicsStress);
}

window.onload = () => {
    cpuStress();
    memoryStress();
    graphicsStress();
};