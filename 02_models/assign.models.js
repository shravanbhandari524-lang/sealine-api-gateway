import mongoose from "mongoose";
const assignSchema = new mongoose.Schema({
  req_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Que",
  },
  off_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Que",
  },
  service: {
    type: String,
    enum: ["fuel", "food", "other"],
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
assignSchema.index({ location: "2dsphere" });
const Assign = mongoose.model("Assign", assignSchema);
export default Assign;
