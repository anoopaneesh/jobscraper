

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
// export function getJobExtra(job) { 
//      return {
//         apiExtra: [
//             // {
//             //     name:"skills",
//             //     keys:['json_path'],
               //     transform: "tskills" 
//             // }
//         ],
//         scrapeExtra: [
//             // {
//             //     name:'skills',
//             //     keys:['selector1'],
               //     transform:(name,keys,data) => {return data}
//             // }
//         ],
//         // fetchLink : {
//                  api: () => 'fetch'
//                  scrape:''
//          }
//      }
// }
// --------------------------------

// Write code below





// Use this Template
// --------------------
// export function getJobExtra(job) { 
//      return {
//         apiExtra: [
//             // {
//             //     name:"skills",
//             //     keys:['json_path'],
               //     transform: "tskill" 
//             // }
//         ],
//         scrapeExtra: [
//             // {
//             //     name:'skills',
//             //     keys:['selector1'],
               //     transform:(name,keys,data) => {return data}
//             // }
//         ],
//         // fetchLink : {
//                  api: () => 'fetch'
//                  scrape:''
//          }
//      }
// }
// --------------------------------

// Write code below





// Use this Template
// --------------------
export function getJobExtra(job) { 
     return {
        apiExtra: [
            {
                name:"skills",
                keys:['longDescription','jobConfigurationData.Skills Required'],
                transform:'tskills'
            },
            {
                name:"experience",
                keys:['minYrsOfExperience'],
                transform:(name,keys,data) => Number(data?.[0])
            }
        ],
        scrapeExtra: [
            // {
            //     name:'skills',
            //     key:['selector1']
            // }
        ],
        fetchLink : {
            api : () =>   fetch("https://public.zwayam.com/core/v1/job/getJobForUrl", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryH7v3QsIyDAw7u6p3",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "Referer": "https://www.flipkartcareers.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": `------WebKitFormBoundaryH7v3QsIyDAw7u6p3\r\nContent-Disposition: form-data; name=\"jobUrl\"\r\n\r\n${job.link.split("/").pop()}\r\n------WebKitFormBoundaryH7v3QsIyDAw7u6p3\r\nContent-Disposition: form-data; name=\"externalSource\"\r\n\r\nCareerSite\r\n------WebKitFormBoundaryH7v3QsIyDAw7u6p3\r\nContent-Disposition: form-data; name=\"campusUrl\"\r\n\r\nempty\r\n------WebKitFormBoundaryH7v3QsIyDAw7u6p3\r\nContent-Disposition: form-data; name=\"companyId\"\r\n\r\n15110\r\n------WebKitFormBoundaryH7v3QsIyDAw7u6p3--\r\n`,
  "method": "POST"
}) 
        }
         
     }
}
// --------------------------------

// Write code below


