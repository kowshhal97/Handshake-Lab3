const mongoose = require('mongoose')

const JobPost = require("./../models/job")


getEmployerById = async (name) => {
    try {
        const user = await Employer.findOne({name:name})
        return user;
      } catch (e) {
        console.log(e)
      }
}

module.exports = getEmployerById;

