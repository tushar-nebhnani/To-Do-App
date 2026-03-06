const addBtn = document.getElementById("add-btn")
const amt = document.getElementById("amount")
const desc = document.getElementById("text")
const transactionType = document.getElementById('type');
const list = document.getElementById('list')
const balance = document.getElementById("balance")
const income = document.getElementById("money-plus")
const expenditure = document.getElementById("money-minus")
const credit = document.getElementById("credit")
const debit = document.getElementById("debit")
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// create
function addTransaction(transaction) {
    let li = document.createElement('li')
    let sign = transaction.type === 'credit'? "+" : "-"
    li.setAttribute('data-id', transaction.id)
    let data = `
        ${transaction.text} 
        <span>${sign}$${Math.abs(transaction.amt).toFixed(2)}</span>
        <button class="editBtn">✎</button>
        <button class="deleteBtn">×</button>
    `
    li.innerHTML = data
    list.append(li)
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function updateBalance(event) {
    event.preventDefault() // prevent the reloading of value
    
    if (desc.value.trim() === '' || amt.value.trim() === '') {
        alert('Please add a description and amount');
        return;
    }

    const transactionDetails = {
        id: Date.now(),
        text: desc.value,
        type: transactionType.value,
        amt: parseFloat(amt.value),
    };

    transactions.push(transactionDetails);
    addTransaction(transactionDetails);
    updateValues(transactions); 

    desc.value = '';
    amt.value = '';
}

function updateValues(transactions) {
    const amounts = transactions.map((t) => {
        return t.type === "credit"? t.amt : -t.amt
    })

    const incomeValue = amounts.filter((t) => t > 0).reduce((acc, curr) => {
        return acc + curr
    }, 0).toFixed(2)

    let expense = amounts.filter((t) => t < 0).reduce((acc, curr) => {
        return acc + curr
    }, 0).toFixed(2)

    if (parseFloat(expense) < 0) {
        expense = (expense * -1).toFixed(2)
    }

    const totalValue = amounts.reduce((acc, curr) => {
        return acc + curr
    }, 0).toFixed(2)

    income.innerText = `₹${incomeValue}`
    expenditure.innerText = `₹${expense}`
    balance.innerText = `₹${totalValue}`
}

function refreshUI() {
    list.innerHTML = ""
    transactions.forEach(addTransaction); 
    updateValues(transactions)
    updateLocalStorage();
}

addBtn.onclick = (e) => updateBalance(e)

list.addEventListener('click', e => {
    if(e.target.classList.contains('editBtn')) {
        const id = e.target.parentElement.getAttribute('data-id')

        const selectTransaction = transactions.find(t => t.id == id)

        const newText = prompt("Enter the updated description: ")
        const newAmt = prompt("Enter the updated amount: ")
        const newType = prompt("Enter type(credit/debit): ")

        if (newText && newAmt) {
        selectTransaction.text = newText;
        selectTransaction.amt = parseFloat(newAmt);
        selectTransaction.type = newType
        
        refreshUI(); 
        }
    } else if(e.target.classList.contains('deleteBtn')) {
        const id = e.target.parentElement.getAttribute('data-id')
        const idx = transactions.findIndex(t => t.id == id)

        if (idx != -1) {
            transactions.splice(idx, 1)
        }
        refreshUI()
    }
})

refreshUI()