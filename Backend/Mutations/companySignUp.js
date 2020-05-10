
const Employer = require('../models/employer')

const employersignUp = async (signupDetails) => {
    const user = new Employer(signupDetails)
    try {
        await user.save()
        return user;
    } catch (e) {
        console.log(e)
    }
}


module.exports=employersignUp