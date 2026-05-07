const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    middleName: { type: String, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String, required: true },

    address: String,
    country: String,
    stateProvince: String,
    city: String,
    zipCode: String,
    dob: String,
    houseAddress: String,
    phone: String,
    accountType: String,
    ssn: String,
    govId: String,

    balance: { type: Number, default: 0 },
    savings: { type: Number, default: 0 },
    cards: {
      type: [
        new mongoose.Schema(
          {
            id: Number,
            name: String,
            limit: Number,
            balance: Number,
          },
          { _id: false }
        ),
      ],
      default: () => [
        { id: 1, name: "Platinum", limit: 25000, balance: 0 },
        { id: 2, name: "Gold", limit: 10000, balance: 0 },
        { id: 3, name: "Business", limit: 50000, balance: 0 },
      ],
    },
    status: {
      type: String,
      enum: ["Pending Approval", "Approved", "Rejected"],
      default: "Pending Approval",
    },
    lastActive: { type: Date },
  },
  { timestamps: true }
);

userSchema.methods.toPublic = function () {
  const o = this.toObject();
  delete o.passwordHash;
  delete o.ssn;
  delete o.__v;
  return o;
};

module.exports = mongoose.model("User", userSchema);
