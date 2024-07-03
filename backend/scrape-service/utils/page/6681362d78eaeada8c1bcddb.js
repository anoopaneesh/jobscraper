
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
    const from = (count-1) * 10
    return  fetch("https://careers.adobe.com/widgets",
   {"headers": {
    "accept": "*/*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "content-type": "application/json",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-csrf-token": "444a4f14d65743e19bca332e746f9a8b",
    "cookie": "AKA_A2=A; _cs_mk_aa=0.20932107150251422_1719743278977; s_nr=1719743278978-New; mbox=session%2356037574308466049361897918324830383682%2DwbVIdh%231719745137; mboxEdgeCluster=41; kndctr_9E1005A551ED61CA0A490D45_AdobeOrg_cluster=ind1; kndctr_9E1005A551ED61CA0A490D45_AdobeOrg_identity=CiY1NjAzNzU3NDMwODQ2NjA0OTM2MTg5NzkxODMyNDgzMDM4MzY4MlITCMzSv8WGMhABGAEqBElORDEwAPABzNK%5FxYYy; AMCV_9E1005A551ED61CA0A490D45%40AdobeOrg=MCMID|56037574308466049361897918324830383682; fg=YSMVGQE3FPP5EDEKFAQVYHAADQ======; bm_mi=B86E7BB390622BB22E750319BB8AA20E~YAAQTbBUuNdLkF+QAQAAC+uvaBgjJRhABa0owhTLJP8wZeVFcTixfjJtd00VhXXLW5ibINOPY7LKglC5/lNBo2ovWUj8J3sIsAERCeBU/UvCc8SAz9WXw1zBleM/B4rNnCLyJG7YFr1mHQjOKoPhcekzwuRdnEfq7MT//M9iamoUrK2Lbr0fjk92LxLPJLH0CPG5E3p1hLE2iuW50LKvT3EO3bW6AFHiwTLdiw9z+f5tV5sVikQ2pq5by7Qk947HmlHGUHyHU3hlRlkfFPdORU3ay74nqRLYTvRItx3PhwIFKDkVQQpFRzBHDQSmvWiP25KQ4EnsYxC4eX5+cYagL8YfP/L06SCBJFIsmjhcPfnNGVj1/5Upjhf1BVhOoS391puh0BdgJYJfntUQxGsSwtOeyD4RpFksxVIv/Rfep57oLfIGWw==~1; bm_sv=0AD300ADEAA2E2BD72D43B9B560C9DC6~YAAQTbBUuNhLkF+QAQAADOuvaBihFMqxN2yZH5wuD8a3Zx8uUWwUtEiVugEvlhAfG/GpdzZh8MWTIkEqYjDJRezAtHdemn9omYVJ1+UR6xDfPso2vYDKEshQdcwN74apFS3DIXmD1DQCwiMhYXXwP3FLXE5s/3eYYbBJaYccs8VMC51Efnh++SNRrsRhZw034PaQewKu+ky3QzRych2fgjAagPvtogOsrqJCJ6jN0cG4e8m8pWnh0/qi2EFDRt0=~1; gpv=adobe.com:careers; OptanonAlertBoxClosed=2024-06-30T10:27:59.620Z; OptanonConsent=groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1; adobeHit=1; kndctr_9E1005A551ED61CA0A490D45_AdobeOrg_consent=general%3Din; _fbp=fb.1.1719743283160.1306762415; _cs_c=0; adcloud={%22_les_v%22:%22c%2Cy%2Cadobe.com%2C1719745083%22}; _cs_id=34a08e0b-4cc6-a33a-cb44-90196019ab96.1719743283.1.1719743283.1719743283.1.1753907283272; _cs_s=1.0.0.1719745083273; _uetsid=6e9ccfa036cb11efa49eb35ca5a80912; _uetvid=6e9cc58036cb11ef87f2db8af71cfd35; _scid=abc0a2c5-10fc-4d71-83bb-a245ffc3793c; _scid_r=abc0a2c5-10fc-4d71-83bb-a245ffc3793c; _gcl_au=1.1.211083533.1719743284; _ScCbts=%5B%5D; _sctr=1%7C1719685800000; PLAY_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7IkpTRVNTSU9OSUQiOiI0ZjIyOWJiNy0zNDI2LTRmOWYtODYxOS1jOTE3MjUwNGY4ZGMifSwibmJmIjoxNzE5NzQzMjg3LCJpYXQiOjE3MTk3NDMyODd9.BBRR5uR1Jy6GbHWT_282kEHnAl9have_vxdyPHmxbDU; PHPPPE_ACT=4f229bb7-3426-4f9f-8619-c9172504f8dc; VISITED_LANG=en; VISITED_COUNTRY=us; ak_bmsc=D4E49F26B10B168F6E760C6B91033DE6~000000000000000000000000000000~YAAQTbBUuO9LkF+QAQAAWBSwaBiJc0lSxxeOyEd0FGT5CtDUwCnqhtIMDIouoNsFNrPFRUfDNqr+AxfglQFnxhXJGD49llTbfwHnlPUU9+smaI/f7xGJjeqO6MMdc1cVtTNd5o5mz3Of162G230SCgE5Sfyjdqtnc+y29U/ItSuZHPwouJ6RBxAjYoYNRpUBsCApSgEwcMe9O9lKfqtKMG20CZnEotCZlu8Dh/cO3rPlCl5Nefbx7LZ2hmIdfS+wkYs5HnietXdxBlNwymTx6wn+BCw+HtQNAGjSIjF4Hdf9AkjiEHc/9wJaOuil8xSWK3Ji7gSvMfN0OLT+JVh7Q0TwVVKvDWB3ZtKz5SwuIm7y/ny6ZaG3PhHlkrUyVaWx3o5HJlKhDklpCAk3IN8jQ+sIxJv2LVD9d6ZIdQ9t7cJyTnyHPxxoQcq8tAZXju6xdF8UFZDo2DxbspXZzWx6Shrxont1lqijHE4s+F4sfGdskiAAy4G6/NIRqKTd1BoOUoPnfJsGg9zGD/Bd3eZPo5qSOZ7S+g0XPl6wXwO1n/Szp8//TeU+hjWRnwG5kb8O48f0R93t; Per_UniqueID=19068b01c4494b-384000-a274-19068b01c45dca; in_ref=https%3A%2F%2Fwww.adobe.com%2F; ext_trk=pjid%3D4f229bb7-3426-4f9f-8619-c9172504f8dc&uid%3D19068b01c4494b-384000-a274-19068b01c45dca&p_in_ref%3Dhttps://www.adobe.com/&p_lang%3Den_us&refNum%3DADOBUS; PHPPPE_GCC=a; PHPPPE_NPS=a",
    "Referer": "https://careers.adobe.com/us/en/search-results",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": `{\"lang\":\"en_us\",\"deviceType\":\"desktop\",\"country\":\"us\",\"pageName\":\"search-results\",\"ddoKey\":\"refineSearch\",\"sortBy\":\"\",\"subsearch\":\"\",\"from\":${from},\"jobs\":true,\"counts\":true,\"all_fields\":[\"remote\",\"country\",\"state\",\"city\",\"experienceLevel\",\"category\",\"profession\",\"employmentType\",\"jobLevel\"],\"size\":10,\"clearAll\":false,\"jdsource\":\"facets\",\"isSliderEnable\":false,\"pageId\":\"page15\",\"siteType\":\"external\",\"keywords\":\"\",\"global\":true,\"selected_fields\":{\"country\":[\"India\"]},\"locationData\":{}}`,
  "method": "POST"
   
})
    
}

