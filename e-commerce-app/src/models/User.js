const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },

    googleId: String,

    role: {
      type: String,
      enum: ["user", "employee", "admin"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    salary: {
      type: Number,
      default: 0,
    },

    inviteToken: String,

    inviteTokenExpire: Date,
    inviteStatus: {
      type: String,
      enum: ["Pending", "Active"],
      default: "Pending",
    },
  },

  { timestamps: true },
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);