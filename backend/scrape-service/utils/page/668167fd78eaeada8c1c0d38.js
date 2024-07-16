
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
    const start = (count-1) * 10;
    return `https://paypal.eightfold.ai/api/apply/v2/jobs?domain=paypal.com&start=${start}&num=10&exclude_pid=274901417520&location=india&pid=274901417520&domain=paypal.com&sort_by=relevance`
}

