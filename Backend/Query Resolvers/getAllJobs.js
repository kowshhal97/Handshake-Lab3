const mongoose=require('mongoose')

const JobPost=require("./../models/job")


getAllJobs=async()=>{
    try {
        const posts = await JobPost.find({});
        return posts;
    } catch (e) {
        console.log(e)
    }
}

module.exports=getAllJobs;

