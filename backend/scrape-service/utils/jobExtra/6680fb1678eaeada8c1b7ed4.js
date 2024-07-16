

// Use this Template
// --------------------
// export function getJobExtra(job) { 
//      return {
//         apiExtra: [
//             // {
//             //     name:"skills",
//             //     keys:['json_path'],
//               //     transform: "tskills" 
//             // }
//         ],
//         scrapeExtra: [
//             // {
//             //     name:'skills',
//             //     keys:['selector1'],
//               //     transform:(name,keys,data) => {return data}
//             // }
//         ],
//         // fetchLink : {
//                 // api: () => 'fetch'
//                 // scrape:''
//         // }
//      }
// }
// --------------------------------

// Write code below





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
                keys:['main > div > c-wiz > div > div > div > span > div'],
                transform:"tskills"
            },
            {
                name:'experience',
                keys:['main > div > c-wiz > div > div > div > span > div'],
                transform:"tyoe"
            }
        ],
        // fetchLink : {
                // api: () => 'fetch'
                // scrape:''
        // }
     }
}
// --------------------------------

// Write code below



