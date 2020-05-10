
const JobPost=require('./../models/job')


postJob=async(jobPost)=>{
    const post = new JobPost(jobPost)
    try {
        await post.save()
      return user
    } catch (e) {
      console.log(e)
    }
  }

  module.exports=postJob