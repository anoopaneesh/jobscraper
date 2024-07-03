import * as cheerio from "cheerio"

function getPage(url) {
  return fetch(url, { method: "GET" }).then((res) => res.text());
}

function getIterCount(page, cheerioObj) {
  let $ = cheerioObj;
  let total = Number($('div:contains("jobs matched") > span').first().text());
  let pages = Number.isNaN(total) ? 0 : Math.ceil(total / 20);
  return pages;
}

function buildIterUrl(url, iter) {
  return `${url}&page=${iter}`;
}

export async function setup(url) {
  console.log("START : Google")
  let page = await getPage(url);
  let $ = cheerio.load(page);
  let total_pages = getIterCount(page, $) || 1;
  let iter = 0;
  let acc_cards = [];
  while (iter <= total_pages) {
    console.log("Scraping Google:"+iter)
    if (iter != 1) {
      page = await getPage(buildIterUrl(url, iter));
      $ = cheerio.load(page);
    }
    let cards = extract(page, $, iter == 1 ? url : buildIterUrl(url, iter));
    acc_cards.push(...cards);
    iter++;
  }
  console.log("END : Google")
  return acc_cards;
}

function extract(page, cheerioObj, url) {
  let cards = [];
  let $ = cheerioObj;
  $("ul.spHGqe")
    .children("li")
    .each((idx, elem) => {
      let min_qualifications = {
        title: "Minimum Qualifications",
        data: [],
      };
      //Finding extra data
      $(elem)
        .find('h4:contains("Minimum qualifications")')
        .next()
        .children("li")
        .each((idx, elem1) => {
          min_qualifications.data.push($(elem1).text());
        });

      //Creating card
      cards.push({
        company: "Google",
        title: $(elem).find("h3").text(),
        location: $(elem)
          .find('i:contains("place")')
          .parent()
          .find("span.r0wTof ")
          .text(),
        link:
          "https://www.google.com/about/careers/applications/" +
          $(elem)
            .find('a[class="WpHeLc VfPpkd-mRLv6 VfPpkd-RLmnJb"]')
            .attr("href"),
        extra: [min_qualifications],
      });
    });
  return cards;
}