// ================= ADMIN GUARD =================
if (localStorage.getItem("adminLoggedIn") !== "true") {
  alert("Admin access only");
  window.location.href = "admin-login.html";
}

// ================= LOAD USERS =================
let users = JSON.parse(localStorage.getItem("users")) || [];
const table = document.getElementById("userTable");

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

// ================= ACTIVITY LOG =================
function logActivity(action, email, amount = "") {
  let logs = JSON.parse(localStorage.getItem("activityLogs")) || [];
  logs.unshift({
    action,
    email,
    amount,
    by: "ADMIN",
    time: new Date().toLocaleString()
  });
  localStorage.setItem("activityLogs", JSON.stringify(logs));
}

// ================= RENDER =================
function render() {
  table.innerHTML = "";

  users.forEach((u, i) => {
    table.innerHTML += `
      <tr>
        <td>${u.firstName} ${u.lastName}</td>
        <td>${u.email}</td>
        <td>${u.status}</td>
        <td>${(u.balance || 0).toLocaleString()}</td>
        <td>
          <input class="amount" type="number" id="amt${i}" placeholder="Amount">
        </td>
        <td>
          <button class="approve" onclick="approve(${i})">Approve</button>
          <button class="reject" onclick="reject(${i})">Reject</button><br>
          <button class="send" onclick="sendMoney(${i})">Send</button>
          <button class="take" onclick="takeMoney(${i})">Take</button>
        </td>
      </tr>
    `;
  });
}

render();

function renderTransfers() {
  const transferTable = document.getElementById("transferTable");
  if (!transferTable) return;

  const transfers = JSON.parse(localStorage.getItem("pendingTransfers")) || [];
  transferTable.innerHTML = "";

  if (transfers.length === 0) {
    transferTable.innerHTML = `
      <tr>
        <td colspan="5">No pending transfers</td>
      </tr>
    `;
    return;
  }

  transfers.forEach(t => {
    transferTable.innerHTML += `
      <tr>
        <td>${t.userEmail}</td>
        <td>${t.method}</td>
        <td>$${t.amount}</td>
        <td>${t.status}</td>
        <td>
          <button onclick="approveTransfer(${t.id})">Approve</button>
          <button onclick="rejectTransfer(${t.id})">Reject</button>
        </td>
      </tr>
    `;
  });
}


// ================= ACTIONS =================
function approve(i) {
  users[i].status = "Approved";
  logActivity("Approved User", users[i].email);
  saveUsers();
  render();
}

function approveTransfer(id) {
  let transfers = JSON.parse(localStorage.getItem("pendingTransfers")) || [];
  let history = JSON.parse(localStorage.getItem("transactionHistory")) || [];
  let users = JSON.parse(localStorage.getItem("users")) || [];

  const index = transfers.findIndex(t => t.id === id);
  if (index === -1) return alert("Transfer not found");

  const transfer = transfers[index];

  const user = users.find(u => u.email === transfer.userEmail);
  if (!user) {
    alert("User not found for this transfer");
    return;
  }

  // deduct balance
  user.balance = Math.max(0, (user.balance || 0) - transfer.amount);

  transfer.status = "Approved";
  history.unshift(transfer);

  transfers.splice(index, 1);

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("pendingTransfers", JSON.stringify(transfers));
  localStorage.setItem("transactionHistory", JSON.stringify(history));

  logActivity("Approved Transfer", transfer.userEmail, transfer.amount);

  renderTransfers();
  render();
}

  

function rejectTransfer(id) {
  let transfers = JSON.parse(localStorage.getItem("pendingTransfers")) || [];

  const index = transfers.findIndex(t => t.id === id);
  if (index === -1) return;

  const transfer = transfers[index];
  transfer.status = "Rejected";

  logActivity("Rejected Transfer", transfer.userEmail, transfer.amount);

  transfers.splice(index, 1);
  localStorage.setItem("pendingTransfers", JSON.stringify(transfers));

  renderTransfers();
}


function reject(i) {
  users[i].status = "Rejected";
  logActivity("Rejected User", users[i].email);
  saveUsers();
  render();
}

function sendMoney(i) {
  const amt = Number(document.getElementById(`amt${i}`).value);
  if (amt <= 0) return alert("Enter valid amount");

  users[i].balance = (users[i].balance || 0) + amt;
  logActivity("Sent Money", users[i].email, amt);
  saveUsers();
  render();
}

function takeMoney(i) {
  const amt = Number(document.getElementById(`amt${i}`).value);
  if (amt <= 0) return alert("Enter valid amount");

  users[i].balance = Math.max(0, (users[i].balance || 0) - amt);
  logActivity("Deducted Money", users[i].email, amt);
  saveUsers();
  render();
}


render();
renderTransfers();



