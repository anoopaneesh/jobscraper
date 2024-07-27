import collections from "../config/collections.js";
import db from "../config/connection.js";
import { GoogleGenerativeAI } from "@google/generative-ai";


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

export const analyzeResume = async (resume, jobDesc) => {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
    As an experienced Applicant Tracking System (ATS) analyst,
with profound knowledge in technology, software engineering, full stack web development your role involves evaluating resumes against job descriptions.
Recognizing the competitive job market, provide top-notch assistance for resume improvement.
Your goal is to analyze the resume pdf file against the given job description, 
assign a percentage match based on key criteria, and pinpoint missing keywords accurately.
[note: show the percentage accurately, i noted that you are always showing 75%]


description:${jobDesc}


I want the response in one single string having the structure
{{"Job Description Match":"%","Missing Keywords":[],"Candidate Summary":"","Experience":""}}`;

    const result = await model.generateContent([prompt, {
        inlineData: {
            data: resume.data.toString("base64"),
            mimeType: resume.mimetype
        }
    }]);
    return result.response.text()
}