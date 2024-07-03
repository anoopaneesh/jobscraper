import axios from "axios";
import { getAllCompanies } from "./company.helper.js";
import * as fs from 'fs'
import * as cheerio from "cheerio"
import { Log, clearDirSync, logger } from "../utils/utils.js";
import collections from "../config/collections.js";
import db from "../config/connection.js";
import { ScrapeStatus } from "../utils/constant.js";
import { ObjectId } from "mongodb";
import { emit } from "./soket.helper.js";
import { Events } from "../utils/constant.js";
export async function scrapeJobs(ids) {
    try {
        clearDirSync('data')
        const scrapeColl = db.get().collection(collections.SCRAPE);
        const scrapeStartedAt = new Date().toISOString()
        const scrapeCount = await scrapeColl.count({})
        if (scrapeCount >= 10) {
            await scrapeColl.deleteMany({})
        }
        const scrapeInsertResult = await scrapeColl.insertOne({
            startedAt: scrapeStartedAt,
            status: ScrapeStatus.Scraping
        })
        const scrapeId = scrapeInsertResult.insertedId.toString()
        // const query = { name: "Deli Llama" };
        // const update = { $set: { name: "Deli Llama", address: "3 Nassau St" } };
        // const options = { upsert: true };
        const companiesQuery = {}

        if (ids?.length) {
            companiesQuery._id = { $in: ids.map(item => ObjectId.createFromHexString(item)) }
        } else {
            companiesQuery.isActive = true
        }


        const { data } = await getAllCompanies(companiesQuery)
        let jobCount = 0;



        const promises = data.result.map(company => scrapeCompany(company))
        const results = await Promise.all(promises) 
        jobCount = results.reduce((acc, item) => {
            acc += item.length;
            return acc
        }, 0)

        // for (let company of data.result) {
        //     let result = await scrapeCompany(company)
        //     jobCount += result.length
        // }

        const lastScrape = await scrapeColl.find({}).sort({ startedAt: -1 }).limit(1).toArray()
        if (lastScrape?.[0]) {
            await scrapeColl.updateOne({
                _id: lastScrape?.[0]?._id
            }, {
                $set: {
                    status: ScrapeStatus.Failed
                }
            })
        }
        await scrapeColl.updateOne({ _id: ObjectId.createFromHexString(scrapeId) }, {
            $set: {
                status: ScrapeStatus.Completed,
                endedAt: new Date().toISOString(),
                jobs: jobCount
            }
        })
        await syncDB(scrapeStartedAt)
        emit(Events.SCRAPE_END, { count: jobCount })
    } catch (error) {
        const scrapeColl = db.get().collection(collections.SCRAPE);
        const lastScrape = await scrapeColl.find({}).sort({ startedAt: -1 }).limit(1).toArray()
        if (lastScrape?.[0]) {
            await scrapeColl.updateOne({
                _id: lastScrape?.[0]?._id
            }, {
                $set: {
                    status: ScrapeStatus.Failed
                }
            })
        }
        console.log(error)
        logger(Log.scrape, `Error scraping : ` + error.message)
        emit(Events.SCRAPE_END, { error: error.message })
    }
}


export async function scrapeCompany(company) {
    try {
        let result = await scrapeApi(company)
        fs.writeFileSync(`data/${company._id?.toString()}.json`, JSON.stringify(result))
        logger(Log.scrape, `File saved [${company.name}]`)
        return result
    } catch (err) {
        logger(Log.scrape, `Error saving file [${company.name}]`)
    }

}

async function syncDB(scrapeStartedAt) {
    try {
        fs.readdirSync('data').forEach(async (f) => {
            const id = f.split('.json')[0]
            const data = fs.readFileSync(`data/${f}`, 'utf8')
            const jobs = JSON.parse(data)
            if (!jobs?.length) return
            const query = jobs.map(item => ({
                updateOne: {
                    "filter": { link: item.link },
                    "update": {
                        $set: { ...item, company: id },
                        $setOnInsert: { isApplied: false, isBookmarked: false }
                    },
                    "upsert": true
                }
            }))

            const jobsColl = db.get().collection(collections.JOB)
            const res = await jobsColl.deleteMany({ company: id, isApplied: false, isBookmarked: false })
            await jobsColl.bulkWrite(query);
            await db.get().collection(collections.COMPANY).updateOne({
                _id: ObjectId.createFromHexString(id)
            }, {
                $set: {
                    scrapedAt: scrapeStartedAt,
                    jobs: jobs.length
                }
            })
        });


    } catch (error) {
        console.log("Error syncing db", error)
    }
}

export async function scrapeApi(company) {
    logger(Log.scrape, `Scraping started [${company.name}]`)
    fs.writeFileSync(`utils/handlers/${company._id?.toString()}.js`, company.isApi ? company.extract.api : company.extract.scrape || "")
    fs.writeFileSync(`utils/page/${company._id?.toString()}.js`, company.extract.page || "")
    const { handler } = await import(`../utils/handlers/${company._id?.toString()}.js?update=${Date.now()}`);
    const { getPage } = await import(`../utils/page/${company._id?.toString()}.js?update=${Date.now()}`);
    const result = []
    let count = 1;
    let i = 1; 
    while (i <= count) { 
       
        logger(Log.scrape, `Scraping [${company.name}]:[${i}]`)
        console.log(getPage.toString())
        let getPageResponse = getPage(i) 
        if (typeof getPageResponse !== 'string') {
            getPageResponse = await getPageResponse.then(res => res.json())
        } else {
            const { data } = await axios({
                method: "GET",
                url: getPage(i),
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
                }
            })
            getPageResponse = data
        }
        const { jobs, total } = handler(company.isApi ? getPageResponse : cheerio.load(getPageResponse), { page: i, logger: (txt) => logger(Log.scrape, `Scraping [${company.name}]:[${i}] ${txt}`) })
        result.push(...jobs)
        if (i == 1) {
            count = Math.ceil(total / jobs.length);
        }
        i++;
    }
    logger(Log.scrape, `Scraping ended [${company.name}]`)
    return [...new Map(result.map(item => [item['link'], item])).values()]
}


