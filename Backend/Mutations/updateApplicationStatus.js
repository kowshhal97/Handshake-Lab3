const Student = require('./../models/student')
updateApplication = async (applicationId,studentId,status) => {


    console.log()

    try {
        let student = await Student.findById(studentId)
        
        student.applications.filter((application) => {
            if (application.applicationId == applicationId) {
                application.status = status
            }
        })
        await student.updateOne(student)
        return student;
    } catch (e) {
        console.log(e)
    }
}

module.exports=updateApplication