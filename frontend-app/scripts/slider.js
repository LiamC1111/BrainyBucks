document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; 
    
    
    function startSlider() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }
    
    
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }
    
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    
    prevBtn.addEventListener('click', function() {
        prevSlide();
        resetInterval();
    });
    
    nextBtn.addEventListener('click', function() {
        nextSlide();
        resetInterval();
    });
    
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            goToSlide(index);
            resetInterval();
        });
    });
    
   
    function resetInterval() {
        clearInterval(slideInterval);
        startSlider();
    }
    
    
    startSlider();
});