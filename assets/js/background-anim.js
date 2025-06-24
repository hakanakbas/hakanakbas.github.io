// File: assets/js/background-anim.js

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('backgroundCanvas');
    if (!canvas) {
        console.error('backgroundCanvas element not found!');
        return;
    }

    const ctx = canvas.getContext('2d');
    let t = 0;
    
    // Canvas boyutunu pencereye göre ayarla
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();

    const a = (x, y) => {
        const k = (4 + Math.cos(y)) * Math.cos(x / 4);
        const e = y / 8 - 20;
        const d = Math.sqrt(k * k + e * e); // mag(k, e)
        const q = Math.sin(k * 3) + Math.sin(y / 19 + 9) * k * (6 + Math.sin(e * 14 - d));
        const c = d - t;
        
        const pointX = q * Math.cos(d / 8 + t / 4) + 50 * Math.cos(c) + canvas.width / 2; // Ortalamak için canvas.width/2 eklendi
        const pointY = q * Math.sin(c) + d * 7 * Math.sin(c / 4) + canvas.height / 2;  // Ortalamak için canvas.height/2 eklendi
        
        // Canvas'a noktayı çiz
        ctx.fillRect(pointX, pointY, 1, 1);
    };

    function draw() {
        // Arka planı hafif saydam siyah ile temizle, bu "iz bırakma" efekti yaratır
        ctx.fillStyle = 'rgba(9, 9, 9, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Noktaların rengi
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; // Soluk beyaz noktalar
        
        t += Math.PI / 120;
        
        for (let i = 0; i < 1000; i++) { // Performans için döngü sayısını düşürdüm (1e4 -> 1000)
            a(i, i / 235);
        }
        
        requestAnimationFrame(draw);
    }
    
    // İlk çizimi başlat
    draw();
});