
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
    $('li.lLd3Je').each((i,el) => {
        const title = $(el).find('h3.QJPWVe').first().text()
        const location = $(el).find('span.r0wTof ').first().text()
        const link = $(el).find('a.WpHeLc').first().attr('href')
        jobs.push({
            title,
            location:location ? [location]:  [],
            link:`https://www.google.com/about/careers/applications/`+link
        })
    })
    const total =   $('span.SWhIm').first().text()
    return {
        total : total ? Number(total) : jobs.length, // should be a number
        jobs // should be of the form {title:string,location:string[],link:string}
    }
}

// --------------------------------
// Write code below

