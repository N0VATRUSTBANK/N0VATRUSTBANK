document.addEventListener("DOMContentLoaded", function () {
  const history = JSON.parse(localStorage.getItem("transferHistory")) || [];
  const list = document.getElementById("historyList");

  if (!list) return;

  if (history.length === 0) {
    list.innerHTML = "<p>No transactions yet.</p>";
    return;
  }

  list.innerHTML = history.map(t => `
    <div class="history-card">
      <strong>${t.method}</strong><br>
      To: ${t.recipient}<br>
      Amount: $${t.amount}<br>
      Status: ${t.status}
    </div>
  `).join("");
});


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
