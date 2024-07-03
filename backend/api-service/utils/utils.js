import * as fs from 'fs'

export const Log = {
    scrape: 'public/logs/scrapelog.txt'
}

export async function logger(log, message) {
    const logMessage = `[${new Date().toLocaleString()}] ${message}`
    fs.appendFile(log, `${logMessage}\n`, (err) => {
        if (err)
            console.log("Writing to log Error : ", err)
        else
            console.log(logMessage)
    })
}

export async function resetLog(log){
    fs.writeFile(log,'',(err) => {
        if(err) console.log("Error reseting Log")
    })
}

export function clearDirSync(dir){
    fs.readdirSync(dir).forEach(f => fs.rmSync(`${dir}/${f}`));
}