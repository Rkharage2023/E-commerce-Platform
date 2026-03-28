import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  googleId: String,
  role: {
    type: String,
    default: "user",
  },

  // Salary (for employees)
  salary: {
    type: Number,
    default: 0,
  },

  // Invite fields (for employee invite flow)
  inviteToken: String,
  inviteTokenExpire: Date,
  inviteStatus: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending",
  },
});

// MATCH PASSWORD
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
