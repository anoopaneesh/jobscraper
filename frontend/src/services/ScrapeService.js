


export const getScrapes = async (offset, limit) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/scrape?limit=${limit}&offset=${offset}`
        const data = await fetch(url, { method: "GET" }).then(res => res.json())
        return data
    } catch (err) {
        return { error: "Error fetching scrapes" }
    }
}

export const startScrape = async () => {
    try {
        const url = `${import.meta.env.VITE_SCRAPE_URL}/scrape`
        const data = await fetch(url, { method: "POST" }).then(res => res.json())
        return data?.result
    } catch (error) {
        return { error: "Error starting scrape" }
    }
}


export const startScrapeCompany = async (id) => {
    try {
        const url = `${import.meta.env.VITE_SCRAPE_URL}/scrape/${id}`
        const data = await fetch(url, { method: "POST" }).then(res => res.json())
        return data?.result
    } catch (error) {
        return { error: "Error starting scrape" }
    }
}

export const startScrapeExtraCompany = async (ids) => {
    try {
        const url = `${import.meta.env.VITE_SCRAPE_URL}/scrape/extra`
        const data = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ companies: ids }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        return data?.result
    } catch (error) {
        return { error: "Error starting scrape" }
    }
}

export const getLastScrape = async () => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/scrape/last`
        const data = await fetch(url, { method: "GET" }).then(res => res.json())
        return data?.result
    } catch (error) {
        return { error: "Error starting scrape" }
    }
}