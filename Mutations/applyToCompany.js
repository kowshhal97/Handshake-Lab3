const JobPost = require('../models/job')

const Student = require('./../models/student')


apply = async (student,jobId,application_date) => {

    try {
        if (student) {
            const post = await JobPost.findById(jobId)
            if (!post) {
                return null
            }
            post.students.push(student)
            await post.save()
            const user = await Student.findById(student._id)
            const { companyName, job_title, job_posting_date, job_application_deadline, job_location, job_salary, job_description, job_category,job_requirements } = post
            const applicationId = post._id
            const status = 'Pending'
            user.applications.push({ applicationId, status, companyName, job_title, job_location, job_salary, job_description, job_category,job_posting_date,job_application_deadline,job_requirements,application_date });
            await user.save()
            
            return user
        }
        console.log("***")
//         else {
//             const post = await JobPost.findByIdAndUpdate(id, msg,{new:true})
// return post
//         }
    } catch (e) {
        console.log(e)
    }

}

module.exports=apply;