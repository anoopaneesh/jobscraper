
// Use this Template
// --------------------
// export function getPage(count) { 
//     const offset = (count-1) * limit
//     return <fectch> or <string>
// }
// --------------------------------

// Write code below

export function getPage(count){
    return `https://gcsservices.careers.microsoft.com/search/api/v1/search?lc=India&l=en_us&pg=${count}&pgSz=20&o=Relevance&flt=true`
}