// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const menuHamburguer = document.querySelector('.menu-hamburguer');
    const mobileMenu = document.querySelector('.menu-mobile');

    menuHamburguer.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
});
