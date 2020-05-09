const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobPostSchema = new Schema({  
    companyName: String,
    job_title: String,
    job_posting_date: String,
    job_application_deadline: String,
    job_location: String,
    job_salary: String,
    job_description: String,
    job_category: String,
    job_requirements:String,
    students: [{    
        studentId: Schema.Types.ObjectId,
        name: String,
        collegeName: String,
        major: String,
        cgpa: String, 
    }]
})

const JobPost = mongoose.model('jobpost', JobPostSchema);

module.exports = JobPost;