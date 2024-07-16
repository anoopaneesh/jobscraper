
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


// Use this Template
// --------------------
export function handler($,page,cheerio){
    const jobs = []
    $('div.job-search-results-card-col').each((i,el) => {
        const title = $(el).find('h3.job-search-results-card-title a').first().text()
        const locations = []
        $(el).find('li.job-component-location').each((j,li) => {
            locations.push($(li).text())
        })
        const link = $(el).find('h3.job-search-results-card-title a').first().attr('href')
        jobs.push({
            title,
            location:locations,
            link
        })
    })
    const total = null
    return {
        total : total ? Number(total) : jobs.length, // should be a number
        jobs // should be of the form {title:string,location:string[],link:string}
    }
}

// --------------------------------
// Write code below

