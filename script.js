// Smooth-scroll to any section by ID
function scrollTo(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Handle all anchor links: smooth-scroll and close the mobile menu
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    var target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
    document.getElementById('navbar').classList.remove('open');
  });
});

// Reveal elements as they scroll into view
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(function(el) {
  observer.observe(el);
});

// Build a WhatsApp message from the booking form and open it
function handleBooking() {
  var checkin  = document.getElementById('checkin').value;
  var checkout = document.getElementById('checkout').value;
  var guests   = document.getElementById('guests').value;

  if (!checkin || !checkout) {
    alert('Please select check-in and check-out dates.');
    return;
  }

  var message =
    'Hello, I would like to book a room at Beteket Hotel.\n' +
    'Check-in: '  + checkin  + '\n' +
    'Check-out: ' + checkout + '\n' +
    'Guests: '    + guests   + '\n' +
    'Please confirm availability and rates. Thank you!';

  // ★ Replace 251000000000 with the real WhatsApp number ★
  window.open('https://wa.me/251000000000?text=' + encodeURIComponent(message), '_blank');
}

// Helper: format a Date as YYYY-MM-DD
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Pre-fill check-in with today and check-out with tomorrow
var today    = new Date();
var tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

var checkinInput  = document.getElementById('checkin');
var checkoutInput = document.getElementById('checkout');

checkinInput.value  = formatDate(today);
checkoutInput.value = formatDate(tomorrow);
checkinInput.min    = formatDate(today);
checkoutInput.min   = formatDate(tomorrow);

// When check-in changes, push check-out forward if needed
checkinInput.addEventListener('change', function() {
  var nextDay = new Date(this.value);
  nextDay.setDate(nextDay.getDate() + 1);

  checkoutInput.min = formatDate(nextDay);

  if (checkoutInput.value <= this.value) {
    checkoutInput.value = formatDate(nextDay);
  }
});
