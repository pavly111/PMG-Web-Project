// Booking modal functionality
let currentStep = 1;
let selectedShowtime = null;
let selectedMovie = {};
let selectedSeats = [];
let customerInfo = {};
let basePrice = 0;

// Seat configuration
const seatRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const seatsPerRow = 12;
const occupiedSeats = ['A3', 'A4', 'B7', 'C2', 'D9', 'E5', 'F8', 'G1', 'H6', 'H11'];
const premiumSeats = ['A1', 'A2', 'A11', 'A12', 'B1', 'B2', 'B11', 'B12', 'H1', 'H2', 'H11', 'H12'];

function openBookingModal(title, poster, rating, duration, genre) {
  selectedMovie = { title, poster, rating, duration, genre };
  document.getElementById('bookingModal').classList.add('active');
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalPoster').src = poster;
  document.getElementById('modalRating').textContent = `⭐ ${rating}`;
  document.getElementById('modalDuration').textContent = `🕐 ${duration}`;
  document.getElementById('modalGenre').textContent = `🎭 ${genre}`;
  resetBooking();
}

function closeBookingModal() {
  document.getElementById('bookingModal').classList.remove('active');
}

function resetBooking() {
  currentStep = 1;
  selectedShowtime = null;
  selectedSeats = [];
  customerInfo = {};
  updateStepIndicator();
  document.querySelectorAll('.showtime-card').forEach(card => card.classList.remove('selected'));
  document.getElementById('continueToSeats').disabled = true;
  hideAllSteps();
  showStep('showtimeStep');
}

function selectShowtime(element, time, theater, price) {
  document.querySelectorAll('.showtime-card').forEach(card => card.classList.remove('selected'));
  element.classList.add('selected');
  selectedShowtime = { time, theater, price };
  basePrice = price;
  document.getElementById('continueToSeats').disabled = false;
}

function nextStep() {
  if (currentStep < 4) {
    currentStep++;
    updateStepIndicator();
    
    if (currentStep === 2) {
      generateSeatLayout();
      updateBookingSummary();
    } else if (currentStep === 3) {
      updateFinalSummary();
    } else if (currentStep === 4) {
      updatePaymentTotal();
    }
    
    hideAllSteps();
    showCurrentStep();
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    updateStepIndicator();
    hideAllSteps();
    showCurrentStep();
  }
}

function showCurrentStep() {
  const stepMap = {
    1: 'showtimeStep',
    2: 'seatStep',
    3: 'detailsStep',
    4: 'paymentStep'
  };
  showStep(stepMap[currentStep]);
}

function hideAllSteps() {
  document.querySelectorAll('.step-content').forEach(step => {
    step.style.display = 'none';
  });
}

function showStep(stepId) {
  document.getElementById(stepId).style.display = 'block';
}

function updateStepIndicator() {
  for (let i = 1; i <= 4; i++) {
    const stepElement = document.getElementById('step' + i);
    stepElement.classList.remove('active', 'completed');
    if (i < currentStep) {
      stepElement.classList.add('completed');
    } else if (i === currentStep) {
      stepElement.classList.add('active');
    }
  }
}

function generateSeatLayout() {
  const seatLayoutElement = document.getElementById('seatLayout');
  seatLayoutElement.innerHTML = '';
  
  seatRows.forEach(row => {
    const rowElement = document.createElement('div');
    rowElement.className = 'seat-row';
    
    for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
      const seat = `${row}${seatNum}`;
      if (seatNum === 6 || seatNum === 7) {
        const spacer = document.createElement('div');
        spacer.className = 'seat invisible';
        spacer.textContent = '';
        rowElement.appendChild(spacer);
      }
      const seatElement = document.createElement('button');
      seatElement.className = 'seat';
      seatElement.textContent = seat;
      seatElement.onclick = () => toggleSeat(seat, seatElement);
      if (occupiedSeats.includes(seat)) {
        seatElement.classList.add('occupied');
        seatElement.disabled = true;
      } else if (premiumSeats.includes(seat)) {
        seatElement.classList.add('premium');
      } else {
        seatElement.classList.add('available');
      }
      if (selectedSeats.includes(seat)) {
        seatElement.classList.remove('available', 'premium');
        seatElement.classList.add('selected');
      }
      rowElement.appendChild(seatElement);
    }
    seatLayoutElement.appendChild(rowElement);
  });
}

function toggleSeat(seatId, element) {
  if (occupiedSeats.includes(seatId) || seatId === '') return;
  if (selectedSeats.includes(seatId)) {
    selectedSeats = selectedSeats.filter(seat => seat !== seatId);
    element.classList.remove('selected');
    if (premiumSeats.includes(seatId)) {
      element.classList.add('premium');
    } else {
      element.classList.add('available');
    }
  } else {
    if (selectedSeats.length < 8) {
      selectedSeats.push(seatId);
      element.classList.remove('available', 'premium');
      element.classList.add('selected');
    }
  }
  updateBookingSummary();
}

function updateBookingSummary() {
  const ticketCount = selectedSeats.length;
  let subtotal = 0;
  selectedSeats.forEach(seat => {
    if (premiumSeats.includes(seat)) {
      subtotal += basePrice + 5;
    } else {
      subtotal += basePrice;
    }
  });
  const serviceFee = subtotal * 0.1;
  const total = subtotal + serviceFee;
  document.getElementById('selectedSeatsDisplay').textContent = selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None';
  document.getElementById('ticketCount').textContent = ticketCount;
  document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
  document.getElementById('serviceFee').textContent = '$' + serviceFee.toFixed(2);
  document.getElementById('totalPrice').textContent = '$' + total.toFixed(2);
  document.getElementById('continueToDetails').disabled = selectedSeats.length === 0;
}

function updateFinalSummary() {
  document.getElementById('finalShowtime').textContent = selectedShowtime.time;
  document.getElementById('finalTheater').textContent = selectedShowtime.theater;
  document.getElementById('finalSeats').textContent = selectedSeats.join(', ');
  document.getElementById('finalTotal').textContent = document.getElementById('totalPrice').textContent;
}

function updatePaymentTotal() {
  document.getElementById('paymentTotal').textContent = document.getElementById('totalPrice').textContent;
}

function validateCustomerDetails() {
  const name = document.getElementById('customerName').value.trim();
  const email = document.getElementById('customerEmail').value.trim();
  const isValid = name.length > 0 && email.includes('@');
  document.getElementById('continueToPayment').disabled = !isValid;
  if (isValid) {
    customerInfo = { name, email };
  }
}

function processPayment() {
  document.getElementById('paymentForm').style.display = 'none';
  document.getElementById('loadingState').style.display = 'block';
  setTimeout(() => {
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('successState').style.display = 'block';
    document.getElementById('bookingId').textContent = 'PMG-' + Date.now();
    document.getElementById('successShowtime').textContent = selectedShowtime.time;
    document.getElementById('successTheater').textContent = selectedShowtime.theater;
    document.getElementById('successSeats').textContent = selectedSeats.join(', ');
    document.getElementById('successCustomer').textContent = customerInfo.name;
    document.getElementById('successTotal').textContent = document.getElementById('totalPrice').textContent;
    createCelebrationEffect();
  }, 2000);
}

function createCelebrationEffect() {
  const colors = ['#ffbf00', '#2ec4b6', '#c44536', '#96ceb4', '#feca57'];
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = '50%';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '10000';
      confetti.style.animation = 'confettiFall 3s linear forwards';
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }, i * 50);
  }
}

// Card flip functionality
document.addEventListener('DOMContentLoaded', function() {
  const radioButtons = document.querySelectorAll('input[type="radio"][name="card"]');
  const prevBtn = document.querySelector('.arrow-left');
  const nextBtn = document.querySelector('.arrow-right');
  const items = document.querySelectorAll('.cards .item');
  let currentIndex = 0;
  const totalSlides = radioButtons.length;

  function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    radioButtons[currentIndex].checked = true;
    items.forEach(item => item.classList.remove('flipped'));
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function rotateCarousel() {
    nextSlide();
  }

  let rotationInterval = setInterval(rotateCarousel, 2000);

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
  });

  function resetInterval() {
    clearInterval(rotationInterval);
    rotationInterval = setInterval(rotateCarousel, 2000);
  }

  const carousel = document.querySelector('.slider');
  carousel.addEventListener('mouseenter', () => clearInterval(rotationInterval));
  carousel.addEventListener('mouseleave', () => resetInterval());

  radioButtons.forEach((radio, index) => {
    radio.addEventListener('change', () => {
      currentIndex = index;
      items.forEach(item => item.classList.remove('flipped'));
    });
  });

  items.forEach(item => {
    item.addEventListener('click', function() {
      this.classList.toggle('flipped');
      const inputId = this.getAttribute('for');
      if (inputId) {
        document.getElementById(inputId).checked = true;
        currentIndex = Array.from(radioButtons).findIndex(rb => rb.id === inputId);
      }
      resetInterval();
    });
  });

  // Form validation
  document.getElementById('customerName').addEventListener('input', validateCustomerDetails);
  document.getElementById('customerEmail').addEventListener('input', validateCustomerDetails);
  
  // Modal close functionality
  document.getElementById('bookingModal').addEventListener('click', function(e) {
    if (e.target === this) closeBookingModal();
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeBookingModal();
  });
}); 