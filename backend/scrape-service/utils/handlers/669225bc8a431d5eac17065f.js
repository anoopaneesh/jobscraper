
//---------------------
// Use this Template
// --------------------
// export function handler(req){
//     const jobs = [] //get jobs array
//     const total = jobs.length //get total as number
//     return {
//         total,
//         jobs:jobs.map(item => {
//             // Create an object of the form {title:<string>,location:<string[]>,link:<string>}
//             let job = {
//                 title:item.title,
//                 location:item.location ? [item.location] : [],
//                 link:item.applyurl
//             }
//             return job
//         })
//     }
// }
// --------------------------------
// Write code below
// --------------------------------


//---------------------
// Use this Template
// --------------------
export function handler(req){
    const jobs = req.SearchResult.SearchResultItems || [] //get jobs array
    const total = req.SearchResult.SearchResultCountAll || jobs.length //get total as number
    return {
        total,
        jobs:jobs.map(item => {
            // Create an object of the form {title:<string>,location:<string[]>,link:<string>}
            let job = {
                title:item.MatchedObjectDescriptor.PositionTitle,
                location:item.MatchedObjectDescriptor.PositionLocation?.map(i => i.CityName+ " " + i.CountryCode)  ||  [],
                link:item.MatchedObjectDescriptor.ApplyURI?.[0] || "",
                PositionURI: item.MatchedObjectDescriptor.PositionURI
            }
            return job
        })
    }
}
// --------------------------------
// Write code below
// --------------------------------

