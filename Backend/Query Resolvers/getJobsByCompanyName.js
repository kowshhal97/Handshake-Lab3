
const JobPost=require('../models/job')


getJobsByCompanyName=async(companyName)=>{

    try {
        const posts = await JobPost.find({ companyName: companyName })
       return posts;
    } catch (e) {
        console.log(e)
    }
  }

  module.exports=getJobsByCompanyName