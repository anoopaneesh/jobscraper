import * as cheerio from "cheerio"
const getPageHTML = (url) => {
    return fetch(url, { method: "GET" }).then((res) => res.text());
}

export const getLinkedinImageUrl = async (url) => {
    const COMPANY_UNKNOWN = "https://assets.procurement.opengov.com/assets/unknown-business-logo.png"
    const html = await getPageHTML(url)
    let $ = cheerio.load(html);
    const imgUrl = $('.top-card-layout__entity-image-container img').attr('data-delayed-url')
    return imgUrl || COMPANY_UNKNOWN
}