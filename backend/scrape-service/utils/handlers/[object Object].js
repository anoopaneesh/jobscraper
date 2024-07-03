
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
    const jobs = req.data.map(item => item.postu.map(i => i.allpost).flat()).flat() //get jobs array
    const total = jobs.length //get total as number
    return {
        total,
        jobs:jobs.map(item => {
            // Create an object of the form {title:<string>,location:<string[]>,link:<string>}
            let job = {
                title:item.descm,
                location:item.location ? [item.location] : [],
                link:item.applyurl
            }
            return job
        })
    }
}

