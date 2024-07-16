
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
export function handler($,{logger}){
    const jobs = []
    $('div.jobs__cards a').each((i,el) => {
        const title = $(el).find('div.job-card__title-wrap > h3').first().text()
        const location = $(el).find('p.job-card__location').first().text()
        const link = `https://careers.makemytrip.com` +  $(el).attr('href') 
        jobs.push({
            title,
            location:location ? [location]:  [],
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

