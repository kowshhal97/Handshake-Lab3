

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList
} = require('graphql')


const getAllStudents = require('./Query Resolvers/getAllStudents')

const getStudentById = require('./Query Resolvers/getStudentById')


const Education = new GraphQLObjectType({
    name: 'education',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        institution_name: {
            type: GraphQLString
        },
        location: {
            type: GraphQLString
        },
        degree: {
            type: GraphQLString
        },
        major: {
            type: GraphQLString
        },
        passing_year: {
            type: GraphQLString
        },
        cgpa: {
            type: GraphQLString
        }
    })
})

const Experience = new GraphQLObjectType({
    name: 'experience',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        company_name: {
            type: GraphQLString
        },
        designation: {
            type: GraphQLString
        },
        company_location: {
            type: GraphQLString
        },
        work_summary: {
            type: GraphQLString
        },
        starting_date: {
            type: GraphQLString
        },
        ending_date: {
            type: GraphQLString
        }
    })
})

const Applications = new GraphQLObjectType({
    name: 'applications',
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        applicationId: {
            type: GraphQLString
        },
        status: {
            type: GraphQLString
        },
        companyName: {
            type: GraphQLString
        },
        job_title: {
            type: GraphQLString
        },
        job_location: {
            type: GraphQLString
        },
        job_salary: {
            type: GraphQLString
        },
        job_description: {
            type: GraphQLString
        },
        job_category: {
            type: GraphQLString
        },
        job_posting_date: {
            type: GraphQLString
        },
        job_application_deadline: {
            type: GraphQLString
        },
        job_requirements: {
            type: GraphQLString
        },
        application_date: {
            type: GraphQLString
        }
    })
})

const Student = new GraphQLObjectType({
    name: 'student',
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        major: {
            type: GraphQLString
        },
        collegeName: {
            type: GraphQLString
        },
        contactNumber: {
            type: GraphQLInt
        },
        dateOfBirth: {
            type: GraphQLString
        },
        city: {
            type: GraphQLString
        },
        state: {
            type: GraphQLString
        },
        country: {
            type: GraphQLString
        },
        careerObjective: {
            type: GraphQLString
        },
        education: {
            type: new GraphQLList(Education),
            description: "Education details of a Student"
        },
        experience: {
            type: new GraphQLList(Experience),
            description: "Experience details of a student"
        },
        applications:{
            type:new GraphQLList(Applications),
            description:"All applied Jobs"
        }
    })

})



const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({
        students: {
            type: new GraphQLList(Student),
            description: "Get ALL Students",
            resolve: () => {
                return getAllStudents();
            }
        },
        student: {
            type: Student,
            description: "Get Student By Id",
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (parent, args) => {
                return getStudentById(args.id)
            }
        }
        // employer:{

        // },
        // jobs:{

        // }
    })
})


const schema = new GraphQLSchema({
    query: RootQueryType
})


module.exports = schema;