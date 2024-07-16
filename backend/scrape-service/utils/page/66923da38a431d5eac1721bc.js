
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
export function getPage(count) { 
    const offset = (count-1) * 10
    return `https://careers.quest-global.com/global/en/c/software-digital-jobs${offset ? `?from=${offset}&s=1` : ``}`
}
// --------------------------------

// Write code below

