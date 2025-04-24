const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { submitFeedback, getAllFeedback, addComment} = require("../controllers/feedbackController");
const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require("../middleware/roleMiddleware")
const suggestReply = require("../utils/aiReplyGenerator");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Creates folder if it doesn't exist
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

  const upload = multer({ storage });

  router.post("/", authMiddleware, upload.single("image"), submitFeedback);
  router.get("/", authMiddleware, requireRole("admin"), getAllFeedback);
  router.put("/:id/comment", authMiddleware, requireRole("admin"), addComment);

  router.post("/suggest-reply", authMiddleware, requireRole("admin"), (req, res) => {
    const { text } = req.body;
    const reply = suggestReply(text);
    res.json({ suggestedReply: reply });
  });

 




  

  module.exports = router;
