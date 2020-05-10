const Student = require('./../models/student')
updateApplication = async (applicationId, status,studentId) => {


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

module.exports=updateApplication