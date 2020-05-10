
const Employer = require('../models/employer')

const login = async (loginDetails) => {
    var res = {}
    try {
        const user = await Employer.findOne(loginDetails)
        return user;
    } catch (e) {
        console.log(e)
    }

}

const signup = async (signupDetails) => {
    const user = new Employer(signupDetails)
    try {
        await user.save()
        return user;
    } catch (e) {
        console.log(e)
    }

}

module.exports=login

module.exports=signup