

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
                keys:['div.mjp-show-more__content-container'],
                transform:"tskills"
            },
            {
                name:'experience',
                 keys:['div.mjp-show-more__content-container'],
                transform:"tyoe"
            }
        ],
        fetchLink : {
              //  api: () => 'fetch'
                scrape:job.PositionURI
        }
     }
}
// --------------------------------

// Write code below



