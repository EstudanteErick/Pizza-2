function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    
    if (menuMobile.classList.contains('active')) {
        menuMobile.classList.remove('active');
    } else {
        menuMobile.classList.add('active');
    }
}

// Fechar menu ao clicar em um link
document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.mobile-menu').classList.remove('active');
    });
});

// Fechar menu ao redimensionar a tela
window.addEventListener('resize', () => {
    if (window.innerWidth > 991) {
        document.querySelector('.mobile-menu').classList.remove('active');
    }
});