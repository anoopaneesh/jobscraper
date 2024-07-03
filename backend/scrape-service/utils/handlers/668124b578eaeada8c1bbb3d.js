
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
    const jobs = req.data.roleSearch.items //get jobs array
    const total = req.data.roleSearch.totalCount //get total as number
    return {
        total,
        jobs:jobs.map(item => {
            // Create an object of the form {title:<string>,location:<string[]>,link:<string>}
            const loc = item.locations?.map(l => `${l.city} ${l.state} ${l.country}`)
            let job = {
                title:item.jobTitle,
                location: loc || [],
                link:`https://higher.gs.com/roles/${item.externalSource.sourceId}`
            }
            return job
        })
    }
}
