const form = document.querySelector('form');
const usernameInput = document.querySelector('input[type="text"]');
const passwordInput = document.querySelector('input[type="password"]');

form.addEventListener('submit', function(e) {
    e.preventDefault();    
    const username = usernameInput.value;
    const password = passwordInput.value; 
    if (username.trim() === '' || password.trim() === '') {
        alert('Please fill in all fields!');
        return;
    }   
    const users = window.getUsers();
    const foundUser = users.find(u => u.username === username && u.password === password);    
    if (foundUser) {
        window.setCurrentUser(foundUser);
        alert('Login successful!');
        window.location.href = 'dashboard/dashboard.html';
    } else {
        alert('Invalid username or password!');
    }
});
