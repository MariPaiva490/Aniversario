// CONFETES E MÚSICA
function lancarConfete() {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      // Confetes em Branco e Verde Limão
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#ffffff', '#39ff14'] });
      // Confetes em Preto e Roxo Neon
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#000000', '#9d00ff'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
}

function celebrar() {
    lancarConfete();
    document.getElementById("musica").play();
    setTimeout(() => {
        document.getElementById("secao-fotos").scrollIntoView({ behavior: 'smooth' });
    }, 500);
}

// CARTA MODAL
function toggleCarta() {
    document.getElementById("sessaoCarta").classList.toggle("hidden");
}

// ZOOM DE FOTOS
const modalZoom = document.getElementById('foto-modal');
const imgAmpliada = document.getElementById('foto-ampliada');
const legendaAmpliada = document.getElementById('legenda-ampliada');

document.querySelectorAll('.foto-card').forEach(card => {
    card.addEventListener('click', function() {
        const style = window.getComputedStyle(this);
        const url = style.backgroundImage.slice(5, -2).replace(/"/g, "");
        const legenda = this.querySelector('span') || this.querySelector('.caption');
        
        imgAmpliada.src = url;
        legendaAmpliada.innerText = legenda ? legenda.innerText : "";
        modalZoom.style.display = 'flex';
    });
});

function fecharZoom() {
    modalZoom.style.display = 'none';
}

// CONTAGEM REGRESSIVA
function updateCountdown() {
    const target = new Date("April 28, 2026 00:00:00").getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff < 0) {
        document.getElementById("countdown").innerHTML = "<h2 class='gradient-text'>É O TEU DIA! 😍</h2>";
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("days").innerText = d.toString().padStart(2, '0');
    document.getElementById("hours").innerText = h.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = m.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// SISTEMA DE CARROSSEL INDEPENDENTE
const controlesSlider = {
    'toji-slider': { current: 0 },
    'noelle-slider': { current: 0 },
    'jornada-slider': { current: 0 }
};

function moveSlide(sliderId, step) {
    const container = document.getElementById(sliderId);
    if (!container) return;

    const slider = container.querySelector('.slider');
    const slides = container.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    controlesSlider[sliderId].current = (controlesSlider[sliderId].current + step + slides.length) % slides.length;
    slider.style.transform = `translateX(-${controlesSlider[sliderId].current * 100}%)`;
}

setInterval(() => {
    moveSlide('toji-slider', 1);
    moveSlide('noelle-slider', 1);
    moveSlide('jornada-slider', 1);
}, 5000);

// =========================================
// NOVAS FUNCIONALIDADES DE UI (PREMIUM)
// =========================================

// 1. Animação de Scroll (Fade-in ao rolar a página)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 }); 

document.querySelectorAll('.anime-up').forEach((el) => observer.observe(el));

// 2. Botão Voltar ao Topo
const btnTopo = document.getElementById("btn-topo");

window.onscroll = function() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        btnTopo.style.display = "flex"; 
    } else {
        btnTopo.style.display = "none";
    }
};

function voltarAoTopo() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}