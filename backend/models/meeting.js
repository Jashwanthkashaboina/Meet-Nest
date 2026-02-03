import mongoose from "mongoose";

const { Schema } = mongoose;

const MeetingSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  meetingCode: {
    type: String,
    required: true,
  },
},
  { timestamps: true }
);

const Meeting = mongoose.model("Meeting", MeetingSchema);
export default Meeting;
