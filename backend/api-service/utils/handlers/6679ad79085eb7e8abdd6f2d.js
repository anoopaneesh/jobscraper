export function handler(req){
    const jobs = req.operationResult.result.jobs
    const total = req.operationResult.result.totalJobs
    return {
        total,
        jobs:jobs.map(item => {
            let job = {
                title:item.title,
                location:item?.properties?.locations || [],
                link:`https://jobs.careers.microsoft.com/global/en/job/${item.jobId}`
            }
            return job
        })
    }
}