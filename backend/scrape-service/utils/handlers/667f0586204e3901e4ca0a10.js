export function handler(req){
    const jobs = req.jobs
    const total = req.meta.total
    return {
        total,
        jobs:jobs.map(item => {
            let job = {
                title:item.title,
                location:item?.location?.name ? [item?.location?.name] : [],
                link:item?.absolute_url
            }
            return job
        })
    }
}