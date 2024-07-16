import { Router } from "express";
import Company from "../models/company.model.js";
import { deleteCompany, getAllCompanies, getCompany, saveCompany, searchCompanies } from "../helpers/company.helper.js";

const route = Router()

route.post('/all', async (req, res) => {
    const { limit, offset } = req.query
    const { filter } = req.body
    const companies = await getAllCompanies(filter, Number(limit || "0"), Number(offset || "0"))
    if (companies.error) {
        return res.status(500).json({
            error: result.error
        })
    }
    return res.json({
        result: companies.data
    })
})
route.post('/search', async (req, res) => {
    const { limit, offset, search } = req.body
    const result = await searchCompanies(search, limit || 10, offset || 0)
    if (result.error) {
        return res.status(500).json({ error: result.error })
    }
    return res.json({
        result
    })
})

route.post('/', async (req, res) => {
    const body = req.body
    const company = Company(body);
    if (body._id) {
        company._id = body._id
    }
    const result = await saveCompany(company)
    if (result.error) {
        return res.status(500).json({ status: "error", message: result.error })
    }
    return res.json({
        status: "success",
        result
    })
})

route.get('/:id', async (req, res) => {
    const id = req.params.id
    const result = await getCompany(id)
    if (result.error) {
        return res.status(500).json({ status: "error", message: result.error })
    }
    return res.json({
        status: 'success',
        result
    })
})

route.delete('/:id', async (req, res) => {
    const id = req.params.id
    const result = await deleteCompany(id)
    if (result.error) {
        return res.status(500).json({ status: "error", message: result.error })
    }
    return res.json({
        status: 'success',
        result
    })
})

export default route