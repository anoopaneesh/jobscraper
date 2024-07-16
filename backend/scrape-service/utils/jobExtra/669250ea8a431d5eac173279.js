

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
                keys:['.posting-requirements'],
                transform: "tskills" 
            },
            {
                name:'experience',
                keys:['.posting-requirements'],
                transform: "tyoe" 
            }
        ],
        fetchLink : {
                // api: () => 'fetch'
                scrape:job.link?.split('/apply')?.[0] || ""
        }
     }
}
// --------------------------------

// Write code below



