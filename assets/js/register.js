const users = JSON.parse(localStorage.getItem("users")) || [];

users.push({
  firstName,
  middleName,
  lastName,
  email,
  ssn,
  idImage,
  photo,
  balance: 0,
  status: "Pending",
  createdAt: new Date().toLocaleDateString(),
  lastActive: new Date().toLocaleString()
});

localStorage.setItem("users", JSON.stringify(users));
