import mongoose from "mongoose";

const { Schema } = mongoose;

const MeetingSchema = new Schema({
  user_id: {
    type: String,
  },
  meetingCode: {
    type: String,
    default: () => Date.now().toString(), // function to avoid same default value
    required: true,
  },
});

const Meeting = mongoose.model("Meeting", MeetingSchema);
export default Meeting;
