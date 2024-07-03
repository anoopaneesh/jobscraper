
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
    $('a.one-category-job').each((i,el) => {
        const link = $(el).attr('href')
        const title = $(el).attr('data-role')
        const location = $(el).attr('data-location')
     
        title && jobs.push({
            title,
            link,
            location: [location]
        })
      
    })
    let total = jobs.length
    return {
        total, // should be a number
        jobs // should be of the form {title:string,location:string[],link:string}
    }
}

