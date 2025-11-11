let totalIncome = 0
let totalExpenses = 0
const modal = document.getElementById('success-modal')

function addIncome(event) {
  event.preventDefault()

  const description = document.getElementById('income-description').value.trim() || "- -"
  const amount = parseFloat(document.getElementById('income-amount').value)
  const successMessage = document.querySelector('#success-modal p')

  if (!isNaN(amount) && amount > 0) {
    totalIncome += amount
    document.getElementById('total-income').innerText = totalIncome.toLocaleString()
    successMessage.textContent = 'Your transaction has been added successfully!'
    successMessage.style.color = 'green'
    addTransactionToHistory(description, 'Income', amount, 'Income')
    clearInputs(['income-description', 'income-amount'])
    showModal()
  }
}

function addExpense(event) {
  event.preventDefault()

  const description = document.getElementById('expense-description').value.trim() || "- -"
  const category = document.getElementById('expense-category').value;
  const amount = parseFloat(document.getElementById('expense-amount').value)
  const successMessage = document.querySelector('#success-modal p')

  if (!isNaN(amount) && amount > 0) {
    totalExpenses += amount
    document.getElementById('total-expenses').innerText = totalExpenses.toLocaleString()
    successMessage.textContent = 'Your transaction has been added successfully!'
    successMessage.style.color = 'green'
    addTransactionToHistory(description, category, amount, 'Expense')
    clearInputs(['expense-description', 'expense-amount'])
    showModal()
  }
}

function addTransactionToHistory (description, category, amount, type) {
  const table = document.getElementById('transaction-history')
  const row = table.insertRow()
  row.insertCell(0).innerText = category
  row.insertCell(1).innerText = description || "- -"
  row.insertCell(2).innerText = amount.toLocaleString()
  row.insertCell(3).innerText = type
  const deleteCell = row.insertCell(4)
  const deleteButton = document.createElement('button')
  deleteButton.className = 'delete-btn';
  deleteButton.innerHTML = '<i class="material-icons">delete</i>'
  deleteCell.appendChild(deleteButton)
  updateBalance()
  saveData()
}


function updateBalance () {
  const balance = totalIncome - totalExpenses
  const balanceElement = document.getElementById('balance')

  balanceElement.innerText = balance.toLocaleString()

  if (balance < 1) {
    balanceElement.style.color = 'red'
  } else {
    balanceElement.style.color = 'green'
  }
}

function deleteTransaction (row) {
  const amount = parseFloat(row.cells[2].innerText.replace('XAF', ''))
  const type = row.cells[3].innerText
  if (type === 'Income') {
    totalIncome -= amount
  } else {
    totalExpenses -= amount
  }
  row.remove()
  recalculateSummary()
  delMessage()
  saveData()
}

function recalculateSummary () {
  totalIncome = 0
  totalExpenses = 0
  const table = document.getElementById('transaction-history')
  const rows = table.getElementsByTagName('tr')
  for (const row of rows) {
    const amount = parseFloat(row.cells[2].innerText.replace('XAF', ' '))
    const type = row.cells[3].innerText
    if (type === 'Income') {
      totalIncome += amount
    } else if (type === 'Expense') {
      totalExpenses += amount
    }
  }
  document.getElementById('total-income').innerText = totalIncome
  document.getElementById('total-expenses').innerText = totalExpenses
  updateBalance()
}

function clearInputs (inputIds) {
  inputIds.forEach(id => {
    document.getElementById(id).value = ''
  })
}

function clearAll () {
  totalIncome = 0
  totalExpenses = 0
  document.getElementById('total-income').innerText = '0'
  document.getElementById('total-expenses').innerText = '0'
  document.getElementById('balance').innerText = '0'
  document.getElementById('transaction-history').innerHTML = ''
  localStorage.removeItem('budgetData')
}

function setupEventDelegation() {
  const table = document.getElementById('transaction-history')
  table.addEventListener('click', function(e) {
    if (e.target.closest('button') || e.target.closest('.material-icons')) {
      const button = e.target.closest('button')
      const row = button.closest('tr')
      deleteTransaction(row)
    }
  })
}

document.addEventListener('DOMContentLoaded', function() {
  loadData();
  setupEventDelegation()
});

function saveData () {
  const data = {
    totalIncome,
    totalExpenses,
    transactionHistory: document.getElementById('transaction-history').innerHTML
  }
  localStorage.setItem('budgetData', JSON.stringify(data))
}

function loadData () {
  const data = JSON.parse(localStorage.getItem('budgetData'))
  if (data) {
    totalIncome = data.totalIncome
    totalExpenses = data.totalExpenses
    document.getElementById('total-income').innerText = totalIncome
    document.getElementById('total-expenses').innerText = totalExpenses
    document.getElementById('balance').innerText = (totalIncome - totalExpenses)
    document.getElementById('transaction-history').innerHTML = data.transactionHistory

    setupEventDelegation()
  }
}

function delMessage () {
  modal.style.display = 'flex'
  const successMessage = document.querySelector('#success-modal p')
  successMessage.textContent = 'Your transaction has been deleted successfully!'
  successMessage.style.color= 'red'
}
// Modal Functions
function showModal () {
  modal.style.display = 'flex'
}

function closeModal () {
  modal.style.display = 'none'
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter' && modal.style.display === 'flex') {
    closeModal()
  }
})

document.addEventListener('DOMContentLoaded', function() {
  loadData()
  setupEventDelegation()
})

