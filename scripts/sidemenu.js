const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

// Función para abrir el menú
function openMenu() {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
}

// Función para cerrar el menú
function closeMenu() {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
}

// Eventos
menuToggle.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
sidebarOverlay.addEventListener('click', closeMenu);
