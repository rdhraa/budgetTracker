const incomeForm=document.getElementById("income-form")
const incomeAmount = document.getElementById("income-amount")

const expenseForm=document.getElementById("expense-form")
const expenseAmount = document.getElementById("expense-amount")
const expenseDesc = document.getElementById("expenseDesc")
const expenseCategory = document.getElementById("expenseCategory")

const displayIncome= document.getElementById("displayIncome")
const balanceElement = document.getElementById("balance")
const expenseTableBody = document.getElementById("expense-list")
const messageContainer = document.getElementById("message-container")

let income = 0
let expenses=[]
//income eventListener
incomeForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    income = parseInt(incomeAmount.value)
    incomeAmount.value=""
    displayIncome.textContent=`Income is Rs ${income}`
    updateBalance();
})
//expense - eventListener
expenseForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const expense={
        description:expenseDesc.value,
        amount:parseInt(expenseAmount.value),
        category:expenseCategory.value
    }
    expenses.push(expense)
    addExpenseToTable(expense);
    expenseDesc. value=""
    expenseAmount.value=""
    expenseCategory.value=""
    updateBalance()
})

// to add expense to the table
const addExpenseToTable = (expense) => {
    const row = document.createElement("tr")
    row.innerHTML = `
        <td>${expense.description}</td>
        <td>${expense.amount}</td>
        <td>${expense.category || 'N/A'}</td>
    `;
    expenseTableBody.appendChild(row);
};

// messages
const showMessage = (message, type) => {
    messageContainer.textContent = message;
    messageContainer.className = `alert mt-3`; 
    switch (type) {
        case 'low':
            messageContainer.classList.add('alert-warning'); // Orange background
            break;
        case 'high':
            messageContainer.classList.add('alert-success'); // Green background
            break;
        case 'error':
            messageContainer.classList.add('alert-danger'); // Red background
            break;
        default:
            messageContainer.classList.add('alert-info'); // Yellow background
            break;
    }
    setTimeout(() => {
        messageContainer.textContent = ""; 
    }, 5000);
};


//Budget summary -update
const updateBalance =()=>{
    const totalExpenses = expenses.reduce((sum,expense)=>sum+expense.amount,0)
    
    const balance = income-totalExpenses
    balanceElement.textContent=`Balance is Rs ${balance}`
    if (totalExpenses > income) {
        showMessage("Warning: Your expenses exceed your income! Time to review your spending.", 'error')
    } else if (balance < (0.2 * income)) {
        showMessage("Uh-oh! It looks like you're spending a lot. Consider saving for your next big goal!", 'low')
    } else if (balance > (0.7 * income)) {
        showMessage("Great job! You're saving wisely! Keep up the good work!", 'high')
    } else {
        showMessage("You're managing your budget well. Keep it up!", 'default')
    } 
} 









