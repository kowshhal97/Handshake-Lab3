const Student = require('./../models/student')

const login = async (loginDetails) => {
  try {
    const user = await Student.findOne(loginDetails)
    return user;
  } catch (e) {
    console.log(e)
  }
}

const signup = async (signupDetails) => {
  const user = new Student(signupDetails)
  try {
    await user.save()
    return user;
  } catch (e) {
    console.log(e)
  }
}

module.exports=login
module.exports=signup
