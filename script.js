let totalIncome = 0;
let totalExpenses = 0;

function addIncome() {
    const description = document.getElementById('income-description').value;
    const amount = parseFloat(document.getElementById('income-amount').value);
    if (description && amount) {
        totalIncome += amount;
        document.getElementById('total-income').innerText = totalIncome;
        addTransactionToHistory(description, 'Income', amount, 'Income');
        clearInputs(['income-description', 'income-amount']);
        showModal(); // Show success modal
    }
}

function addExpense() {
    const description = document.getElementById('expense-description').value;
    const category = document.getElementById('expense-category').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    if (description && amount) {
        totalExpenses += amount;
        document.getElementById('total-expenses').innerText = totalExpenses;
        addTransactionToHistory(description, category, amount, 'Expense');
        clearInputs(['expense-description', 'expense-amount']);
        showModal(); // Show success modal
    }
}

function addTransactionToHistory(description, category, amount, type) {
    const table = document.getElementById('transaction-history');
    const row = table.insertRow();
    row.insertCell(0).innerText = category;
    row.insertCell(1).innerText = description;

    row.insertCell(2).innerText = `${amount}XAF`;
    row.insertCell(3).innerText = type;
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="material-icons">delete</i>';
    deleteButton.onclick = function () {
        deleteTransaction(row);
    };
    deleteCell.appendChild(deleteButton);
    updateBalance();
    saveData(); // Save the data after adding a transaction
}

function updateBalance() {
    const balance = totalIncome - totalExpenses;
    document.getElementById('balance').innerText = balance;
}

function deleteTransaction(row) {
    const amount = parseFloat(row.cells[2].innerText.replace('XAF',''));
    const type = row.cells[3].innerText;
    if (type === 'Income') {
        totalIncome -= amount;
    } else {
        totalExpenses -= amount;
    }
    row.remove(); 
    recalculateSummary(); 
}

function recalculateSummary() {
    totalIncome = 0;
    totalExpenses = 0;
    const table = document.getElementById('transaction-history');
    const rows = table.getElementsByTagName('tr');
    for (let row of rows) {
        const amount = parseFloat(row.cells[2].innerText.replace('XAF', ' '));
        const type = row.cells[3].innerText;
        if (type === 'Income') {
            totalIncome += amount;
        } else if (type === 'Expense') {
            totalExpenses += amount;
        }
    }
    document.getElementById('total-income').innerText = totalIncome;
    document.getElementById('total-expenses').innerText = totalExpenses;
    updateBalance();
}

function clearInputs(inputIds) {
    inputIds.forEach(id => {
        document.getElementById(id).value = '';
    });
}

function clearAll() {
    totalIncome = 0;
    totalExpenses = 0;
    document.getElementById('total-income').innerText = '0';
    document.getElementById('total-expenses').innerText = '0';
    document.getElementById('balance').innerText = '0';
    document.getElementById('transaction-history').innerHTML = ''; // Clear the table
    localStorage.removeItem('budgetData'); // Clear saved data
}

function saveData() {
    const data = {
        totalIncome,
        totalExpenses,
        transactionHistory: document.getElementById('transaction-history').innerHTML
    };
    localStorage.setItem('budgetData', JSON.stringify(data));
}

function loadData() {
    const data = JSON.parse(localStorage.getItem('budgetData'));
    if (data) {
        totalIncome = data.totalIncome;
        totalExpenses = data.totalExpenses;
        document.getElementById('total-income').innerText = totalIncome;
        document.getElementById('total-expenses').innerText = totalExpenses;
        document.getElementById('balance').innerText = (totalIncome - totalExpenses);
        document.getElementById('transaction-history').innerHTML = data.transactionHistory;
    }
}

// Modal Functions
function showModal() {
    document.getElementById('successModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('successModal').style.display = 'none';
}

// Load data on page load
window.onload = loadData;