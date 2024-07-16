import response from './skills.json' assert {type: "json"}
import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio'
const types = response.data.map(item => item.name.toLowerCase()).flat()

const jobdesc = `
There are hundreds of opportunities to make your mark on technology and life at American Express. As an Engineer, Here’s just some of what you’ll be doing:

Function as a member of an agile team and helps drive consistent development and test practices with respect to tools, common components, and documentation.
Perform technical development for applications including architecture, design, developing prototypes, writing new code and API's and performing unit and assembly testing of developed software also as needed
Hand-on architecture working closely with solution architects and architecture governance technical team for solution development and design reviews
Typically spends 60-70% of time writing code and testing, and remainder of time managing team and stakeholders through ongoing product/platform release sprints
Perform code reviews, make design decisions and ensure constant focus on quality and clearing technical debt items in the backlog.
You will be using Java Technologies – Vertx, Spring MVC, Spring Data and Spring Boot and RESTful micro services.
Build & Maintain new RESTful APIs on Cloud Platform (eCP) using MapR DB and any NoSQL DBs.
Improve efficiency, reliability, and scalability of our data pipelines.
Work on cross-functional initiatives and collaborate with Engineers across the organizations.
Build CICD pipelines for continuous integration and delivery.
Build automation for application changes and deployment for faster time to market.
Develops deep understanding of tie-ins with other systems and platforms within the supported domains
Perform ongoing refactoring of code, quality assurance and testing, applying best practice methodologies and processes.
Identify opportunities to adopt innovative technologies & ideas in development / test area.
Provide continuous support for ongoing application availability.
Collaborate/influence within and across teams to create successes with an innovative mindset and challenge the status quo.

Minimum Qualifications

Computer Science, or equivalent degree or industry experience. 
Up to 2 years of software development experience in a professional environment.
Strong OOPs concepts, concurrency, exception handling etc.
Data structures and Algorithms, Strong OS fundamentals, Advanced Java concepts
Strong development experience using languages Java/ Go. Keen understanding of how to build highly performant systems with such languages.
Hands on experience in building distributed micro-service systems, experience with Service Mesh products/frameworks like such as Envoy, Linkerd, Istio, gRPC/ProtoBuf; Distributed System Management/tracing and monitoring such as Zipkin/Jaeger, ELK Stack, Prometheus
Have experience in designing and building Cloud native applications. Experience in cloud platforms like Docker, Kubernetes, OpenShift are a plus.
Experience in using NoSQL databases and distributed messaging systems such as Redis, Kafka, Couchbase, Cassandra in the context of low latency and high transaction volume systems.
Experience with Continuous Integration/Continuous Deployment tools such as Jenkins, GitHub
Experience working in DevOps teams and Scrums.
Ability to learn and deep dive into new technology and business domains, question status quo and think outside of the box.
Proficient oral and written communication skills.

Preferred Qualifications

Demonstrated experience of writing applications for deployment on cloud environment including OpenShift and Docker containers.
Experience on RESTful API design and implementation is a plus
1-2 years of experience with Test Driven Development (TDD) / Behavior Driven Development (BDD) practices, unit testing, functional testing, system integration testing, regression testing and web service testing.
Experience with automated release management using Maven, Git, Jenkins.
Experience with continuous integration and continuous delivery environment
Looks proactively beyond the obvious for continuous improvement opportunities.
Willingness to learn new technologies and exploit them to their optimal potential
Excellent leadership and communication skills, with the ability to influence at all levels across functions, from both technical and non-technical perspectives alike.`



function findOccurrences(text, types) {
    // 1. Combine types into a case-insensitive regular expression:

    const escapedTypes = types.map(type => type.replace(/([\\.$?*+{()|[\]^<>!=\\])/g, "\\$1"));
    const typePattern = new RegExp("\\b(" + escapedTypes.join("|") + ")\\b|\\b" + escapedTypes.join("\\b|\\b") + ":? \\b", "gi");
    console.log(escapedTypes.join("|"))

    // 2. Use matchAll() to find all occurrences (including duplicates):
    const matches = text.matchAll(typePattern);

    // 3. Iterate through matches and count occurrences:
    const occurrences = new Map();
    for (const match of matches) {
        const type = match[1].toLowerCase(); // Ensure consistent case for counting
        if (type.length > 2)
            occurrences.set(type, (occurrences.get(type) || 0) + 1);
    }

    return occurrences;
}

function findOccur(text, types) {
    return types.filter(type => {
        const pat = new RegExp(`\\b${type.replace(/([\\.$?*+{()|[\]^<>!=\\])/g, "\\$1")}\\b`, "gi")
        return pat.test(text)
    })
}


const res = findOccur(jobdesc, types)

// console.log(res)


// import * as fs from 'fs'
// async function main(){
//     return await fetch("https://km8652f2eg-dsn.algolia.net/1/indexes/Search_production/query?x-algolia-agent=Algolia%20for%20JavaScript%20(3.33.0)%3B%20Browser&x-algolia-application-id=KM8652F2EG&x-algolia-api-key=YzFhZWIwOGRhOWMyMjdhZTI5Yzc2OWM4OWFkNzc3ZTVjZGFkNDdmMThkZThiNDEzN2Y1NmI3MTQxYjM4MDI3MmZpbHRlcnM9cHJpdmF0ZSUzRDA%3D", {
//         "headers": {
//           "accept": "application/json",
//           "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
//           "content-type": "application/x-www-form-urlencoded",
//           "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
//           "sec-ch-ua-mobile": "?0",
//           "sec-ch-ua-platform": "\"Windows\"",
//           "sec-fetch-dest": "empty",
//           "sec-fetch-mode": "cors",
//           "sec-fetch-site": "cross-site",
//           "Referer": "https://stackshare.io/",
//           "Referrer-Policy": "strict-origin-when-cross-origin"
//         },
//         "body": "{\"params\":\"query=&attributesToRetrieve=%5B%22type%22%2C%22name%22%2C%22username%22%2C%22canonical_url%22%2C%22title%22%2C%22image_url%22%2C%22pretty_slug%22%2C%22is_package%22%2C%22private%22%2C%22objectID%22%5D&hitsPerPage=1&page=1000&facets=*\"}",
//         "method": "POST"
//       }).then(res => res.json());
// }

// main().then(res => {
//     fs.writeFileSync('response.json',JSON.stringify({data:res.hits}))
//     console.log(res.hits.length)
// })

async function scrape() {
    const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36';
    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
    page.setUserAgent(ua);
    await page.goto('https://www.flipkartcareers.com/#!/job-view/technical-lead-bangalore-karnataka-2024062014141988'); // Replace with your target URL
  
    // Wait for the page to load completely (optional)
    await page.waitForSelector('.job-vw-def-thm-div1');
  
    // Get the entire page text content
    const textContent = await page.evaluate(() => {
        return document.querySelector('div.leftColumn').textContent
    });
    console.log(textContent)
    
    const res = findOccur(textContent, types)
  
    console.log(res); // This will be a huge string containing all text
  
    await browser.close(); 
}

async function scrapeCheerio(){
    const dd = await fetch('https://www.amazon.jobs/en/jobs/2655738/system-dev-engineer').then(res => res.text())
    const $ = cheerio.load(dd) 
    const texts = $('div.content').text()
    console.log( findOccur(texts,types))
}



scrapeCheerio()