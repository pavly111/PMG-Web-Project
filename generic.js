document.addEventListener('DOMContentLoaded', function() {
  const radioButtons = document.querySelectorAll('input[type="radio"][name="card"]');
  const prevBtn = document.querySelector('.arrow-left');
  const nextBtn = document.querySelector('.arrow-right');
  let currentIndex = 0;
  const totalSlides = radioButtons.length;
  
  function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides; // Handle wrap-around
    radioButtons[currentIndex].checked = true;
  }
  
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }
  
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }
  
  // Automatic rotation
  function rotateCarousel() {
    nextSlide();
  }
  
  let rotationInterval = setInterval(rotateCarousel, 4000);
  
  // Arrow navigation
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
  });
  
  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
  });
  
  // Reset interval on manual navigation
  function resetInterval() {
    clearInterval(rotationInterval);
    rotationInterval = setInterval(rotateCarousel, 4000);
  }
  
  // Pause on hover
  const carousel = document.querySelector('.slider');
  carousel.addEventListener('mouseenter', () => clearInterval(rotationInterval));
  carousel.addEventListener('mouseleave', () => {
    resetInterval();
  });
  
  // Update on manual navigation
  radioButtons.forEach((radio, index) => {
    radio.addEventListener('change', () => {
      currentIndex = index;
    });
  });
});