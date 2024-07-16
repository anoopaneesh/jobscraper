import collections from "../config/collections.js";
import db from "../config/connection.js";
import { ObjectId } from 'mongodb'

export async function analyzeCompanies(companies) {
    try {
        const jobsColl = db.get().collection(collections.JOB)
        const filter = { company: { $in: companies } }
        const total = await jobsColl.count(filter)
        const analysis = {}
        const jobs = await jobsColl.find(filter).toArray()
        jobs.forEach((job, index) => {
            job.extra && Object.entries(job.extra).forEach(([key, value]) => {
                if (value == null) return
                if (!(key in analysis)) analysis[key] = {}

                if (Array.isArray(value)) {
                    for (let item of value) {
                        if (!(item in analysis[key])) analysis[key][item] = 0;
                        analysis[key][item]++
                    }
                } else {
                    if (!(value in analysis[key])) analysis[key][value] = 0;
                    analysis[key][value]++;
                }
            })
        })
        return { data: analysis }
    } catch (error) {
        console.log(error)
        return { error: "Error analyzing companies" }
    }
}