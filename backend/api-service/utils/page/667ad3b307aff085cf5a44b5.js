export function getPage(count) {
    const start = (count-1)*10;
    return {
        url: "https://www.amazon.jobs/api/jobs/search",
        method: "POST",
        data: {
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
        },
        headers: {
            'Content-Type': 'application/json'
        }
    }
}