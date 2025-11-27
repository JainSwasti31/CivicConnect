import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  location: { lat: Number, lng: Number },
  imageURL: String,
  status: { type: String, enum: ["Pending","In Progress","Resolved"], default: "Pending" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export const Issue = mongoose.model("Issue", issueSchema);
