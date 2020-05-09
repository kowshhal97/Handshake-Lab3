
const Student=require('./../models/student')


updateStudentById=async(id,student)=>{
    try {
      const user = await Student.findByIdAndUpdate(id, student,{new:true})
      return user
    } catch (e) {
      console.log(e)
    }
  }

  module.exports=updateStudentById