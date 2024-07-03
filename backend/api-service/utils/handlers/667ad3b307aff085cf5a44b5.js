export function handler(req) {
    const jobs = req.searchHits
    const total = req.found
    return {
        total,
        jobs: jobs.map(item => {
            let job = {
                title: item.fields.title?.[0],
                location: item?.fields?.location,
                link: item?.fields?.urlNextStep?.[0]?.replace('account.amazon.com','www.amazon.jobs')
            }
            return job
        })
    }
}