import { ObjectId } from "mongodb";
import collections from "../config/collections.js";
import db from "../config/connection.js";
import { getLinkedinImageUrl } from "./webscrape.helper.js";





export async function saveCompany(company) {
    try {
        const coll = db.get().collection(collections.COMPANY);
        const nameCheckQuery = { name: company.name }
        let exisitngCompany = null
        if (company._id) {
            exisitngCompany = await coll.findOne({ _id: ObjectId.createFromHexString(company._id) })
            if (!exisitngCompany) {
                return { error: `Company does not exists.` }
            }
            nameCheckQuery._id = { $not: { $eq: exisitngCompany._id } }
        }

        const checkName = await coll.findOne(nameCheckQuery)
        if (checkName) {
            return { error: `Company [${company.name}] already exists.` }
        }
        const updateObj = {}
        company.name != null && (updateObj.name = company.name)
        company.image != null && (updateObj.image = company.image)
        company.isApi != null && (updateObj.isApi = company.isApi)
        company.link != null && (updateObj.link = company.link)
        company.isActive != null && (updateObj.isActive = company.isActive)
        company.linkedin != null && (updateObj.linkedin = company.linkedin)
        company.skills != null && (updateObj.skills = company.skills)
        if (company.linkedin != null && (!exisitngCompany?.image || !company.image)) {
            updateObj.image = await getLinkedinImageUrl(company.linkedin)
        }

        company.extract?.api != null && (updateObj["extract.api"] = company.extract.api)
        company.extract?.scrape != null && (updateObj["extract.scrape"] = company.extract.scrape)
        company.extract?.page != null && (updateObj["extract.page"] = company.extract.page)
        company.extract?.jobExtra != null && (updateObj["extract.jobExtra"] = company.extract.jobExtra)
        const result = await coll.updateOne({ name: exisitngCompany?.name || "" }, {
            $set: {
                ...updateObj
            }
        }, {
            upsert: true
        })
        return result
    } catch (error) {
        console.log(`Error updating company [${company.name}] : `, error)
    }
}

export async function getAllCompanies(filter, limit, offset) {
    try {
        const coll = db.get().collection(collections.COMPANY);
        const total = await coll.count({})
        const result = await coll.find(filter).sort({ isActive: -1 }).skip(offset || 0).limit(limit || total).toArray()
        return { data: { total, limit, offset, result } }
    } catch (error) {
        console.log(`Error getting all companies : `, error)
    }
}

export async function getCompany(id) {
    try {
        const coll = db.get().collection(collections.COMPANY);
        const exisitngCompany = await coll.findOne({ _id: ObjectId.createFromHexString(id) })
        if (!exisitngCompany) {
            return { error: 'Company does not exists' }
        }
        return exisitngCompany
    } catch (error) {
        console.log('Error getting company')
    }
}

export async function deleteCompany(id) {
    try {
        const coll = db.get().collection(collections.COMPANY);
        const exisitngCompany = await coll.findOne({ _id: ObjectId.createFromHexString(id) })
        if (!exisitngCompany) {
            return { error: 'Company does not exists' }
        }
        const deleteResult = await coll.deleteOne({ _id: ObjectId.createFromHexString(id) })
        if (deleteResult.deletedCount !== 1) {
            return { error: `Error deleting ${exisitngCompany.name}` }
        }
        return { message: `Deleted ${exisitngCompany.name}` }
    } catch (error) {
        console.log('Error getting company')
    }
}

export async function searchCompanies(search, limit, offset) {
    try {
        const query = {}
        if (search.length) {
            query.name = { $regex: `.*(${search.join("|")}).*`, $options: "i" }
        }
        const coll = db.get().collection(collections.COMPANY)
        const total = await coll.count(query)
      
        const result = await coll.find(query).sort({isActive:-1,name:1}).skip(offset).limit(limit).toArray()
     
        return { total, result, limit: limit || 10, offset: offset || 0 };
    } catch (err) {
        console.log(err)
        return { error: "Error searching Companies" }
    }
}