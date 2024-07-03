
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
    const filtered_req = req.filter(job => job.locations.filter(loc => loc.toLowerCase().includes("india") || loc.toLowerCase().includes('remote'))?.length)
    const jobs = filtered_req //get jobs array
    const total = filtered_req.length //get total as number
    return {
        total,
        jobs:jobs.map(item => {
            // Create an object of the form {title:<string>,location:<string[]>,link:<string>}
            let job = {
                title:item.title,
                location:item.locations || [],
                link:`https://www.atlassian.com/company/careers/details/${item.id}`
            }
            return job
        })
    }
}

