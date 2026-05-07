const express = require("express");
const User = require("../models/User");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.use(requireAuth);

router.get("/me", async (req, res, next) => {
  try {
    const user = await User.findById(req.user.sub);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user.toPublic());
  } catch (err) {
    next(err);
  }
});

router.post("/me/cards/:cardId/pay", async (req, res, next) => {
  try {
    const amount = Number(req.body?.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ error: "amount must be a positive number" });
    }
    const cardId = Number(req.params.cardId);
    const user = await User.findById(req.user.sub);
    if (!user) return res.status(404).json({ error: "User not found" });

    const card = user.cards.find((c) => c.id === cardId);
    if (!card) return res.status(404).json({ error: "Card not found" });

    card.balance = Math.max(0, (card.balance || 0) - amount);
    await user.save();
    res.json(user.toPublic());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
