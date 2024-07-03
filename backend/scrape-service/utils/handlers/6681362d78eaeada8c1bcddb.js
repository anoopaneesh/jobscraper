
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
    const jobs = req.refineSearch.data.jobs || [] //get jobs array
    const total = req.refineSearch.totalHits //get total as number
    return {
        total,
        jobs:jobs.map(item => {
            // Create an object of the form {title:<string>,location:<string[]>,link:<string>}
            let job = {
                title:item.title,
                location:item.cityStateCountry ? [item.cityStateCountry] : [],
                link:item.applyUrl
            }
            return job
        })
    }
}

