/* Sidebar JavaScript */
/* ===== SIDEBAR TOGGLE SCRIPT ===== */

document.addEventListener("DOMContentLoaded", function () {

  // HOME PAGE SIDEBAR
  const homeBtn = document.getElementById("homeMenuBtn");
  const homeSidebar = document.getElementById("homeSidebar");

  if (homeBtn && homeSidebar) {
    homeBtn.addEventListener("click", function () {
      homeSidebar.classList.toggle("active");
    });
  }

  // DASHBOARD SIDEBAR
  const dashBtn = document.getElementById("dashboardMenuBtn");
  const dashSidebar = document.getElementById("dashboardSidebar");

  if (dashBtn && dashSidebar) {
    dashBtn.addEventListener("click", function () {
      dashSidebar.classList.toggle("active");
    });
  }

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
