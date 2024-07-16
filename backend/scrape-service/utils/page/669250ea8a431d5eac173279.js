
// Use this Template
// --------------------
export function getPage(count) {  
    return fetch("https://api.lever.co/v0/postings/meesho/?&team=Demand&team=Supply%20%26%20Fulfilment&team=QA&team=Infrastructure&team=CTO%20Office&team=Data%20Engineering&team=Frontend&team=Backend&team=Security", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "if-none-match": "W/\"1e4e6-zipy5M9GWkpCh/22BMJXw8sUe1g\"",
    "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "Referer": "https://www.meesho.io/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
});
}
// --------------------------------

// Write code below

