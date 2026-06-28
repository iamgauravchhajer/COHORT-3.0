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
    const userExists = users.some(u => u.username === username);    
    if (userExists) {
        alert('Username already exists!');
    } else {
        window.saveUser({ username, password });
        alert('Account created successfully!');
        window.location.href = '../index.html';
    }
});
