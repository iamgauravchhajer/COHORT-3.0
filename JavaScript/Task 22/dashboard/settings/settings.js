const usernameSpan = document.querySelector('.user-profile span');
const logoutBtn = document.querySelector('.logout-btn');
const toggleTrack = document.querySelector('.toggle-track');
const settingsForm = document.querySelector('.settings-form');
const fullNameInput = document.getElementById('fullNameInput');
const currencySelect = document.getElementById('currencySelect');

(function checkSession() {
    const currentUser = window.getCurrentUser();
    if (!currentUser) {
        alert('Please login first!');
        window.location.href = '../../index.html';
        return;
    }
    usernameSpan.textContent = currentUser.username;
    fullNameInput.value = currentUser.username;
    currencySelect.value = currentUser.currency || 'USD';
    loadTheme();
})();

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        toggleTrack.classList.add('active');
        document.body.classList.add('dark-mode');
    } else {
        toggleTrack.classList.remove('active');
        document.body.classList.remove('dark-mode');
    }
}

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    alert('Logged out successfully!');
    window.location.href = '../../index.html';
});

toggleTrack.addEventListener('click', () => {
    toggleTrack.classList.toggle('active');
    const isDark = toggleTrack.classList.contains('active');
    const theme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    if (isDark) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

settingsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newUsername = fullNameInput.value.trim();
    const selectedCurrency = currencySelect.value;
    if (newUsername === '') {
        alert('Username cannot be empty!');
        return;
    }
    const currentUser = window.getCurrentUser();
    const oldUsername = currentUser.username;
    currentUser.username = newUsername;
    currentUser.currency = selectedCurrency;
    window.setCurrentUser(currentUser);
    const users = window.getUsers();
    users.forEach((u) => {
        if (u.username === oldUsername) {
            u.username = newUsername;
            u.currency = selectedCurrency;
        }
    });
    localStorage.setItem('users', JSON.stringify(users));
    usernameSpan.textContent = newUsername;
    alert('Settings updated successfully!');
});