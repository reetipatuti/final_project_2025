const track = document.querySelector('.carousel-track');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const cards = document.querySelectorAll('.carousel-card');

let currentSlide = 0;

function updateCarousel() {
  const slideWidth = cards[0].offsetWidth + 16; 
  track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

function getVisibleCards() {
  const carousel = document.querySelector('.carousel');
  const cardWidth = cards[0].offsetWidth + 16;
  return Math.floor(carousel.offsetWidth / cardWidth);
}

prev.addEventListener('click', () => {
  if (currentSlide > 0) {
    currentSlide--;
    updateCarousel();
  }
});

next.addEventListener('click', () => {
  const visibleCards = getVisibleCards();
  const maxSlide = cards.length - visibleCards;
  if (currentSlide < maxSlide) {
    currentSlide++;
    updateCarousel();
  }
});

window.addEventListener('resize', () => {
  updateCarousel();
});

document.addEventListener('DOMContentLoaded', () => {
  updateCarousel();
});
// Photo stack auto animation for mobile/tablet
const photoCards = document.querySelectorAll('.photo-card');
let activeIndex = 0;
let intervalId = null;

function activatePhoto(index) {
  const spacing = window.innerWidth <= 375 ? 35 : 50;
  const centerShift = window.innerWidth >= 900 ? -2 : 0; // Apply -2 shift only on desktop

  photoCards.forEach((card, i) => {
    card.style.zIndex = i;
    card.style.transform = `translateX(calc((var(--i) ${centerShift < 0 ? '-' : '+'} ${Math.abs(centerShift)}) * ${spacing}px)) rotateZ(calc((var(--i) ${centerShift < 0 ? '-' : '+'} ${Math.abs(centerShift)}) * 2deg))`;
    card.style.filter = 'none';
  });

  const activeCard = photoCards[index];
  activeCard.style.zIndex = 10;
  activeCard.style.transform = `translateX(calc((var(--i) ${centerShift < 0 ? '-' : '+'} ${Math.abs(centerShift)}) * ${spacing}px)) translateY(-30px) scale(1.05)`;

  photoCards.forEach((card, i) => {
    if (i !== index) {
      card.style.transform = `translateX(calc((var(--i) ${centerShift < 0 ? '-' : '+'} ${Math.abs(centerShift)}) * ${spacing}px)) scale(0.95) translateY(10px)`;
      card.style.filter = 'brightness(0.9)';
    }
  });
}


function startAutoPhotoStack() {
  if (intervalId !== null) return; // avoid multiple intervals
  intervalId = setInterval(() => {
    activeIndex = (activeIndex + 1) % photoCards.length;
    activatePhoto(activeIndex);
  }, 2000); // change image every 2 seconds
}

function stopAutoPhotoStack() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function checkScreenAndRunPhotoStack() {
  const isMobileOrTablet = window.innerWidth < 900;
  if (isMobileOrTablet) {
    startAutoPhotoStack();
  } else {
    stopAutoPhotoStack();
  }
}

window.addEventListener('resize', checkScreenAndRunPhotoStack);
document.addEventListener('DOMContentLoaded', () => {
  checkScreenAndRunPhotoStack();
});

// Footer
document.addEventListener("DOMContentLoaded", function() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
