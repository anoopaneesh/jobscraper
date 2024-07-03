import { Router } from "express";
import { getJobs, searchJobs, updateJob } from "../helpers/job.helper.js";

const route = Router()

route.get('/', async (req, res) => {
    const { limit, offset } = req.query
    const result = await getJobs(Number(limit || "0"), Number(offset || "0"));
    if (result.error) {
        return res.status(500).json({
            error: result.error
        })
    }
    return res.json({
        result: result.data
    })
})

route.post('/search',async (req,res) => {
    const {limit,offset,company,search,filters} = req.body  
    const result = await searchJobs(company,filters,search,limit || 10,offset || 0)
    if(result.error){
        return res.status(500).json({error:result.error})
    }
    return res.json({
        result
    })
})

route.post("/:id",async(req,res) => {
    const id = req.params.id
    const {isBookmarked,isApplied} = req.body
    const updateObj = {}
    if(isBookmarked != null) updateObj.isBookmarked = isBookmarked
    if(isApplied != null) updateObj.isApplied = isApplied
    const result = await updateJob(id,updateObj)
    if(result.error){
        return res.status(500).json({error:result.error})
    }
    return res.json({
        result
    })
})


export default route