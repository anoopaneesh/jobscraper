
// Use this Template
// --------------------
// export function getPage(count) { 
//     const offset = (count-1) * limit
//     return <fectch> or <string>
// }
// --------------------------------

// Write code below

export function getPage(count) {
    const start = (count-1)*10;
    return fetch("https://www.amazon.jobs/api/jobs/search",{
        method: "POST",
        body: JSON.stringify({
            "accessLevel": "EXTERNAL",
            "excludeFacets": [
                {
                    "name": "isConfidential",
                    "values": [
                        {
                            "name": "1"
                        }
                    ]
                },
                {
                    "name": "businessCategory",
                    "values": [
                        {
                            "name": "a-confidential-job"
                        }
                    ]
                }
            ],
            "filterFacets": [
                {
                    "name": "category",
                    "requestedFacetCount": 9999,
                    "values": [
                        {
                            "name": "Software Development"
                        }
                    ]
                }
            ],
            "locationFacets": [
                [
                    {
                        "name": "country",
                        "requestedFacetCount": 9999,
                        "values": [
                            {
                                "name": "IN"
                            }
                        ]
                    }
                ]
            ],
            "query": "",
            "size": 10,
            "start": start,
            "treatment": "OM",
            "sort": {
                "sortOrder": "DESCENDING",
                "sortType": "SCORE"
            }
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}