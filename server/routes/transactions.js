const express = require("express");
const Transaction = require("../models/Transaction");
const User = require("../models/User");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.use(requireAuth);

router.post("/", async (req, res, next) => {
  try {
    const { method, recipient, amount, bank, routing } = req.body || {};
    if (!method || !recipient) {
      return res.status(400).json({ error: "method and recipient are required" });
    }
    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt <= 0) {
      return res.status(400).json({ error: "amount must be a positive number" });
    }
    const tx = await Transaction.create({
      userId: req.user.sub,
      userEmail: req.user.email,
      type: "debit",
      method,
      recipient,
      bank,
      routing,
      amount: amt,
      status: "Pending",
    });
    res.status(201).json(tx.toJSON());
  } catch (err) {
    next(err);
  }
});

router.get("/me", async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = { userId: req.user.sub };
    if (status) filter.status = status;
    const txs = await Transaction.find(filter).sort({ createdAt: -1 });
    res.json(txs);
  } catch (err) {
    next(err);
  }
});

router.get("/me/:id", async (req, res, next) => {
  try {
    const tx = await Transaction.findOne({ _id: req.params.id, userId: req.user.sub });
    if (!tx) return res.status(404).json({ error: "Transaction not found" });
    res.json(tx);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
