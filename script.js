let volunteerData = [];

// Show a specific page and hide others
function showPage(pageId) {
  const pages = ['loginPage', 'homePage', 'interestPage', 'optionsPage', 'thanksPage'];
  pages.forEach((page) => {
    document.getElementById(page).style.display = page === pageId ? 'block' : 'none';
  });
}

// Login Form Submission
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  localStorage.setItem('username', username);
  localStorage.setItem('email', email);
  showPage('homePage');
});

// Interest Form Submission
document.getElementById('interestForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const interests = document.getElementById('interests').value;
  const hobbies = document.getElementById('hobbies').value;
  const places = document.getElementById('places').value;
  const days = document.getElementById('days').value;
  volunteerData.push({ interests, hobbies, places, days });
  localStorage.setItem('volunteerData', JSON.stringify(volunteerData));
  showPage('optionsPage');
  displayOptions();
});

// Display Volunteer Options
function displayOptions() {
  const optionsList = document.getElementById('optionsList');
  const options = [
    'Christmas in Goa',
    'Diwali in Ayodhya',
    'Tomatina in Spain',
    'Pongal in Tamil Nadu',
    'Holi in Mathura',
  ];
  optionsList.innerHTML = options.map((option) => `
    <div class="opportunity">
      <h3>${option}</h3>
      <button onclick="selectOption('${option}')">Select</button>
    </div>
  `).join('');
}

// Store selected option in Local Storage
function selectOption(option) {
  localStorage.setItem('selectedOption', option);
  showPage('thanksPage');
  displayThankYouMessage();
}

// Display thank you message with selected option
function displayThankYouMessage() {
  const selectedOption = localStorage.getItem('selectedOption');
  const thankYouMessage = document.getElementById('thank-you-message');
  thankYouMessage.innerHTML = `
    <p>Thanks for showing interest in <strong>${selectedOption}</strong>. Kindly wait for your reply, which will be provided on your email.</p>
  `;
}

// Initialize the login page
showPage('loginPage');