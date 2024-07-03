
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
    const start = (count-1)*10
    return {
        url: "https://public.zwayam.com/jobs/search",
        "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryYvIFvCgkuLKevwUc",
      "priority": "u=1, i",
      "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "Referer": "https://www.flipkartcareers.com/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "data": `------WebKitFormBoundaryYvIFvCgkuLKevwUc\r\nContent-Disposition: form-data; name=\"filterCri\"\r\n\r\n{\"paginationStartNo\":${start},\"selectedCall\":\"sort\",\"sortCriteria\":{\"name\":\"modifiedDate\",\"isAscending\":false}}\r\n------WebKitFormBoundaryYvIFvCgkuLKevwUc\r\nContent-Disposition: form-data; name=\"domain\"\r\n\r\nwww.flipkartcareers.com\r\n------WebKitFormBoundaryYvIFvCgkuLKevwUc--\r\n`,
    "method": "POST"
    }
}