const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
    user_id: {
        type: String,
    },
    meetingCode: {
        type: String,
        default: Date.now(),
        required: true,
    },
    
});


module.exports = mongoose.model("Meeting", MeetingSchema);