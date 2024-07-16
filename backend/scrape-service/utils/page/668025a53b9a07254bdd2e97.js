
// Use this Template
// --------------------
// export function getPage(count) { 
//     const offset = (count-1) * limit
//     return <fectch> or <string>
// }
// --------------------------------

// Write code below


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
    return fetch("https://www.metacareers.com/graphql",{
       "body": "av=0&__user=0&__a=1&__req=2&__hs=19903.BP%3ADEFAULT.2.0..0.0&dpr=1&__ccg=EXCELLENT&__rev=1014578518&__s=gnhzad%3A53gkan%3A238902&__hsi=7385943448172274162&__dyn=7xeUmwkHg7ebwKBAg5S1Dxu13wqovzEdEc8uxa1twKzobo1nEhwem0nCq1ewcG0KEswaq1xwEw7Bx61vw4iwBgao1O82Ixe0DopyE3bwkE5G0zE5W0HUvw4JwJwSyES4E3PwbS1Lwqo3cwbq0x8qw53wtU5K&__csr=&lsd=AVoIhgdD4NY&jazoest=2929&__spin_r=1014578518&__spin_b=trunk&__spin_t=1719673967&__jssesw=1&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=CareersJobSearchResultsQuery&variables=%7B%22search_input%22%3A%7B%22q%22%3A%22%22%2C%22divisions%22%3A%5B%5D%2C%22offices%22%3A%5B%22Bangalore%2C%20India%22%2C%22Gurgaon%2C%20India%22%2C%22Hyderabad%2C%20India%22%2C%22Mumbai%2C%20India%22%2C%22New%20Delhi%2C%20India%22%5D%2C%22roles%22%3A%5B%5D%2C%22leadership_levels%22%3A%5B%5D%2C%22saved_jobs%22%3A%5B%5D%2C%22saved_searches%22%3A%5B%5D%2C%22sub_teams%22%3A%5B%5D%2C%22teams%22%3A%5B%5D%2C%22is_leadership%22%3Afalse%2C%22is_remote_only%22%3Afalse%2C%22sort_by_new%22%3Afalse%2C%22page%22%3A1%2C%22results_per_page%22%3Anull%7D%7D&server_timestamps=true&doc_id=9114524511922157",
  "method": "POST",
         "headers": {
    "accept": "*/*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "content-type": "application/x-www-form-urlencoded",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-asbd-id": "129477",
    "x-fb-friendly-name": "CareersJobSearchResultsQuery",
    "x-fb-lsd": "AVoIhgdD4NY",
    "cookie": "datr=7SOAZt1SPB6eGHTGquqkr1PJ; wd=1305x1305",
    "Referer": "https://www.metacareers.com/jobs/?q=&offices[0]=Bangalore%2C%20India&offices[1]=Gurgaon%2C%20India&offices[2]=Hyderabad%2C%20India&offices[3]=Mumbai%2C%20India&offices[4]=New%20Delhi%2C%20India",
    "Referrer-Policy": "origin-when-cross-origin"
  },
    })
}