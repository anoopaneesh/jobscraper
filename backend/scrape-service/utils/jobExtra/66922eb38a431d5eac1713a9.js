

// Use this Template
// --------------------
export function getJobExtra(job) { 
     return {
        apiExtra: [
            // {
            //     name:"skills",
            //     keys:['json_path'],
              //     transform: "tskills" 
            // }
        ],
        scrapeExtra: [
            {
                name:'skills',
                keys:['div.job-description'],
                 transform: "tskills" 
            },
            {
                name:'experience',
                keys:['div.job-description'],
                 transform: "tyoe" 
            }
        ],
        fetchLink : {
                // api: () => 'fetch'
                scrape:job.link
        }
     }
}
// --------------------------------

// Write code below



