
// Use this Template
// --------------------
// export function handler(req){
//     const jobs = [] //get jobs array
//     const total = 0 //get total as number
//     return {
//         total,
//         jobs:jobs.map(item => {
//             // Create an object of the form {title:<string>,location:<string[]>,link:<string>}
//             let job = {
//                 title:"",
//                 location:[],
//                 link:""
//             }
//             return job
//         })
//     }
// }
// --------------------------------

// Write code below


export function handler(req){
    const jobs = req.data.data //get jobs array
    const total = req.data.totalCount //get total as number
    return {
        total,
        jobs:jobs.map(item => {
            // Create an object of the form {title:<string>,location:<string[]>,link:<string>}
            let job = {
                title:item._source.jobTitle,
                location:item._source.location ? [item._source.location] : [],
                link:`https://www.flipkartcareers.com/#!/job-view/${item._source.jobUrl}`
            }
            return job
        })
    }
}

