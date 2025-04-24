const Feedback = require('../models/feedback')

exports.submitFeedback = async (req, res) => {
  try {
    const { text, rating } = req.body;

    if (!text || !rating) {
      return res.status(400).json({ error: "Text and rating are required" });
    }

    const imageUrl = req.file ? req.file.path : null;

    if (req.file && !req.file.mimetype.startsWith('image/')) {
      return res.status(400).json({ error: 'Please upload a valid image file.' });
    }

    const feedback = new Feedback({
      userId: req.user.id,
      text,
      rating,
      imageUrl
    });

    await feedback.save();

    res.status(201).json({ message: "Feedback submitted", feedback });
  } catch (error) {
    console.error("Error during feedback submission:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.getAllFeedback = async (req, res) => {
  try {
    const { rating, sort } = req.query;

    let query = {};
    if (rating && Number(rating) !== 0) {
      query.rating = Number(rating);
    }

    const sortOrder = sort === "desc" ? -1 : 1;

    const feedbacks = await Feedback.find(query)
      .populate("userId", "name email")
      .sort({ createdAt: sortOrder });

    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


  exports.addComment = async (req, res) => {
    try {
      console.log("Feedback ID:", req.params.id);
      console.log("Admin Comment:", req.body.comment);
  
      const { comment } = req.body;
      const feedback = await Feedback.findByIdAndUpdate(
        req.params.id,
        { adminComment: comment },
        { new: true }
      );
  
      if (!feedback) {
        return res.status(404).json({ error: "Feedback not found" });
      }
  
      res.json({ message: "Comment added", feedback });
    } catch (err) {
      console.error("Add comment error:", err);
      res.status(500).json({ error: err.message });
    }
  };
  

 