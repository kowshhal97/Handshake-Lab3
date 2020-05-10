
const Employer=require('./../models/employer')


updateCompanyById=async(name,company)=>{
    try {
        const user = await Employer.findOneAndUpdate({name:name}, company,{new:true})
      return user
    } catch (e) {
      console.log(e)
    }
  }

  module.exports=updateCompanyById