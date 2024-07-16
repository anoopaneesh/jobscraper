
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
      const regex = /https?:\/\/[^\s]+(?=\))/;
    $('div#freshteam-widget div.card').each((i,el) => {
        const title = $(el).find('p.job-title').first().text()
        const location = $(el).find('div > p:nth-child(3)').first().text()
        const link = $(el).attr('onclick')
        jobs.push({
            title,
            location:location ? [location]:  [],
            link : link.match(regex)?.[0]?.slice(0,-1) || ""
        })
    })
    const total = $('total_selector').first().text()
    return {
        total : total ? Number(total) : jobs.length, // should be a number
        jobs // should be of the form {title:string,location:string[],link:string}
    }
}

// --------------------------------
// Write code below

