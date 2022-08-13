import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  createAt?: Date;
  updateAt?: Date;
  _doc?: any; //mongodb always stores all the values in _doc property
}

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
