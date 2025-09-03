// Mobile Hamburger Menu
// Get elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-links a');

// Toggle both hamburger and menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
navItems.forEach(item => {
  item.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});



// Sign-up validation
document.getElementById('signupForm').addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const plan = document.getElementById('plan').value;

  if(!name || !email || !phone || !plan) {
    alert('Please fill in all fields.');
    return false;
  }
  if(!/\S+@\S+\.\S+/.test(email)) {
    alert('Invalid email address.');
    return false;
  }
  alert('Thank you for signing up, ' + name + '!');
  return true;
});

// BMI Calculator
document.getElementById('bmiForm').addEventListener('submit', function(e){
  e.preventDefault();
  const height = parseFloat(document.getElementById('height').value)/100;
  const weight = parseFloat(document.getElementById('weight').value);
  const bmi = (weight / (height * height)).toFixed(1);
  let category = "";
  let color = "black";

  if(bmi < 18.5) { category="Underweight"; color="blue"; }
  else if(bmi < 24.9) { category="Normal"; color="green"; }
  else if(bmi < 29.9) { category="Overweight"; color="orange"; }
  else { category="Obese"; color="red"; }

  document.getElementById('bmiResult').innerHTML = 
    `Your BMI: <span style="color:${color}">${bmi}</span> (${category})`;
});

// Animated Counters
const counters = document.querySelectorAll('.counter');
const speed = 200; // lower = faster

const animateCounters = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = Math.ceil(target / speed);

      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target + "+";
      }
    };
    updateCount();
  });
};

// Run when stats section comes into view
let statsPlayed = false;
window.addEventListener('scroll', () => {
  const statsSection = document.querySelector('.stats');
  const sectionTop = statsSection.offsetTop;
  const sectionHeight = statsSection.offsetHeight;
  const scrollY = window.scrollY + window.innerHeight;

  if (!statsPlayed && scrollY > sectionTop + sectionHeight / 4) {
    animateCounters();
    statsPlayed = true;
  }
});

document.getElementById('calcBurn').addEventListener('click', () => {
  const mins = +document.getElementById('minutes').value;
  const burn = mins * 8; // approximate 8 calories/min
  document.getElementById('burnResult').innerText = `~${burn} kcal burned`;
});

document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    item.classList.toggle('active');
  });
});

window.addEventListener('scroll', () => {
  const statsSection = document.querySelector('.stats');
  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 50) {
    animateCounters();
  }
}, { once: true });

// Testimonials Carousel with Dots
const testimonials = document.querySelectorAll(".testimonial-card");
const dots = document.querySelectorAll(".dot");
let index = 0;
let interval;

function showTestimonial(i) {
  testimonials.forEach((card, idx) => {
    card.classList.toggle("active", idx === i);
    dots[idx].classList.toggle("active", idx === i);
  });
  index = i;
}

function nextTestimonial() {
  index = (index + 1) % testimonials.length;
  showTestimonial(index);
}

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    showTestimonial(i);
    resetInterval();
  });
});

function startInterval() {
  interval = setInterval(nextTestimonial, 4000); // Auto-slide every 4s
}

function resetInterval() {
  clearInterval(interval);
  startInterval();
}

// Start carousel
showTestimonial(index);
startInterval();

// Before & After Slider
const baContainer = document.querySelector('.ba-container');
const afterWrapper = document.querySelector('.after-wrapper');
const handle = document.querySelector('.slider-handle');

if (baContainer) {
  baContainer.addEventListener('mousemove', (e) => {
    let rect = baContainer.getBoundingClientRect();
    let x = e.clientX - rect.left;

    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    afterWrapper.style.width = `${x}px`;
    handle.style.left = `${x}px`;
  });

  // Touch support (mobile)
  baContainer.addEventListener('touchmove', (e) => {
    let rect = baContainer.getBoundingClientRect();
    let x = e.touches[0].clientX - rect.left;

    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    afterWrapper.style.width = `${x}px`;
    handle.style.left = `${x}px`;
  });
}
