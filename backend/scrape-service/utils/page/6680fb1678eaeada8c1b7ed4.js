
// Use this Template
// --------------------
// export function getPage(count) { 
//     return {
//         url: "<url of the api>",
//         method: "<method>",
//         data: "<body>",
//         headers: "<headers>"
//     }
// }
// --------------------------------

// Write code below


export function getPage(count) { 
    return `https://www.google.com/about/careers/applications/jobs/results/?location=India&page=${count}`
}

