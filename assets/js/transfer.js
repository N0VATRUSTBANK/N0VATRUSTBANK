function createTransfer(data) {
  let transfers = JSON.parse(localStorage.getItem("pendingTransfers")) || [];

  const transfer = {
    id: Date.now(),
    userEmail: data.userEmail,
    method: data.method,
    recipient: data.recipient,
    bank: data.bank,
    amount: Number(data.amount),
    status: "Pending",
    time: new Date().toLocaleString()
  };

  transfers.push(transfer);
  localStorage.setItem("pendingTransfers", JSON.stringify(transfers));

  localStorage.setItem("pendingTransfer", JSON.stringify(transfer));

  window.location.href = "review.html";
}

