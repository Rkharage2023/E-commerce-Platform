import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String },
    googleId: String,
    role: { type: String, default: "user" },
    salary: { type: Number, default: 0 },
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

// Automatically hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
