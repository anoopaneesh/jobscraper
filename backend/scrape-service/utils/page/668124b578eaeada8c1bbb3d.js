
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
    return fetch("https://api-higher.gs.com/gateway/api/v1/graphql",{
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
    "sec-fetch-site": "same-site",
    "traceparent": "00-00000000000000003db1884c72d3d977-0dbe3ab5465e6768-01",
    "x-datadog-origin": "rum",
    "x-datadog-parent-id": "990293518312171368",
    "x-datadog-sampling-priority": "1",
    "x-datadog-trace-id": "4445484169116768631",
    "x-higher-request-id": "a3b9c1bd-aebe-44ea-9609-745015123e9e",
    "x-higher-session-id": "a1da5325-708b-482d-8e4b-28ce34f98659",
    "Referer": "https://higher.gs.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": `{\"operationName\":\"GetRoles\",\"variables\":{\"searchQueryInput\":{\"page\":{\"pageSize\":10,\"pageNumber\":${count-1}},\"sort\":{\"sortStrategy\":\"RELEVANCE\",\"sortOrder\":\"DESC\"},\"filters\":[{\"filterCategoryType\":\"LOCATION\",\"filters\":[{\"filter\":\"India\",\"subFilters\":[{\"filter\":\"Karnataka\",\"subFilters\":[{\"filter\":\"Bengaluru\",\"subFilters\":[]}]},{\"filter\":\"Maharashtra\",\"subFilters\":[{\"filter\":\"Mumbai\",\"subFilters\":[]}]},{\"filter\":\"Telangana\",\"subFilters\":[{\"filter\":\"Hyderabad\",\"subFilters\":[]}]}]}]}],\"experiences\":[\"PROFESSIONAL\",\"EARLY_CAREER\"],\"searchTerm\":\"\"}},\"query\":\"query GetRoles(\$searchQueryInput: RoleSearchQueryInput!) {\\n  roleSearch(searchQueryInput: \$searchQueryInput) {\\n    totalCount\\n    items {\\n      roleId\\n      corporateTitle\\n      jobTitle\\n      jobFunction\\n      locations {\\n        primary\\n        state\\n        country\\n        city\\n        __typename\\n      }\\n      status\\n      division\\n      skills\\n      jobType {\\n        code\\n        description\\n        __typename\\n      }\\n      externalSource {\\n        sourceId\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\"}`,
  "method": "POST"
})
}




