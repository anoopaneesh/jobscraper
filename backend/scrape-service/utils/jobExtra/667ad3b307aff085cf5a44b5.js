

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
                keys:['#job-detail-body > div > div.col-12.col-md-7.col-lg-8.col-xl-9 > div'],
                  transform:"tskills"
            },
            {
                name:'experience',
                keys:['#job-detail-body > div > div.col-12.col-md-7.col-lg-8.col-xl-9 > div'],
                transform:'tyoe'
            }
        ],
        // fetchLink : {
        //         api: () => 'fetch'
        //         // scrape:''
        // }
     }
}
// --------------------------------

// Write code below



