import { Router } from "express";
import { analyzeCompanies } from "../helpers/analyze.helper.js";

const route = Router()

route.post('/', async (req, res) => {
    const {companies} = req.body 
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

export default route