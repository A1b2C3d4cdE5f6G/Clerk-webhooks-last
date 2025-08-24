  import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    clerkId: { type: String, required: true, unique: true }, // ID من Clerk
    email: { type: String, required: true, unique: true },
    name: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;