const Student = require('./../models/student')

const studentSignUp = async (signupDetails) => {
    const user = new Student(signupDetails)
    try {
      await user.save()
      return user;
    } catch (e) {
      console.log(e)
    }
  }

  module.exports=studentSignUp