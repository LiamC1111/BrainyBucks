
document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('year').textContent = new Date().getFullYear();
    
    
    const toggleMenu = document.getElementById('toggle-menu');
    const navList = document.getElementById('nav-list');
    
    toggleMenu.addEventListener('click', function() {
        navList.classList.toggle('active');
    });
    
    
    const tooltipLinks = document.querySelectorAll('.tooltip-link');
    const tooltip = document.getElementById('tooltip');
    
    tooltipLinks.forEach(link => {
        link.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            tooltip.textContent = tooltipText;
            tooltip.style.left = e.pageX + 'px';
            tooltip.style.top = (e.pageY + 20) + 'px';
            tooltip.style.visibility = 'visible';
            tooltip.style.opacity = '1';
        });
        
        link.addEventListener('mouseleave', function() {
            tooltip.style.visibility = 'hidden';
            tooltip.style.opacity = '0';
        });
        
        link.addEventListener('mousemove', function(e) {
            tooltip.style.left = e.pageX + 'px';
            tooltip.style.top = (e.pageY + 20) + 'px';
        });
    });
    
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});