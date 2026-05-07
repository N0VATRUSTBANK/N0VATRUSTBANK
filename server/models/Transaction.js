const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    userEmail: { type: String, required: true, index: true },
    type: { type: String, enum: ["debit", "credit"], default: "debit" },
    method: { type: String, required: true },
    recipient: { type: String, required: true },
    bank: String,
    routing: String,
    amount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
      index: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

transactionSchema.virtual("time").get(function () {
  return this.createdAt;
});

module.exports = mongoose.model("Transaction", transactionSchema);
