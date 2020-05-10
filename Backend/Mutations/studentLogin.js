const Student = require('../models/student')

const studentLogin = async (loginDetails) => {
  try {
    const user = await Student.findOne(loginDetails)
    if(!user){
        throw "user not found"
    }
    else if(loginDetails.password!=user.password){
        throw "Wrong password"
    }
    return user;
  } catch (e) {
    throw e
  }
}


module.exports=studentLogin

