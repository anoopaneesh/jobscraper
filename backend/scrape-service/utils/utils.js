import * as fs from 'fs'
import { emit } from '../helpers/soket.helper.js'
import { Events } from './constant.js'



export const Log = {
    scrape: 'public/logs/scrapelog.txt'
}

export async function logger(log, message) {
    const logMessage = `[${new Date().toLocaleString()}] ${message}`
    emit(Events.LOG_ENTRY, logMessage)
    fs.appendFile(log, `${logMessage}\n`, (err) => {
        if (err)
            console.log("Writing to log Error : ", err)
        else
            console.log(logMessage)
    })
}

export async function resetLog(log) {
    fs.writeFile(log, '', (err) => {
        if (err) console.log("Error reseting Log")
    })
}

export function clearDirSync(dir) {
    fs.readdirSync(dir).forEach(f => fs.rmSync(`${dir}/${f}`));
}

export function findSkills(text, types) {
    return types.filter(type => {
        const pat = new RegExp(`\\b${type.replace(/([\\.$?*+{()|[\]^<>!=\\])/g, "\\$1")}\\b`, "gi")
        return pat.test(removeHtmlTags(text))
    })
}

export function findYoe(text) {
    const regex = /(\d+)\+?\s+years?/g;

    let match;
    const yearsOfExperience = [];

    // Find all matches
    while ((match = regex.exec(removeHtmlTags(text))) !== null) {
        yearsOfExperience.push(parseInt(match[1]));
    }
    return yearsOfExperience.length ? Math.max(...yearsOfExperience) : null
}

export function removeHtmlTags(str) {
    if ((str === null) || (str === '')) {
        return false;
    }
    return str.replace(/<[^>]*>/g, '');
}

export function getByPropString(obj, propString) {
    if (!propString || !obj) return null;
    const props = propString.split(".")
    let res = obj
    props.forEach(prop => {
        let field = prop
        if (Array.isArray(res)) {
            if (!isNaN(prop)) field = Number(prop);
            else if (prop.startsWith('[') && prop.endsWith(']')) {
                const fields = prop.slice(1, -1).split()
                res = res.filter(i => i[fields[0]] === fields[1])
                return;
            } else {
                res = res?.[0]
            }
        }
        res = res?.[field]
    })
    return res;
}

export function getTransformers(key,types) {
    switch (key) {
        case 'tskills': return (data) => findSkills(data.join(" "),types)
        case 'tyoe': return (data) => findYoe(data.join(" "))
        default: return (data) => data
    }
}

