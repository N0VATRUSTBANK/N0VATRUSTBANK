// AUTH GUARD — PROTECT PRIVATE PAGES

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
  // Not logged in → kick to homepage
  window.location.href = "../index.html";
}
