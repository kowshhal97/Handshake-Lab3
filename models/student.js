const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    major: String,
    collegeName: String,
    contactNumber: Number,
    dateOfBirth: String,
    city: String,
    state: String,
    country: String,
    careerObjective: String,
    skillSet: [],
    education: [{
        id: String,
        institution_name: String,
        location: String,
        degree: String,
        major: String,
        passing_year: String,
        cgpa: String
    }],
    experience: [{
        id: String,
        company_name: String,
        designation: String,
        company_location: String,
        work_summary: String,
        starting_date: String,
        ending_date: String
    }],
    applications: [{
        applicationId: Schema.Types.ObjectId,
        status: String,
        companyName: String,
        job_title: String,
        job_posting_date: String,
        job_application_deadline: String,
        job_location: String,
        job_salary: String,
        job_description: String,
        job_category: String,
        job_requirements: String,
        application_date:String

    }],
    registeredEvents: [{
        registeredEventId: Schema.Types.ObjectId,
        eventId: Schema.Types.ObjectId,
        companyName: String,
        event_name: String,
        event_description: String,
        event_timing: String,
        event_location: String,
        event_eligibility_criteria: String,
        event_from_date: String,
        event_to_date: String,
        event_major: String,
        application_date:String
    }]
})

const Student = mongoose.model('student', StudentSchema);

module.exports = Student;