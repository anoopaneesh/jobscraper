
// Use this Template
// --------------------
// export function getPage(count) { 
//     const offset = (count-1) * limit
//     return <fectch> or <string>
// }
// --------------------------------

// Write code below

export function getPage(count) {
    const start = (count-1)*20;
    return fetch("https://pluralsight.wd1.myworkdayjobs.com/wday/cxs/pluralsight/Careers/jobs",{ 
        method: "POST",
        body: JSON.stringify({"appliedFacets":{"locations":["0f361da09bf701cab0fcb7b60039ec0b"]},"limit":20,"offset":start,"searchText":""}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}