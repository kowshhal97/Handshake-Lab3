const mongoose = require('mongoose')

const JobPost = require("./../models/job")


getAllJobs = async (id) => {
    const _id = id

    try {
        const post = await JobPost.findById(_id)
        return post
    } catch (e) {
        console.log(e)
    }
}

module.exports = getAllJobs;

