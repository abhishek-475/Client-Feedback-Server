const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
},
  text: { 
    type: String, 
    required: true 
},
  rating: { 
    type: Number, 
    required: true 
},
  imageUrl: { 
    type: String 
},
  adminComment: { 
    type: String, 
    default: "" 
}
}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);
