const themeToggle = document.getElementById('themeToggle');
const moonIcon = document.querySelector('.moon-icon');
const sunIcon = document.querySelector('.sun-icon');

// 1. Comprobar si el usuario ya tenía guardada una preferencia previa
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
}

// 2. Función para alternar el modo nocturno
themeToggle.addEventListener('click', () => {
    // Alternar la clase en el body
    document.body.classList.toggle('dark-mode');
    
    // Verificar qué modo está activo actualmente
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        // Mostrar icono de Sol, ocultar Luna
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
        // Guardar preferencia
        localStorage.setItem('theme', 'dark');
    } else {
        // Mostrar icono de Luna, ocultar Sol
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
        // Guardar preferencia
        localStorage.setItem('theme', 'light');
    }
});
