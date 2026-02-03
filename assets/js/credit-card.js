const cards = {
  1: { limit: 5000, balance: 1240 },
  2: { limit: 8000, balance: 2150 },
  3: { limit: 15000, balance: 6500 }
};

// load saved balances
Object.keys(cards).forEach(id => {
  const saved = localStorage.getItem("card" + id);
  if (saved) cards[id].balance = Number(saved);
});

function updateUI() {
  Object.keys(cards).forEach(id => {
    document.getElementById("balance" + id).innerText =
      `$${cards[id].balance.toLocaleString()}`;
    document.getElementById("available" + id).innerText =
      `$${(cards[id].limit - cards[id].balance).toLocaleString()}`;
  });
}

function payCard(id) {
  let amount = prompt("Enter payment amount");

  // cancel pressed
  if (amount === null) return;

  amount = Number(amount);

  // invalid input
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  if (amount > cards[id].balance) {
    alert("Payment exceeds current balance");
    return;
  }

  cards[id].balance -= amount;

  localStorage.setItem("card" + id, cards[id].balance);

  const history = JSON.parse(localStorage.getItem("transactionHistory")) || [];

  history.unshift({
    method: "Credit Card Payment",
    amount: amount.toFixed(2),
    status: "Approved",
    date: new Date().toLocaleString()
  });

  localStorage.setItem("transactionHistory", JSON.stringify(history));

  updateUI();
}

updateUI();


const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser) {
  loggedInUser.lastActive = new Date().toLocaleString();
  loggedInUser.online = true;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  users = users.map(u => u.id === loggedInUser.id ? loggedInUser : u);

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
}

window.addEventListener("beforeunload", () => {
  if (loggedInUser) {
    loggedInUser.online = false;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.map(u => u.id === loggedInUser.id ? loggedInUser : u);
    localStorage.setItem("users", JSON.stringify(users));
  }
});
