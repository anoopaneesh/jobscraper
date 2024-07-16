import axios from "axios";
import { getAllCompanies } from "./company.helper.js";
import * as fs from 'fs'
import * as cheerio from "cheerio"
import { Log, clearDirSync, findSkills, getByPropString, getTransformers, logger } from "../utils/utils.js";
import collections from "../config/collections.js";
import db from "../config/connection.js";
import { ScrapeStatus } from "../utils/constant.js";
import { ObjectId } from "mongodb";
import puppeteer from 'puppeteer'
import { emit } from "./soket.helper.js";
import { Events } from "../utils/constant.js";
import { getAllJobs } from "./job.helper.js";
import _ from 'lodash'
import { getAllSkills } from "./skills.helper.js";
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
        console.log(err)
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
        let getPageResponse = getPage(i)
        if (typeof getPageResponse !== 'string') {
            try {
                getPageResponse = await getPageResponse.then(res => res.json())
            } catch (error) {
                console.log(error)
                i++;
                continue;

            }

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
        console.log(getPageResponse)
        const { jobs, total } = handler(company.isApi ? getPageResponse : cheerio.load(getPageResponse), { page: i, logger: (txt) => logger(Log.scrape, `Scraping [${company.name}]:[${i}] ${txt}`) })
        // let skilledJobs = []
        // if (company.skills) {
        //     skilledJobs = await scrapeSkills(company, jobs,getJobExtra,i)
        // }
        result.push(...jobs)
        if (i == 1) {
            count = Math.ceil(total / jobs.length);
        }
        i++;
    }
    let uniqueJobs = [...new Map(result.map(item => [item['link'], item])).values()]
    logger(Log.scrape, `Scraping ended [${company.name}]`)
    return uniqueJobs
}


async function scrapeExtra(company, job,types, chunkIndex, jobIndex) {
    logger(Log.scrape, `Scraping Job Extra [${company.name}][${chunkIndex}-${jobIndex}]`)

    fs.writeFileSync(`utils/jobExtra/${company._id?.toString()}.js`, company.extract.jobExtra || "")
    const { getJobExtra } = await import(`../utils/jobExtra/${company._id?.toString()}.js?update=${Date.now()}`);
    const { apiExtra, scrapeExtra, fetchLink } = getJobExtra(job)
    const extraDetails = {}
    if (apiExtra?.length) {
        logger(Log.scrape, `Scraping Job Extra [${company.name}][Api][${chunkIndex}-${jobIndex}]`)
        const apiRes = await fetchLink.api().then(res => res.json())
        for (let extra of apiExtra) {
            const extractedRes = extra.keys.map(k => getByPropString(apiRes, k))
            if (extra.transform) {
                if (typeof extra.transform === 'string') extraDetails[extra.name] = getTransformers(extra.transform,types)(extractedRes)
                else extraDetails[extra.name] = extra.transform(extra.name, extra.keys, extractedRes)
            } else {
                extraDetails[extra.name] = extractedRes
            }
        }
        logger(Log.scrape, `Scraping Job Extra ended [${company.name}][Api][${chunkIndex}-${jobIndex}]`)
    }


    if (scrapeExtra?.length) {
        logger(Log.scrape, `Scraping Job Extra [${company.name}][scrape][${chunkIndex}-${jobIndex}]`)
        const scrapeRes = await fetch(fetchLink?.scrape || job.link, { method: "GET" }).then(res => res.text()) 
        const $scrape = cheerio.load(scrapeRes)
        for (let extra of scrapeExtra) {
            const extractedRes = extra.keys.map(k => $scrape(k).text() || "")
            if (extra.transform) {
                if (typeof extra.transform === 'string') extraDetails[extra.name] = getTransformers(extra.transform,types)(extractedRes)
                else extraDetails[extra.name] = extra.transform(extra.name, extra.keys, extractedRes)
            } else {
                extraDetails[extra.name] = extractedRes
            }
        }
        logger(Log.scrape, `Scraping Job Extra [${company.name}][scrape][${chunkIndex}-${jobIndex}]`)
    }
    logger(Log.scrape, `Scraping Job Extra ended [${company.name}][${chunkIndex}-${jobIndex}]`)
    return extraDetails
}


export async function scrapeJobsExtra(ids) {
    try {
        logger(Log.scrape, `Scraping Job Extra Started `)
        clearDirSync('extra-data')
        const scrapeColl = db.get().collection(collections.SCRAPE);
        const scrapeCount = await scrapeColl.count({})
        if (scrapeCount >= 10) {
            await scrapeColl.deleteMany({})
        }
        const scrapeStartedAt = new Date().toISOString()
        const scrapeInsertResult = await scrapeColl.insertOne({
            startedAt: scrapeStartedAt,
            status: ScrapeStatus.ExtraScraping
        })
        const scrapeId = scrapeInsertResult.insertedId.toString()
        const filter = { skills: true }
        if (ids.length) {
            filter._id = { $in: ids.map(ObjectId.createFromHexString) }
        }
        const companies = (await getAllCompanies(filter)).data.result
        const companiesMap = companies.reduce((acc, item) => {
            acc[item._id.toString()] = item
            return acc
        }, {})
        const skills = await getAllSkills({})
        const types = skills.data.result.map(item => item.name.toLowerCase()).flat()
        const jobs = (await getAllJobs({ company: { $in: companies.map(item => item._id.toString()) } }))
        const chunks = _.chunk(jobs.data.result, 10)
        const extraPromises = chunks.map(async (chunk, chunkIndex) => {
            const extras = {}
            for (let [jobIndex, job] of chunk.entries()) {
                const extraRes = await scrapeExtra(companiesMap[job.company], job,types, chunkIndex + 1, jobIndex + 1)
                extras[job._id.toString()] = extraRes
            }
            fs.writeFileSync(`extra-data/${(chunkIndex + 1)?.toString()}.json`, JSON.stringify(extras))
            logger(Log.scrape, `File saved [${chunkIndex + 1}]`)
        })
        await Promise.allSettled(extraPromises)

        // Save to db
        syncJobExtraDB(scrapeId)

        logger(Log.scrape, `Scraping Job Extra Ended `)
        emit(Events.SCRAPE_EXTRA_END, { status: 'success' })
    } catch (error) {
        console.log(error)
        logger(Log.scrape, `Error scraping extra : ` + error.message)
        emit(Events.SCRAPE_EXTRA_END, { error: error.message })
    }
}


async function syncJobExtraDB(scrapeId) {
    try {
        fs.readdirSync('extra-data').forEach(async (f) => {
            const data = fs.readFileSync(`extra-data/${f}`, 'utf8')
            const extra = JSON.parse(data)
            if (!Object.keys(extra).length) return
            const query = Object.entries(extra).map(([key, extraData]) => ({
                updateOne: {
                    "filter": { _id: ObjectId.createFromHexString(key) },
                    "update": {
                        $set: { extra: extraData },
                    }
                }
            }))

            const jobsColl = db.get().collection(collections.JOB)
            await jobsColl.bulkWrite(query); 
            await db.get().collection(collections.SCRAPE).updateOne({
                _id: ObjectId.createFromHexString(scrapeId)
            }, {
                $set: {
                    status: ScrapeStatus.ExtraCompleted,
                    endedAt: (new Date()).toISOString()
                }
            })
        });


    } catch (error) {
        console.log("Error syncing db", error)
    }
}

