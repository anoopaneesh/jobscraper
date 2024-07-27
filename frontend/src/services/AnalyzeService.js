export const analyzeCompanies = async (companies) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/analyze`
        const data = await fetch(url, { method: "POST", body: JSON.stringify({ companies }), headers: { 'Content-Type': 'application/json' } }).then(res => res.json())
        return data
    } catch (error) {
        return { error: "Error fetching companies" }
    }
}


export const analyzeResume = async (resume,jobDesc) => {
    try {
        const formData = new FormData()
        formData.append('resume',resume)
        formData.append('jobDesc',jobDesc)
        const url = `${import.meta.env.VITE_API_URL}/analyze/resume`
        const data = await fetch(url, { method: "POST", body: formData}).then(res => res.json())
        return data
    } catch (error) {
        return { error: "Error anayzing ressume" }
    }
}