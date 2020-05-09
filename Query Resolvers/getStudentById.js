const mongoose=require('mongoose')

const Student=require("./../models/student")



getStudentById=async(_id)=>{
    try {
        const user = await Student.findById(_id)
        
      return user
    
    } catch (e) {
      console.log(e)
    }
}

module.exports=getStudentById;

