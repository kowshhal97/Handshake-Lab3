const mongoose=require('mongoose')

const Student=require("./../models/student")


getAllStudents=async()=>{
   
    try {
      const users = await Student.find({})
      return users
  } catch (e) {
    console.log(e)
  }
}

module.exports=getAllStudents;

