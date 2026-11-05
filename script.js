document.addEventListener('DOMContentLoaded', () => {
    // Fecha y hora
    const targetDate = new Date('2026-12-25T15:10:00').getTime();

    const daysSpan = document.getElementById('days');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // Cálculo del tiempo
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Mostrar los resultados en el HTML
        daysSpan.textContent = String(days).padStart(2, '0');
        hoursSpan.textContent = String(hours).padStart(2, '0');
        minutesSpan.textContent = String(minutes).padStart(2, '0');
        secondsSpan.textContent = String(seconds).padStart(2, '0');

        // Si la cuenta atrás ha terminado
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = "Esperando siguiente fecha...";
            document.getElementById('bottomImage').style.display = 'none'; // Oculta la imagen inferior cuando termina
        }
    }

    // Actualizar el contador cada segundo
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Llamar a updateCountdown una vez al cargar para evitar el "flash" de 00
    updateCountdown();

});



// ========================================================
// BLOQUE DE NIEVE NAVIDEÑA (FÁCIL DE BORRAR)
// Si quieres quitar la nieve, simplemente borra desde aquí
// hasta el final del archivo.
// ========================================================
(() => {
    const canvas = document.createElement('canvas');
    canvas.id = 'snowCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999'; // Por encima de todo (imágenes y contenedor)
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const maxParticles = 120;

    for (let i = 0; i < maxParticles; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 3 + 1,
            speed: Math.random() * 1.5 + 0.5,
            angle: Math.random() * Math.PI * 2
        });
    }

    let animationFrameId;

    function drawSnow() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.beginPath();
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, true);
        }
        ctx.fill();
        updateSnow();
        animationFrameId = requestAnimationFrame(drawSnow);
    }

    function updateSnow() {
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            p.y += p.speed;
            p.angle += 0.01;
            p.x += Math.sin(p.angle) * 0.5;

            if (p.y > height) {
                particles[i] = {
                    x: Math.random() * width,
                    y: -10,
                    radius: p.radius,
                    speed: p.speed,
                    angle: p.angle
                };
            }
        }
    }

    drawSnow();

    window.stopSnow = function() {
        cancelAnimationFrame(animationFrameId);
        if (canvas && canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
        }
    };
})();