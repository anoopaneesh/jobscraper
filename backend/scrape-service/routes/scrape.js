import { Router } from "express";


import { scrapeJobs } from "../helpers/scrape.helper.js";
import { Log, resetLog } from "../utils/utils.js";
import { Events } from "../utils/constant.js";
import { emit } from "../helpers/soket.helper.js";

const route = Router()
route.post('/', async (req, res) => {
    emit(Events.SCRAPE_START, 'scrape started')
    resetLog(Log.scrape);
    scrapeJobs();
    return res.json({
        status: "success",
        result: {
            message: "Started scraping",
            timestamp: (new Date()).toISOString()
        }
    })
})


route.post('/:id', async (req, res) => {
    const id = req.params.id
    emit(Events.SCRAPE_START, 'scrape started')
    resetLog(Log.scrape);
    scrapeJobs(id ? [id] : [])
    return res.json({
        status: "success",
        result: {
            message: "Started scraping",
            timestamp: (new Date()).toISOString()
        }
    })
})

export default route