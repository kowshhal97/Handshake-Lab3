

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList,
    GraphQLInputObjectType
} = require('graphql')


const getAllStudents = require('./Query Resolvers/getAllStudents')

const getStudentById = require('./Query Resolvers/getStudentById')

const getEmployerById = require('./Query Resolvers/getEmployerById')

const getAllJobs = require('./Query Resolvers/getAllJobs');

const getJobsId = require('./Query Resolvers/getJobsById')

const updateStudentById = require('./Mutations/updateStudent')

const updateEmployerById = require('./Mutations/updateCompanyById')

const postJob = require('./Mutations/postJob')

const getJobsByCompanyName = require('./Query Resolvers/getJobsByCompanyName')

const applyToJob = require('./Mutations/applyToCompany')

const updateStatus = require('./Mutations/updateApplicationStatus')

const studentLogin = require('./Mutations/studentLogin')

const studentSignUp = require('./Mutations/companySignUp')

const employeeLogin = require('./Mutations/companyLogin')

const employeeSignUp=require('./Mutations/companySignUp')

const Employer = new GraphQLObjectType({
    name: "employer",
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
        location: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        contactNumber: {
            type: GraphQLString
        }
    })
})

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
        studentId: {
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
        cgpa: {
            type: GraphQLString
        },

        collegeName: {
            type: GraphQLString
        },
        contactNumber: {
            type: GraphQLString
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
        skillSet:{
            type:  new GraphQLList(GraphQLString)
        },
        education: {
            type: new GraphQLList(Education),
            description: "Education details of a Student"
        },
        experience: {
            type: new GraphQLList(Experience),
            description: "Experience details of a student"
        },
        applications: {
            type: new GraphQLList(Applications),
            description: "All applied Jobs"
        }
    })

})



const Job = new GraphQLObjectType({
    name: "job",
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        companyName: {
            type: GraphQLString
        },
        job_title: {
            type: GraphQLString
        },
        job_posting_date: {
            type: GraphQLString
        },
        job_application_deadline: {
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
        job_requirements: {
            type: GraphQLString
        },
        students: {
            type: new GraphQLList(Student),
            description: "All students who applied for the jobs"
        },


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
                return getStudentById(args.id);
            }
        },
        jobs: {
            type: new GraphQLList(Job),
            description: "List of all Jobs",
            resolve: () => {
                return getAllJobs();
            }
        },
        job: {
            type: Job,
            description: "get Job By Id",
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            }, resolve: (parent, args) => {
                return getJobsId(args.id)
            }
        },
        employee: {
            type: Employer,
            description: "get Employer By Name",
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (parent, args) => {

                return getEmployerById(args.name)
            }
        },
        getJobsByCompanyName: {
            type: new GraphQLList(Job),
            description: "get Jobs By Company Name",
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: async (parent, args) => {
                return getJobsByCompanyName(args.name)
            }
        }

    })
})

const applicationInputType = new GraphQLInputObjectType({
    name: "ApplicationsInput",
    fields: () => ({
        _id:{
            type:GraphQLString
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

const experienceInputType = new GraphQLInputObjectType({
    name: "ExperienceInput",
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

const educationInputType = new GraphQLInputObjectType({
    name: "EducationInput",
    fields: () => ({
        id: {
            type: GraphQLString
        },
        institution_name: {
            type: GraphQLString
        },
        degree: {
            type: GraphQLString
        },
        major: {
            type: GraphQLString
        },
        location:{
            type:GraphQLString
        },
        passing_year: {
            type: GraphQLString
        },
        cgpa: {
            type: GraphQLString
        }
    })
})

const StudentInputType = new GraphQLInputObjectType({
    name: "studentInput",
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        studentId: {
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
        cgpa: {
            type: GraphQLString
        },

        collegeName: {
            type: GraphQLString
        },
        contactNumber: {
            type: GraphQLString
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
            type: new GraphQLList(educationInputType),
            description: "Education details of a Student"
        },
        experience: {
            type: new GraphQLList(experienceInputType),
            description: "Experience details of a student"
        },
        applications: {
            type: new GraphQLList(applicationInputType),
            description: "All applied Jobs"
        },
        skillSet:{
            type:new GraphQLList(GraphQLString)
        }
    })
})

const EmployerInput = new GraphQLInputObjectType({
    name: "EmployerInput",
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
        location: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        contactNumber: {
            type: GraphQLString
        }
    })

})

const JobPostInput = new GraphQLInputObjectType({
    name: "PostJob",
    fields: ({
        companyName: {
            type: GraphQLString
        },
        job_title: {
            type: GraphQLString
        },
        job_posting_date: {
            type: GraphQLString
        },
        job_application_deadline: {
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
        job_requirements: {
            type: GraphQLString
        },
        students: {
            type: new GraphQLList(StudentInputType),
            description: "All students who applied for the jobs"
        }
    })
})

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: "Root Mutation",
    fields: () => ({
        updateStudent: {
            type: Student,
            description: 'Update Student',
            args: {
                student: {

                    type: new GraphQLNonNull(StudentInputType)
                },
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (parent, args) => {
                return updateStudentById(args.id, args.student)
            }
        },
        updateEmployer: {
            type: Employer,
            description: "UpdateCompany",
            args: {
                employer: {
                    type: new GraphQLNonNull(EmployerInput)
                },
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (parent, args) => {
                return updateEmployerById(args.id, args.employer)
            }
        },
        Postjob: {
            type: Job,
            description: "Post Job",
            args: {
                jobPost: {
                    type: new GraphQLNonNull(JobPostInput)
                }
            },
            resolve: (parent, args) => {
                return postJob(args.jobPost)
            }
        },
        applyToJob: {
            type: Student,
            description: "Apply to Job posting by Id",
            args: {
                student: {
                    type: StudentInputType
                },
                jobId: {
                    type: GraphQLString
                },
                application_date: {
                    type: GraphQLString
                }
            },
            resolve: (parent, args) => {
                return applyToJob(args.student, args.jobId, args.application_date)
            }
        },
        updateApplicationStatus: {
            type: Student,
            description: "Update application status of a student",
            args: {
                applicationId: {
                    type: GraphQLString
                },
                studentId: {
                    type: GraphQLString
                },
                status:{
                    type:GraphQLString
                }
            },
            resolve:(parent,args)=>{
                updateStatus(args.applicationId,args.studentId,args.status)

            }
        },
        studentLogin: {
            type: Student,
            description: "Student Login",
            args: {
                studentDetails: {
                    type: StudentInputType
                }
            },
            resolve: (parent, args) => {
                return studentLogin(args.studentDetails)
            }
        },
        studentSignUp: {
            type: Student,
            description: "Student Signup",
            args: {
                studentDetails: {
                    type: StudentInputType
                }
            },
            resolve: (parent, args) => {
                return studentSignUp(args.studentDetails)
            }
        },
        companyLogin: {
            type: Employer,
            description: "Employee Login",
            args: {
                employeeDetails: {
                    type: EmployerInput
                }
            },
            resolve: (parent, args) => {
                return employeeLogin(args.employeeDetails)
            }
        },
        companySignUp: {
            type: Employer,
            description: "Employee SingUp",
            args: {
                employeeDetails: {
                    type: EmployerInput
                }
            },
            resolve: (parent, args) => {
                return employeeSignUp(args.employeeDetails)
            }
        },

    })
})



const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})


module.exports = schema;