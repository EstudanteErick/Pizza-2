// Cache de elementos DOM para melhor performance
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.mobile-menu .nav-link');

// Função otimizada para toggle do menu
function menuShow() {
    mobileMenu?.classList.toggle('active');
}

// Otimização com event delegation
document.addEventListener('DOMContentLoaded', () => {
    // Fechar menu ao clicar em links (event delegation)
    mobileMenu?.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
            mobileMenu.classList.remove('active');
        }
    });
    
    // Scroll suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Lazy loading para imagens (se suportado)
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Debounce função para otimizar resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Fechar menu ao redimensionar (com debounce)
window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 991) {
        mobileMenu?.classList.remove('active');
    }
}, 250));