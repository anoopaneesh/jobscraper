import collections from "../config/collections.js";
import db from "../config/connection.js";
import { ObjectId } from 'mongodb'
export async function getJobs(limit, offset) {
    try {
        const jobsColl = db.get().collection(collections.JOB)
        const total = await jobsColl.count({})
        const result = await jobsColl.find({}).skip(offset).limit(limit || 10).toArray()
        return { data: { total, limit, offset, result } }

    } catch (err) {
        console.log(err)
        return { error: "Error fetching jobs" }
    }
}

export async function searchJobs(company,filters, search, limit, offset) {
    try {
        const query = {}
        if (search.length) {
            query.title = { $regex: `.*(${search.join("|")}).*`, $options: "i" }
        }
        if (company.length) {
            query.company = { $in: company }
        }
        const jobsColl = db.get().collection(collections.JOB)
        const total = await jobsColl.count({...query,...filters})
        const result = await jobsColl.find({...query,...filters}).skip(offset).limit(limit).toArray()
        return { total, result, limit: limit || 10, offset: offset || 0 };
    } catch (err) {
        console.log(err)
        return { error: "Error searching jobs" }
    }
}

export async function updateJob(id, updateObj) {
    try {
        const jobsColl = db.get().collection(collections.JOB)
        const exisiting = await jobsColl.findOne({ _id: ObjectId.createFromHexString(id) })
        if (!exisiting) {
            return { error: "Job does not exists" }
        }
        const result = await jobsColl.updateOne({ _id: ObjectId.createFromHexString(id) }, {
            $set: updateObj
        })
        return { message: "Updated job" }
    } catch (err) {
        console.log(err)
        return { error: "Error updating job" }
    }
}