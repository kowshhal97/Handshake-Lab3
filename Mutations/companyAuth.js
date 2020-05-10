
const Employer = require('../models/employer')

const login = async (loginDetails) => {
    var res = {}
    try {
        const user = await Employer.findOne(loginDetails)
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