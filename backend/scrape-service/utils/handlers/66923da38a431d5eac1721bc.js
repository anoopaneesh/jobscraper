
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
    $('#skip-facet > div > div > div > div:nth-child(1) > div > div._search-jobs-block_1rdyn_179.phw-card-block.phw-mt-sm-1 > div > div > div > div').each((i,el) => {
        const title = $(el).find('h3.phw-pr-4').first().text()
        const location = $(el).find('div.job-location > span:nth-child(2)').first().text()
        const link = $(el).find('h3.phw-pr-4 a').first().attr('href')
        jobs.push({
            title,
            location:location ? [location]:  [],
            link
        })
    })
    const total = $('span._total-jobs-count_1rdyn_101').first().text()
    return {
        total : total ? Number(total) : jobs.length, // should be a number
        jobs // should be of the form {title:string,location:string[],link:string}
    }
}

// --------------------------------
// Write code below

