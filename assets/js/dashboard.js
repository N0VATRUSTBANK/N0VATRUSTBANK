// LOAD SIDEBAR ON ALL PAGES
fetch("sidebar.html")
  .then(res => res.text())
  .then(data => {
    const container = document.getElementById("sidebar-container");
    if (container) container.innerHTML = data;
  });


  document.addEventListener("click", function (e) {
  if (e.target.id === "menuBtn") {
    const sidebar = document.getElementById("sidebar");
    const main = document.querySelector(".main-content");

    sidebar.classList.toggle("open");
    if (main) main.classList.toggle("shift");
  }
});


document.addEventListener("DOMContentLoaded", () => {

  /* ========== AUTH ========== */
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) return;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === loggedInUser.email);
  if (!user) return;

  /* ========== SIDEBAR ========== */
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");

  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      sidebar.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
        sidebar.classList.remove("active");
      }
    });
  }

  /* ========== BALANCES ========== */
  let showBalance = true;

  const checkingEl = document.getElementById("checkingBalance");
  const savingsEl  = document.getElementById("savingsBalance");
  const totalEl    = document.getElementById("totalBalance");

  const checking = user.balance || 0;
  const savings  = user.savings || 0;

  function renderBalances() {
    if (showBalance) {
      checkingEl.innerText = `$${checking.toLocaleString()}`;
      savingsEl.innerText  = `$${savings.toLocaleString()}`;
      totalEl.innerText    = `$${(checking + savings).toLocaleString()}`;
    } else {
      checkingEl.innerText = "••••";
      savingsEl.innerText  = "••••";
      totalEl.innerText    = "••••";
    }
  }

  renderBalances();

  document.querySelectorAll("button[data-target]").forEach(btn => {
    btn.addEventListener("click", () => {
      showBalance = !showBalance;
      renderBalances();
    });
  });

  window.toggleTotal = function () {
    showBalance = !showBalance;
    renderBalances();
  };

  /* ========== ACTIVITY ========== */
  const activityList = document.getElementById("activityList");
  const history = JSON.parse(localStorage.getItem("transactionHistory")) || [];

  if (activityList) {
    if (history.length === 0) {
      activityList.innerHTML = `<div class="activity-row">No recent activity</div>`;
    } else {
      activityList.innerHTML = history.slice(0, 5).map(tx => `
        <div class="activity-row">
          <span>${tx.method || "Transaction"}</span>
          <span>$${tx.amount}</span>
        </div>
      `).join("");
    }
  }

});




