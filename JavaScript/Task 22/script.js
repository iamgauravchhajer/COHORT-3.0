window.getUsers = function() {
    return JSON.parse(localStorage.getItem('users')) || [];
};

window.saveUser = function(user) {
    const users = window.getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
};

window.setCurrentUser = function(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
};

window.getCurrentUser = function() {
    return JSON.parse(localStorage.getItem('currentUser')) || null;
};
