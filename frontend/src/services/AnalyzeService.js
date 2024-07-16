export const analyzeCompanies = async (companies) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/analyze`
        const data = await fetch(url, { method: "POST", body: JSON.stringify({ companies }), headers: { 'Content-Type': 'application/json' } }).then(res => res.json())
        return data
    } catch (error) {
        return { error: "Error fetching companies" }
    }
}