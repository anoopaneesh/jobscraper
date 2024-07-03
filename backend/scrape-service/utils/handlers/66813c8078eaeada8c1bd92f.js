
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
    $('div.job').each((i,el) => {
        
        const title= $(el).find('span.job-display-name').first().text()
        const link= `https://www.deshawindia.com` + $(el).find('a.parent-arrow-long').first().attr('href')
        const location=$(el).find('span.location').first().text()
       
        title && jobs.push({
            title,
            link,
            location:location ? [location] : []
        })
    })
    let total = $('.amount-total').text()
    return {
        total : total ? Number(total) : jobs.length, // should be a number
        jobs // should be of the form {title:string,location:string[],link:string}
    }
}

