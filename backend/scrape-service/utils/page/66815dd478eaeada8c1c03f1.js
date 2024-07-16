
// Use this Template
// --------------------
// export function getPage(count) { 
//     return {
//         url: "<url of the api>",
//         method: "<method>",
//         data: "<body>",
//         headers: "<headers>"
//     }
// }
// --------------------------------

// Write code below

export function getPage(count) { 
    return fetch("https://careers.hotstar.com/blogapi/getalljobposts", {
  "headers": {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_gid=GA1.2.330524337.1719753752; _gat_gtag_UA_53733575_6=1; PHPSESSID=947p6eloilg9fobsmg8nj72on3; _ga_WL20P6DNZS=GS1.1.1719831389.2.1.1719831413.0.0.0; _ga_F60YLYF1KS=GS1.1.1719831390.2.1.1719831413.0.0.0; _ga=GA1.2.350712938.1719753752"
  },
  "referrerPolicy": "no-referrer",
  "body": "tpof=bycat&limit=0&catvalm=Loading...",
  "method": "POST"
});
}

 

