import mongoose from "mongoose";
const queSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  service: {
    type: String,
    enum: ["fuel", "food", "other"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  typed: {
    type: String,
    enum: ["s", "d"],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});
queSchema.index({ location: "2dsphere" });
const Que = mongoose.model("Que", queSchema);
export default Que;
