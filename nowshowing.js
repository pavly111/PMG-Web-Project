const listItems = document.querySelectorAll('.list-item');
const moviePosterImg = document.getElementById('movie-poster-img');
const movieTitle = document.getElementById('movie-title');
const movieGenre = document.getElementById('movie-genre');
const movieDuration = document.getElementById('movie-duration');
const movieRating = document.getElementById('movie-rating');
const movieDescription = document.getElementById('movie-description');
const movieDetails = document.querySelector('.movie-details');


listItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const movieImage = this.getAttribute('data-movie-image');
        const title = this.getAttribute('data-movie-title');
        const genre = this.getAttribute('data-movie-genre');
        const duration = this.getAttribute('data-movie-duration');
        const rating = this.getAttribute('data-movie-rating');
        const description = this.getAttribute('data-movie-description');
        if (movieImage) {
            document.documentElement.style.setProperty('--bg-image', `url("${movieImage}")`);
        }
        if (movieTitle) movieTitle.textContent = title;
        if (movieGenre) movieGenre.textContent = `Genre: ${genre}`;
        if (movieDuration) movieDuration.textContent = `Duration: ${duration}`;
        if (movieRating) movieRating.textContent = `Rating: ${rating}`;
        if (movieDescription) movieDescription.textContent = description;
        
        const movieDetails = document.querySelector('.movie-details');
        const defualtText = document.querySelector('.default-text');
        if (movieDetails) {
            movieDetails.style.opacity = '0';
            movieDetails.style.transition = 'all 0.3s ease-in-out';
            defualtText.style.transition = 'all 0.3s ease-in-out';
            setTimeout(() => {
                movieDetails.style.opacity = '1';
                movieDetails.style.transform = 'translateY(0)';
                movieDetails.style.transform = 'translateX(0)';
                movieDetails.style.display = 'flex';
                defualtText.style.display = 'none';

            }, 50);
        }
    });
    
//     // Mouse leave event - restore the original background
//     item.addEventListener('mouseleave', function() {
//         // Reset the background image to none
//         document.documentElement.style.setProperty('--bg-image', 'none');
//     });
});

const sliderWrapper = document.querySelector('.slider-wrapper');
const items = document.querySelectorAll('.list-item');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;
const itemWidth = 192; 
const visibleItems = Math.floor((window.innerWidth - 100) / itemWidth); 

function initSlider() {
    updateSlider();
    updateButtons();
}

function updateSlider() {
    const translateX = -currentIndex * itemWidth;
    sliderWrapper.style.transform = `translateX(${translateX}px)`;
}

function updateButtons() {
    prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
    nextBtn.style.opacity = currentIndex >= items.length - visibleItems ? '0.5' : '1';
}

nextBtn.addEventListener('click', () => {
    if (currentIndex < items.length - visibleItems) {
        currentIndex++;
        updateSlider();
        updateButtons();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
        updateButtons();
    }
});

document.addEventListener('DOMContentLoaded', initSlider);
window.addEventListener('resize', () => {
    const newVisibleItems = Math.floor((window.innerWidth - 100) / itemWidth);
    if (newVisibleItems !== visibleItems) {
        currentIndex = Math.min(currentIndex, items.length - newVisibleItems);
        updateSlider();
        updateButtons();
    }
});