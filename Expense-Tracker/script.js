const addBtn = document.getElementById("add-btn")
const amt = document.getElementById("amount")
const desc = document.getElementById("text")
const transactionType = document.getElementById('type');
const list = document.getElementById('list')
const balance = document.getElementById("balance")
const income = document.getElementById("money-plus")
const expenditure = document.getElementById("money-minus")
const remaining = document.getElementById("money-remaining")
const credit = document.getElementById("credit")
const debit = document.getElementById("debit")
let transactions = [];

function addTransaction(transaction) {
    let li = document.createElement('li')
    let sign = transaction.type === 'credit'? "+" : "-"
    let data = `
        ${transaction.text} 
        <span>${sign}$${Math.abs(transaction.amount).toFixed(2)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `
    li.innerHTML = data
    list.appendChild(li)
}

function getBalance(item) {
    const value = item.innerText.trim()
    return parseFloat(value.replace('$', ''))
}

function updateBalance(event) {
    event.preventDefault() // prevent the reloading of value
    
    let totalBalance = getBalance(balance)
    let expense = parseFloat(amt.value) 
    let remainBalance = getBalance(remaining)
    balance.innerText = `$${(totalBalance + expense).toFixed(2)}`

    let transactionDetails = {
        id: Date.now(),
        text:desc.value,
        type: transactionType.value,
        amount: expense,
    }

    addTransaction(transactionDetails)
    transactions.push(transactionDetails)
    
    if(transactionType.value === "credit") {
        let creditBalance = getBalance(income)
        income.innerText = `$${(creditBalance + expense).toFixed(2)}`
        remaining.innerText = `$${(remainBalance + expense).toFixed(2)}`
    } else {
        let debitBalance = getBalance(expenditure)
        expenditure.innerText = `$${(debitBalance + expense).toFixed(2)}`
        remaining.innerText = `$${(totalBalance - remainBalance).toFixed(2)}`
    }
}

addBtn.onclick = (e) => updateBalance(e)