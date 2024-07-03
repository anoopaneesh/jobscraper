export const getPageTemplate = `
// Use this Template
// --------------------
// export function getPage(count) { 
//     const offset = (count-1) * limit
//     return <fectch> or <string>
// }
// --------------------------------

// Write code below
`


export const extractApiTemplate = `
//---------------------
// Use this Template
// --------------------
// export function handler(req){
//     const jobs = [] //get jobs array
//     const total = jobs.length //get total as number
//     return {
//         total,
//         jobs:jobs.map(item => {
//             // Create an object of the form {title:<string>,location:<string[]>,link:<string>}
//             let job = {
//                 title:item.title,
//                 location:item.location ? [item.location] : [],
//                 link:item.applyurl
//             }
//             return job
//         })
//     }
// }
// --------------------------------
// Write code below
// --------------------------------
`

export const extractWebTemplate = `
// Use this Template
// --------------------
// export function handler($,page,cheerio){
//     const jobs = []
//     $('root_selector').each((i,el) => {
//         const title = $(el).find('title_selector').first().text()
//         const location = $(el).find('location_selector').first().text()
//         const link = $(el).find('link_selector').first().attr('href')
//         jobs.push({
//             title,
//             location:location ? [location]:  [],
//             link
//         })
//     })
//     const total = $('total_selector').first().text()
//     return {
//         total : total ? Number(total) : jobs.length, // should be a number
//         jobs // should be of the form {title:string,location:string[],link:string}
//     }
// }

// --------------------------------
// Write code below
`


export const ScrapeStatus = {
    "Scraping": "Scraping",
    "Completed":"Completed",
    "Failed":"Failed"
}

export const Events = {
    SCRAPE_START:'scrape-start',
     SCRAPE_END:'scrape-end',
     LOG_ENTRY:'log-entry'
}
