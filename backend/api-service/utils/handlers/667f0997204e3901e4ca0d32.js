export function handler(req){
    const jobs = req.jobPostings
    const total = req.total
    return {
        total,
        jobs:jobs.map(item => {
            let job = {
                title:item.title,
                location:item?.locationsText ? [item?.locationsText] : [],
                link:`https://pluralsight.wd1.myworkdayjobs.com/en-US/Careers${item?.externalPath}`
            }
            return job
        })
    }
}