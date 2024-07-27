import { Router } from "express";
import { analyzeCompanies, analyzeResume } from "../helpers/analyze.helper.js";

const route = Router()

route.post('/', async (req, res) => {
    const { companies } = req.body
    const result = await analyzeCompanies(companies || []);
    if (result.error) {
        return res.status(500).json({
            error: result.error
        })
    }
    return res.json({
        result: result.data
    })
})

route.post('/resume', async (req, res) => {
    const { resume } = req.files
    const { jobDesc } = req.body
    console.log(resume)
    const data = await analyzeResume(resume, jobDesc)
    console.log(data)
    return res.json({
        result: data
    })
})

export default route