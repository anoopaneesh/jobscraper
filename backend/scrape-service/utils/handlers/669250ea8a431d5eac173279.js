
//---------------------
// Use this Template
// --------------------
export function handler(req){
    const jobs = req || [] //get jobs array
    const total = req.length || jobs.length //get total as number
    return {
        total,
        jobs:jobs.map(item => {
            // Create an object of the form {title:<string>,location:<string[]>,link:<string>}
            let job = {
                title:item.text,
                location:item.categories.allLocations || [],
                link:item.applyUrl
            }
            return job
        })
    }
}
// --------------------------------
// Write code below
// --------------------------------

