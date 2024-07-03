export async function getAllCompanies() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/company`
        const companies = await fetch(url).then(res => res.json())
        return companies
    } catch (error) {
        return { error: "Error fetching companies" }
    }
}

export const getCompanies = async (searchTexts, offset, limit) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/company/search`
        const body = JSON.stringify({
            "search": searchTexts,
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
        return { error: "Error fetching companies" }
    }
}

export const getCompany = async (id) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/company/${id}`
        const data = await fetch(url, { method: "GET" }).then(res => res.json());
        return data;
    } catch (error) {
        return { error: "Error fetching company" }
    }
}

export const saveCompany = async (company) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/company`
        const data = await fetch(url, {
            method: "POST",
            body: JSON.stringify(company),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        return data;
    } catch (error) {
        return { error: "Error saving company" }
    }
}

export const deleteCompany = async (id) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/company/${id}`

        const data = await fetch(url, { method: "DELETE" }).then(res => res.json())
        return data

    } catch (error) {
        return {error:"Error deleting company"}
    }
}