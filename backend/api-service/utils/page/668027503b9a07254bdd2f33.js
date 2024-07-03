
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
    return {
    "url":"https://www.uber.com/api/loadSearchJobsResults?localeCode=en",
  "headers": {
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
    "x-csrf-token": "x",
    "cookie": "utag_main__sn=1; utag_main_ses_id=1719674613010%3Bexp-session; segmentCookie=a; _ua={\"session_id\":\"fc7db9ff-9263-4b86-bf72-e7dd160c4c80\",\"session_time_ms\":1719674612054}; marketing_vistor_id=e299e168-fd2c-4087-b65f-34e8e45b891a; user_city_ids=1051; uber_sites_geolocalization={%22best%22:{%22localeCode%22:%22en%22%2C%22countryCode%22:%22IN%22%2C%22territoryId%22:1051}%2C%22url%22:{%22localeCode%22:%22en%22%2C%22countryCode%22:%22IN%22}%2C%22user%22:{%22countryCode%22:%22IN%22%2C%22territoryId%22:1051%2C%22territoryGeoJson%22:[[{%22lat%22:12.2953796%2C%22lng%22:75.1721725}%2C{%22lat%22:12.2953796%2C%22lng%22:76.5407562}%2C{%22lat%22:10.9530706%2C%22lng%22:76.5407562}%2C{%22lat%22:10.9530706%2C%22lng%22:75.1721725}]]%2C%22territoryGeoPoint%22:{%22latitude%22:11.22429%2C%22longitude%22:76.095221}%2C%22localeCode%22:%22en%22}}; jwt-session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTk2NzQ2MTIsImV4cCI6MTcxOTc2MTAxMn0.yzluMM7meeDtIxBpTSpf3vX7KqihiAuAwqLmX_VcCYA; utag_main_segment=a; utag_geo_code=GB; utag_main_optimizely_segment=a; CONSENTMGR=c1:1%7Cc2:1%7Cc3:1%7Cc4:1%7Cc5:1%7Cc6:1%7Cc7:1%7Cc8:1%7Cc9:1%7Cc10:1%7Cc11:1%7Cc12:1%7Cc13:1%7Cc14:1%7Cc15:1%7Cts:1719674613172%7Cconsent:true; utag_main__ss=0%3Bexp-session; _fbp=fb.1.1719674614544.212847860339123192; _hjSession_960703=eyJpZCI6IjZkMTAyNjYyLWVjY2QtNGMxMS04ZjE1LWFlNDc2ODg3MWY2ZiIsImMiOjE3MTk2NzQ2MTUxMTgsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjoxLCJzcCI6MH0=; _gid=GA1.2.1265979190.1719674615; _gat_gtag_UA_7157694_35=1; utag_main__pn=2%3Bexp-session; utag_main__se=3%3Bexp-session; utag_main__st=1719676433107%3Bexp-session; _hjSessionUser_960703=eyJpZCI6IjkxMDk4YjQ0LTcyNmQtNWM3YS04YTZjLTg2ZDUyMTVmN2IwMiIsImNyZWF0ZWQiOjE3MTk2NzQ2MTUxMTYsImV4aXN0aW5nIjp0cnVlfQ==; _ga=GA1.1.452475169.1719674615; mp_adec770be288b16d9008c964acfba5c2_mixpanel=%7B%22distinct_id%22%3A%20%22ed23e753-d621-47d2-acf9-fa82a421974b%22%2C%22%24device_id%22%3A%20%22190649832d8de7-06c1ab45f97f31-26001f51-384000-190649832d9f34%22%2C%22%24search_engine%22%3A%20%22google%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.google.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.google.com%22%2C%22%24user_id%22%3A%20%22ed23e753-d621-47d2-acf9-fa82a421974b%22%7D; _ga_XTGQLY6KPT=GS1.1.1719674615.1.1.1719674662.0.0.0",
    "Referer": "https://www.uber.com/in/en/careers/list/?location=IND-Maharashtra-Mumbai&location=IND-Karnataka-Bangalore&location=IND-Telangana-Hyderabad&location=IND-Haryana-Gurgaon&location=IND-Andhra%20Pradesh-Visakhapatnam",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "data": `{\"params\":{\"location\":[{\"country\":\"IND\",\"region\":\"Maharashtra\",\"city\":\"Mumbai\"},{\"country\":\"IND\",\"region\":\"Karnataka\",\"city\":\"Bangalore\"},{\"country\":\"IND\",\"region\":\"Telangana\",\"city\":\"Hyderabad\"},{\"country\":\"IND\",\"region\":\"Haryana\",\"city\":\"Gurgaon\"},{\"country\":\"IND\",\"region\":\"Andhra Pradesh\",\"city\":\"Visakhapatnam\"}]},\"page\":${count-1},\"limit\":10}`,
  "method": "POST"
}
}
 