import collections from "../config/collections.js";
import db from "../config/connection.js"; 
export async function getAllJobs(filter) {
    try {
        const coll = db.get().collection(collections.JOB);
        const total = await coll.count(filter) 
        const result = await coll.find(filter).toArray()
        return { data: { total, result } }
    } catch (error) {
        console.log(`Error getting all jobs : `, error)
    }
}