
// Use this Template
// --------------------
export function handler($,page,cheerio){
    const jobs = []
    $('div.posting').each((i,el) => {
        const title = $(el).find('a.posting-title h5').first().text()
        const location = $(el).find('span.location').first().text()
        const link = $(el).find('a.posting-title').first().attr('href')
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

