const express = require("express");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.use(requireAdmin);

router.get("/users", async (_req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users.map((u) => u.toPublic()));
  } catch (err) {
    next(err);
  }
});

router.patch("/users/:id/status", async (req, res, next) => {
  try {
    const { status } = req.body || {};
    if (!["Pending Approval", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user.toPublic());
  } catch (err) {
    next(err);
  }
});

router.patch("/users/:id/balance", async (req, res, next) => {
  try {
    const { delta } = req.body || {};
    const amt = Number(delta);
    if (!Number.isFinite(amt) || amt === 0) {
      return res.status(400).json({ error: "delta must be a non-zero number" });
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.balance = Math.max(0, (user.balance || 0) + amt);
    await user.save();
    res.json(user.toPublic());
  } catch (err) {
    next(err);
  }
});

router.get("/transactions", async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;
    const txs = await Transaction.find(filter).sort({ createdAt: -1 }).limit(500);
    res.json(txs);
  } catch (err) {
    next(err);
  }
});

router.patch("/transactions/:id/approve", async (req, res, next) => {
  try {
    const tx = await Transaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ error: "Transaction not found" });
    if (tx.status !== "Pending") {
      return res.status(409).json({ error: `Transaction is already ${tx.status}` });
    }
    const user = await User.findById(tx.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    if ((user.balance || 0) < tx.amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }
    user.balance = (user.balance || 0) - tx.amount;
    tx.status = "Approved";
    await Promise.all([user.save(), tx.save()]);
    res.json(tx);
  } catch (err) {
    next(err);
  }
});

router.patch("/transactions/:id/reject", async (req, res, next) => {
  try {
    const tx = await Transaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ error: "Transaction not found" });
    if (tx.status !== "Pending") {
      return res.status(409).json({ error: `Transaction is already ${tx.status}` });
    }
    tx.status = "Rejected";
    await tx.save();
    res.json(tx);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
