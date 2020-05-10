
const Employer = require('../models/employer')

const employerLogin = async (loginDetails) => {
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


module.exports=employerLogin