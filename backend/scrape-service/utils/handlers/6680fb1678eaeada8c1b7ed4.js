
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
            link
        })
    })
    const total = $('span.SWhIm').first().text()
    return {
        total : total ? Number(total) : jobs.length, // should be a number
        jobs // should be of the form {title:string,location:string[],link:string}
    }
}

// --------------------------------
// Write code below

