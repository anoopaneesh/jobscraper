 import collections from "../config/collections.js";
import db from "../config/connection.js"; 

export async function getAllCompanies(filter, limit, offset) {
    try {
        const coll = db.get().collection(collections.COMPANY);
        const total = await coll.count({})
        const result = await coll.find(filter).skip(offset || 0).limit(limit || total).toArray()
        return { data: { total, limit, offset, result } }
    } catch (error) {
        console.log(`Error getting all companies : `, error)
    }
}

