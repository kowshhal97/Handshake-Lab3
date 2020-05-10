const JobPost = require('../models/job')

const Student = require('./../models/student')
updateApplicationHandler = async (applicationId, status,studentId) => {


    try {
        const student = await Student.findById(studentId)
        student.applications.filter((application) => {
            if (application.applicationId == applicationId) {
                application.status = status
            }
        })
        await student.save()
        return student
    } catch (e) {
        console.log(e)
    }
}


applyHandler = async (student,id) => {

    try {
        if (student) {
            const post = await JobPost.findById(id)
            if (!post) {
                res.status = 404
                callback(null, res)
                return
            }
            post.students.push(student)
            await post.save()
            const user = await Student.findById(student._id)
            const { companyName, job_title, job_posting_date, job_application_deadline, job_location, job_salary, job_description, job_category,job_requirements } = post
            const application_date=msg.application_date;
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
        res.status = 400
        callback(null, res)
        return
    }

}