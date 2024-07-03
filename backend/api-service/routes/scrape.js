import { Router } from "express";
import { getAllScrapes, getLastScrape } from "../helpers/scrape.helper.js";


const route = Router()
route.get('/', async (req, res) => {
    const { limit, offset } = req.query
    const scrapes = await getAllScrapes({}, Number(limit || "0"), Number(offset || "0"))
    if (scrapes.error) {
        return res.status(500).json({
            error: result.error
        })
    }
    return res.json({
        result: scrapes.data
    })
})

route.get('/last', async (req, res) => { 
    const scrape = await getLastScrape()
    if (scrape.error) {
        return res.status(500).json({
            error: result.error
        })
    }
    return res.json({
        result: scrape.data
    })
})

export default route