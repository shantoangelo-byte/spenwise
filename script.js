
let budget = Number(localStorage.getItem("budget")) || 0;

let transactions = JSON.parse(
    localStorage.getItem("transactions")
) || [];

function saveData() {
    localStorage.setItem("budget", budget);
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

function setBudget() {
    let value = Number(document.getElementById("budget").value);

    if (value <= 0) {
        alert("Please enter a valid budget.");
        return;
    }

    budget = value;
    saveData();
    updateDisplay();

    document.getElementById("budget").value = "";
}

function addTransaction() {
    let description = document.getElementById("description").value;
    let amount = Number(document.getElementById("amount").value);
    let type = document.getElementById("type").value;
    let category = document.getElementById("category").value;

    if (description.trim() === "" || amount <= 0) {
        alert("Please enter a description and valid amount.");
        return;
    }

    let transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type,
        category: category
    };

    transactions.push(transaction);

    saveData();
    updateDisplay();

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}

function deleteTransaction(id) {
    transactions = transactions.filter(
        transaction => transaction.id !== id
    );

    saveData();
    updateDisplay();
}

function updateDisplay() {
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(transaction => {
        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else {
            totalExpenses += transaction.amount;
        }
    });

    let balance = totalIncome - totalExpenses;

    document.getElementById("totalBudget").textContent =
        budget.toLocaleString();

    document.getElementById("totalIncome").textContent =
        totalIncome.toLocaleString();

    document.getElementById("totalExpenses").textContent =
        totalExpenses.toLocaleString();

    document.getElementById("balance").textContent =
        balance.toLocaleString();

    let list = document.getElementById("transactionList");

    list.innerHTML = "";

    transactions.forEach(transaction => {
        let li = document.createElement("li");

        let details = document.createElement("span");
        details.textContent =
            `${transaction.description} (${transaction.category})`;

        let amount = document.createElement("span");
        amount.textContent =
            `${transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}`;

        amount.className = transaction.type;

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.onclick = () =>
            deleteTransaction(transaction.id);

        li.append(details, amount, deleteButton);
        list.appendChild(li);
    });
}

updateDisplay();
