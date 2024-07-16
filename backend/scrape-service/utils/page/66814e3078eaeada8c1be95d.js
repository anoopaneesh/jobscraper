
// Use this Template
// --------------------
// export function getPage(count) { 
//     const offset = (count-1) * limit
//     return <fectch> or <string>
// }
// --------------------------------

// Write code below


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
    return "https://api.lever.co/v0/postings/zeta?group=team&mode=json"
}

