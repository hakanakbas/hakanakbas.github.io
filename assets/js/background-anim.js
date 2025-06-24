// File: assets/js/background-anim.js

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('backgroundCanvas');
    if (!canvas) {
        console.error('backgroundCanvas element not found!');
        return;
    }
    const ctx = canvas.getContext('2d');
    let width, height;

    // --- Galaksi Ayarları ---
    const NUM_STARS = 20000;
    const STAR_COLOR = 'rgba(255, 255, 255, 0.7)';

    // DEĞİŞTİRİLEN KISIM: Dönme hızını azalttık
    const ROTATION_SPEED = 0.000001; // Önceki 0.00005'ten daha yavaş

    const STAR_FIELD_DEPTH = 500;

    const stars = [];

    class Star {
        constructor() {
            this.x = (Math.random() - 0.5) * width;
            this.y = (Math.random() - 0.2) * height;
            this.z = Math.random() * STAR_FIELD_DEPTH;
        }

        update() {
            this.z -= 0.5;
            if (this.z < 1) {
                this.z = STAR_FIELD_DEPTH;
                this.x = (Math.random() - 0.5) * width;
                this.y = (Math.random() - 0.5) * height;
            }

            const angle = Math.atan2(this.y, this.x);
            const dist = Math.sqrt(this.x * this.x + this.y * this.y);

            const newAngle = angle + ROTATION_SPEED * (STAR_FIELD_DEPTH - this.z);
            this.x = dist * Math.cos(newAngle);
            this.y = dist * Math.sin(newAngle);
        }

        draw() {
            const screenX = this.x / this.z * (width / 2) + width / 2;
            const screenY = this.y / this.z * (height / 2) + height / 2;
            const size = (STAR_FIELD_DEPTH - this.z) / STAR_FIELD_DEPTH * 2;

            if (screenX > 0 && screenX < width && screenY > 0 && screenY < height) {
                ctx.fillStyle = STAR_COLOR;
                ctx.beginPath();
                ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    function init() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        stars.length = 0;
        for (let i = 0; i < NUM_STARS; i++) {
            stars.push(new Star());
        }
    }

    function animate() {
        ctx.fillStyle = 'rgb(10, 25, 47)';
        ctx.fillRect(0, 0, width, height);

        stars.forEach(star => {
            star.update();
            star.draw();
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', init);
    init();
    animate();
});