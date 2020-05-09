const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventPostSchema = new Schema({
    companyName: String,
    event_name: {
        type: String,
        required: true,
    },
    event_description: {
        type: String,
        required: true,
    },
    event_timing:String,
    event_location: String,
    event_eligibility_criteria: String,
    event_from_date: String,
    event_to_date: String,
    event_major:String,
    students: [{
        name: String,
        studentId: Schema.Types.ObjectId,
        major: String,
        collegeName: String
    }]
})

const EventPost = mongoose.model('eventpost', EventPostSchema);

module.exports = EventPost;