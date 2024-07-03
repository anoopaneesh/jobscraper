

export const getJobs = async (filter, searchTexts, companies, offset, limit) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/jobs/search`
        const body = JSON.stringify({
            "company": companies,
            "search": searchTexts,
            "filters": filter,
            "limit": limit ?? 10,
            "offset": offset ?? 0
        })
        const data = await fetch(url, {
            method: "POST",
            body,
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json())
        return data
    } catch (err) {
        return { error: "Error fetching jobs" }
    }
}

export const updateJob = async (id, job) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/jobs/${id}`
        const body = JSON.stringify(job)
        const data = await fetch(url, {
            method: "POST",
            body,
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json())
        return data
    } catch (err) {
        return { error: "Error updating job" }
    }
}