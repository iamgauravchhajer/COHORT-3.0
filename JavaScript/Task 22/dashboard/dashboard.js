const usernameSpan = document.querySelector('.user-profile span');
const logoutBtn = document.querySelector('.logout-btn');
const addBtn = document.querySelector('.add-btn');
const modal = document.getElementById('transactionModal');
const closeBtn = document.getElementById('closeModalBtn');
const modalForm = document.querySelector('.modal-body');
const tbody = document.querySelector('tbody');
const statValues = document.querySelectorAll('.stat-card .stat-value');
const searchInput = document.querySelector('.search-box input');
const submitBtn = modalForm.querySelector(".save-btn");
const categoryFilter = document.getElementById('categoryFilter');
const toggleTrack = document.querySelector('.toggle-track');
const btnClearAll = document.getElementById('btnClearAll');
const chartBody = document.querySelector('.chart-body');

let transactionData = JSON.parse(localStorage.getItem('transactions')) || [];

(function checkSession() {
    const currentUser = window.getCurrentUser();
    if (!currentUser) {
        alert('Please login first!');
        window.location.href = '../index.html';
        return;
    }
    usernameSpan.textContent = currentUser.username;
    renderTransaction();
    updateStats();
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

function renderTransaction(dataToRender = transactionData) {
    tbody.innerHTML = '';

    dataToRender.forEach(function (item) {
        const tr = document.createElement('tr');
        const tdDate = document.createElement('td');
        const tdDesc = document.createElement('td');
        const tdCategory = document.createElement('td');
        const tdAmount = document.createElement('td');
        const tdType = document.createElement('td');
        const spanType = document.createElement('span');
        const tdAction = document.createElement('td');
        const divActions = document.createElement('div');
        const btnEdit = document.createElement('button');
        const btnDelete = document.createElement('button');
        const iEdit = document.createElement('idx');
        const iDelete = document.createElement('idx');

        if (item.type === 'Expense') {
            tdAmount.classList.add('expense');
            spanType.classList.add('type-badge', 'expense');
        } else {
            tdAmount.classList.add('income');
            spanType.classList.add('type-badge', 'income');
        }
        divActions.classList.add('actions');
        btnEdit.classList.add('action-btn', 'edit-btn');
        btnDelete.classList.add('action-btn', 'delete-btn');
        iEdit.classList.add('ri-edit-box-line');
        iDelete.classList.add('ri-delete-bin-line');

        btnEdit.setAttribute('type', 'button');
        btnDelete.setAttribute('type', 'button');

        tdDate.textContent = item.date;
        tdDesc.textContent = item.description;
        tdCategory.textContent = item.category;
        const userSymbol = getCurrencySymbol();
        if (item.type === 'Expense') {
            tdAmount.textContent = '-' + userSymbol + parseFloat(item.amount).toFixed(2);
        } else {
            tdAmount.textContent = '+' + userSymbol + parseFloat(item.amount).toFixed(2);
        }
        spanType.textContent = item.type;

        btnEdit.appendChild(iEdit);
        btnDelete.appendChild(iDelete);
        divActions.appendChild(btnEdit);
        divActions.appendChild(btnDelete);
        tdAction.appendChild(divActions);
        tdType.appendChild(spanType);
        tr.appendChild(tdDate);
        tr.appendChild(tdDesc);
        tr.appendChild(tdCategory);
        tr.appendChild(tdAmount);
        tr.appendChild(tdType);
        tr.appendChild(tdAction);
        tbody.appendChild(tr);

        btnDelete.addEventListener('click', () => {
            deleteTransaction(item);
        });

        btnEdit.addEventListener('click', () => {
            editTransaction(item);
        });
    });

    renderChart();
}

function updateStats() {
    let income = 0;
    let expense = 0;
    transactionData.forEach((item) => {
        const amt = parseFloat(item.amount) || 0;
        if (item.type === 'Income') {
            income += amt;
        } else if (item.type === 'Expense') {
            expense += amt;
        }
    });
    let balance = income - expense;
    const userSymbol = getCurrencySymbol();
    const balanceSign = balance < 0 ? '-' : '';
    if (statValues.length >= 4) {
        statValues[0].textContent = balanceSign + userSymbol + Math.abs(balance).toFixed(2);
        statValues[1].textContent = userSymbol + income.toFixed(2);
        statValues[2].textContent = userSymbol + expense.toFixed(2);
        statValues[3].textContent = transactionData.length;
    }
}

function getCurrencySymbol() {
    const currentUser = window.getCurrentUser();
    const userCurrency = currentUser && currentUser.currency ? currentUser.currency : 'USD';
    const currencySymbols = {
        'USD': '$',
        'INR': '₹',
        'EUR': '€',
        'GBP': '£',
        'JPY': '¥'
    };
    return currencySymbols[userCurrency] || '$';
}

function deleteTransaction(transaction) {
    const index = transactionData.indexOf(transaction);
    transactionData.splice(index, 1);
    localStorage.setItem('transactions', JSON.stringify(transactionData));
    renderTransaction();
    updateStats();
}

function editTransaction(transaction) {
    modal.style.display = "flex";
    document.getElementById('transactionType').value = transaction.type;
    document.getElementById('transactionDesc').value = transaction.description;
    document.getElementById('transactionAmount').value = transaction.amount;
    document.getElementById('transactionDate').value = transaction.date;
    document.getElementById('transactionCategory').value = transaction.category;
    document.querySelector(".modal-header h2").innerText = "EDIT TRANSACTION";
    submitBtn.onclick = (e) => {
        e.preventDefault();
        const type = document.getElementById('transactionType').value;
        const description = document.getElementById('transactionDesc').value;
        const amount = document.getElementById('transactionAmount').value;
        const date = document.getElementById('transactionDate').value;
        const category = document.getElementById('transactionCategory').value;
        if (type.trim() === '' || description.trim() === '' || amount.trim() === '' || date.trim() === '' || category.trim() === '') {
            alert('Please fill all the fields!');
            return;
        }
        transaction.type = type;
        transaction.description = description;
        transaction.amount = amount;
        transaction.date = date;
        transaction.category = category;
        localStorage.setItem("transactions", JSON.stringify(transactionData));
        renderTransaction();
        updateStats();
        closeEditModal();
    };
    closeBtn.onclick = () => {
        modal.style.display = "none";
        modalForm.reset();
        document.querySelector(".modal-header h2").innerText = "ADD TRANSACTION";
        submitBtn.onclick = null;
    }
}

function renderChart() {
    if (!chartBody) {
        return;
    }
    chartBody.innerHTML = '';
    let income = 0;
    let expense = 0;
    for (let i = 0; i < transactionData.length; i++) {
        let t = transactionData[i];
        let val = Number(t.amount);
        if (t.type === "Income") {
            income = income + val;
        }
        if (t.type === "Expense") {
            expense = expense + val;
        }
    }
    if (income === 0 && expense === 0) {
        let msg = document.createElement("div");
        msg.className = "chart-empty-message";
        msg.innerText = "No transaction data to display";
        chartBody.appendChild(msg);
        return;
    }
    let peak = income;
    if (expense > income) {
        peak = expense;
    }
    let incomePct = (income / peak) * 80;
    let expensePct = (expense / peak) * 80;
    let userSymbol = getCurrencySymbol();

    let incomeWrapper = document.createElement('div');
    let incomeValue = document.createElement('div');
    let incomeBar = document.createElement('div');
    let incomeLabel = document.createElement('div');
    let expenseWrapper = document.createElement('div');
    let expenseValue = document.createElement('div');
    let expenseBar = document.createElement('div');
    let expenseLabel = document.createElement('div');

    incomeWrapper.classList.add('chart-bar-wrapper');
    incomeValue.classList.add('chart-bar-value');
    incomeBar.classList.add('chart-bar');
    incomeBar.classList.add('income-bar');
    incomeLabel.classList.add('chart-bar-label');
    expenseWrapper.classList.add('chart-bar-wrapper');
    expenseValue.classList.add('chart-bar-value');
    expenseBar.classList.add('chart-bar');
    expenseBar.classList.add('expense-bar');
    expenseLabel.classList.add('chart-bar-label');

    incomeBar.style.height = incomePct + '%';
    expenseBar.style.height = expensePct + '%';
    incomeValue.textContent = userSymbol + income.toFixed(2);
    incomeLabel.textContent = 'Income';
    expenseValue.textContent = userSymbol + expense.toFixed(2);
    expenseLabel.textContent = 'Expense';

    incomeWrapper.appendChild(incomeValue);
    incomeWrapper.appendChild(incomeBar);
    incomeWrapper.appendChild(incomeLabel);
    expenseWrapper.appendChild(expenseValue);
    expenseWrapper.appendChild(expenseBar);
    expenseWrapper.appendChild(expenseLabel);
    chartBody.appendChild(incomeWrapper);
    chartBody.appendChild(expenseWrapper);
}

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    alert('Logged out successfully!');
    window.location.href = '../index.html';
});

addBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

modalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const type = document.getElementById('transactionType').value;
    const description = document.getElementById('transactionDesc').value;
    const amount = document.getElementById('transactionAmount').value;
    const date = document.getElementById('transactionDate').value;
    const category = document.getElementById('transactionCategory').value;
    if (type.trim() === '' || description.trim() === '' || amount.trim() === '' || date.trim() === '' || category.trim() === '') {
        alert('Please fill all the fields!');
        return;
    }
    let obj = {
        type: type,
        description: description,
        amount: amount,
        date: date,
        category: category
    };
    transactionData.push(obj);
    localStorage.setItem('transactions', JSON.stringify(transactionData));
    renderTransaction();
    updateStats();
    modalForm.reset();
    modal.style.display = 'none';
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

searchInput.addEventListener('input', () => {
    let searchValue = searchInput.value.toLowerCase().trim();
    let filteredTransactions = transactionData.filter((t) => {
        let matchesSearch = true;
        if (searchValue !== '') {
            matchesSearch = t.description.toLowerCase().includes(searchValue) ||
                t.category.toLowerCase().includes(searchValue);
        }
        return matchesSearch;
    });
    renderTransaction(filteredTransactions);
});

categoryFilter.addEventListener('change', () => {
    let selectedCategory = categoryFilter.value;
    let filteredTransactions = transactionData.filter((t) => {
        let matchesCategory = true;
        if (selectedCategory !== "All") {
            matchesCategory = (t.type === selectedCategory);
        }
        return matchesCategory;
    });
    renderTransaction(filteredTransactions);
});

btnClearAll.addEventListener('click', () => {
    transactionData = [];
    localStorage.setItem('transactions', JSON.stringify(transactionData));
    renderTransaction();
    updateStats();
});