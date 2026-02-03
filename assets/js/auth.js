function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify({
    name: "Micheal",
    email: email
  }));

  window.location.href = "dashboard.html";
}

function protectPage() {
  const user = localStorage.getItem("loggedInUser");
  if (!user) {
    window.location.href = "index.html";
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "../index.html";
}

function registerUser(e) {
  e.preventDefault();

  const user = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    ssn: document.getElementById("ssn").value,
    idNumber: document.getElementById("idNumber").value,
    status: "Pending"
  };

  let users = JSON.parse(localStorage.getItem("bankUsers")) || [];

  // check duplicate email
  if (users.find(u => u.email === user.email)) {
    alert("Account already exists");
    return;
  }

  users.push(user);
  localStorage.setItem("bankUsers", JSON.stringify(users));

  alert("Application submitted. Please wait for approval.");
  window.location.href = "index.html";
}


function loginUser(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("bankUsers")) || [];

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    alert("Incorrect email or password");
    return;
  }

  if (user.status !== "Approved") {
    alert("Your account is still pending approval");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));
  window.location.href = "pages/dashboard.html";
}



window.location.href = "pages/dashboard.html";

function registerUser() {
  const reader = new FileReader();
  const photoFile = document.getElementById("photo").files[0];

  reader.onload = function () {
    const user = {
      id: Date.now(),
      firstName: firstName.value,
      middleName: middleName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      ssn: ssn.value,
      idNumber: idNumber.value,
      photo: reader.result,
      checking: 0,
      savings: 0,
      status: "Pending Approval"
    };
    

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account submitted for approval");
    location.href = "index.html";
  };

  reader.readAsDataURL(photoFile);
}
