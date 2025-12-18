import { Issue } from "../models/issue.model.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

export const createIssue = async (req, res) => {
  try {
    const { title, description, category, lat, lng } = req.body;
    let imageURL = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "civicconnect" });
      imageURL = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const issue = await Issue.create({
      title,
      description,
      category,
      location: { lat, lng },
      imageURL,
      createdBy: req.user._id
    });

    res.json({ issue });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getIssues = async (req, res) => {
  const issues = await Issue.find().populate("createdBy", "name email");
  res.json({ issues });
};

export const getMyIssues = async (req, res) => {
  const issues = await Issue.find({ createdBy: req.user._id });
  res.json({ issues });
};

export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = await Issue.findByIdAndUpdate(id, { status }, { new: true });
  res.json({ issue: updated });
};

export const getLiveLocations = async (req, res) => {
  try {
    const issues = await Issue.find(
      {},
      {
        title: 1,
        status: 1,
        category: 1,
        location: 1,
      }
    );

    res.status(200).json({ issues });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};