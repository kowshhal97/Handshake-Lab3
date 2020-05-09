

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


const Student = new GraphQLObjectType({
    name: 'student',
    fields: () => ({
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
            type: new GraphQLObjectType(Student),
            description: "Get Student By Id",
            resolve: (parent, args) => {
                return getStudentById(args.id)
            }
        },
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