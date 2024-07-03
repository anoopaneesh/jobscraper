export function getPage(count) {
    const start = (count-1)*20;
    return {
        url: "https://pluralsight.wd1.myworkdayjobs.com/wday/cxs/pluralsight/Careers/jobs",
        method: "POST",
        data: {"appliedFacets":{"locations":["0f361da09bf701cab0fcb7b60039ec0b"]},"limit":20,"offset":start,"searchText":""},
        headers: {
            'Content-Type': 'application/json'
        }
    }
}