
// Use this Template
// --------------------
// export function handler($,page,cheerio){
//     return {
//         total, // should be a number
//         jobs // should be of the form {title:string,location:string[],link:string}
//     }
// }
// --------------------------------
// Write code below


export function handler($,page,cheerio){
    //check2
    const jobs = []
    $('ul.jobs-search__results-list li').each((i,el) => {
        const title = $(el).find('h3.base-search-card__title').first().text()
        const location = $(el).find('span.job-search-card__location').first().text()
        const link = $(el).find('a.base-card__full-link').first().attr('href')
        jobs.push({
            title,
            location:location ? [location]:  [],
            link
        })
    })
    return {
        total : jobs.length, // should be a number
        jobs // should be of the form {title:string,location:string[],link:string}
    }
}
