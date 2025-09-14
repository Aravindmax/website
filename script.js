const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// script.js (replace your old file)
const slides = document.querySelector(".slides");
const slideElems = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");

let index = 0;
let autoInterval;
const AUTO_DELAY = 6000;
const SWIPE_THRESHOLD = 50; // px

// Create dots
slideElems.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.className = "dot";
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll(".dot");

function updateSlide() {
  slides.style.transform = `translateX(${-index * 100}%)`;
  dots.forEach(d => d.classList.remove("active"));
  dots[index].classList.add("active");
}

function nextSlide() { index = (index + 1) % slideElems.length; updateSlide(); }
function prevSlide() { index = (index - 1 + slideElems.length) % slideElems.length; updateSlide(); }
function goToSlide(i) { index = i; updateSlide(); resetAuto(); }

function startAuto() { autoInterval = setInterval(nextSlide, AUTO_DELAY); }
function stopAuto() { clearInterval(autoInterval); }
function resetAuto() { stopAuto(); startAuto(); }

// Buttons
next.addEventListener("click", () => { nextSlide(); resetAuto(); });
prev.addEventListener("click", () => { prevSlide(); resetAuto(); });

// Touch support
let startX = 0;
let isDragging = false;

slides.addEventListener("touchstart", e => {
  stopAuto();
  startX = e.touches[0].clientX;
  isDragging = true;
}, { passive: true });

slides.addEventListener("touchend", e => {
  if (!isDragging) return;
  const endX = e.changedTouches[0].clientX;
  const delta = endX - startX;
  if (delta > SWIPE_THRESHOLD) prevSlide();
  else if (delta < -SWIPE_THRESHOLD) nextSlide();
  resetAuto();
  isDragging = false;
}, { passive: true });

// Init
updateSlide();
startAuto();

