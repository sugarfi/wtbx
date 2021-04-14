const WIDTH = 300;
const HEIGHT = 300;
const MAX_TIME = 150;
const URL = 'https://formspree.io/f/mwkakqpa';

const canvas = document.getElementById('c');
canvas.width = WIDTH;
canvas.height = HEIGHT;
const c = canvas.getContext('2d');

let x = 0;
let y = 0;
let time = Date.now();
let text = '';
let timer = 60;

const color = () => {
    return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
};

let mx = 0;
let my = 0;
let lx = 0;
let ly = 0;
let mouse = false;
let line_col = color();

const getPos = (e) => {
    const rect = canvas.getBoundingClientRect();
    mx = e.clientX - rect.left;
    my = e.clientY - rect.top;
};

const draw = () => {
    c.strokeStyle = line_col;
    c.beginPath();
    c.moveTo(lx, ly);
    c.lineTo(mx, my);
    c.stroke();
    lx = mx;
    ly = my;
};

canvas.addEventListener('mousedown', e => {
    mouse = true;
    getPos(e);
    line_col = color();
    lx = mx;
    ly = my;
});

canvas.addEventListener('mouseup', e => {
    mouse = false;
    getPos(e);
});

canvas.addEventListener('mousemove', e => {
    if (mouse) {
        getPos(e);
        const x = Math.random();
        if (x > 0.95) {
            mx = WIDTH - mx;
        } else if (x > 0.9) {
            my = HEIGHT - my;
        }
        draw();
    }
});

window.addEventListener('keydown', e => {
    if (Date.now() - time > MAX_TIME) {
        x = Math.random() * WIDTH;
        y = Math.random() * HEIGHT;
        text = '';
    }
    text += e.key;
    c.fillStyle = color();
    c.font = '20px monospace';
    c.fillText(text, x, y + 20);
    time = Date.now();
});

const renderTime = () => {
    const h = document.getElementById('time');
    h.textContent = timer.toString(3);
};

const b = document.getElementById('b');
b.onclick = () => {
    renderTime();
    setInterval(() => {
        renderTime();
        if (timer == 0) {
            const data = canvas.toDataURL();
            fetch(URL, {
                method: 'POST',
                body: JSON.stringify({
                    data
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(r => {
                window.location.reload()
            });
        }
        --timer;
    }, 1000);
};
