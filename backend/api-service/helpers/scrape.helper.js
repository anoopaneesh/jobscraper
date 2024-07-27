import collections from "../config/collections.js";
import db from "../config/connection.js";

export const getAllScrapes = async (filter, limit, offset) => {
    try {
        const coll = db.get().collection(collections.SCRAPE);
        const total = await coll.count({})
        const result = await coll.find(filter).sort({ startedAt: -1 }).skip(offset || 0).limit(limit || total).toArray()
        return { data: { total, limit, offset, result } }
    } catch (error) {
        console.log(`Error getting all scrapes : `, error)
    }
}


export const getLastScrape = async () => {
    try {
        const coll = db.get().collection(collections.SCRAPE);
        const result = await coll.find({}).sort({ startedAt: -1 }).limit(1).toArray()
        return { data: result?.[0] }
    } catch (error) {
        console.log(`Error getting last scrape : `, error)
    }
}



