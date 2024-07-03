
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
    const jobs = []
    $('tr.TableRow').each((i,el) => {
        const title =  $(el).find('a.JobsListings__link').first().text()
        const location = $(el).find('span.JobsListings__locationDisplayName').first().text()
        const link = `https://stripe.com` + $(el).find('a.JobsListings__link').first().attr('href')
        title && jobs.push({
            title,
            link,
            location:location ? [location] : []
        })
    })
    const lastLink =  $('ul.JobsPagination__list a:contains("Last")').first().attr('href')
    const urlSearchParams = new URLSearchParams(lastLink)
    const skip = urlSearchParams.get('skip')
    return {
        total : skip ? Number(skip) + jobs.length : jobs.length, // should be a number
        jobs // should be of the form {title:string,location:string[],link:string}
    }
}

