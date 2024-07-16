
// Use this Template
// --------------------
export function getPage(count) { 
    const offset = (count-1) * 10
    return fetch(`https://jobs.api.mercedes-benz.com/search?data=%7B%22LanguageCode%22:%22EN%22,%22SearchParameters%22:%7B%22FirstItem%22:${offset+1},%22CountItem%22:10,%22Sort%22:[%7B%22Criterion%22:%22PublicationStartDate%22,%22Direction%22:%22DESC%22%7D],%22MatchedObjectDescriptor%22:[%22ID%22,%22CareerLevel.Name%22,%22PositionID%22,%22PositionTitle%22,%22PositionURI%22,%22OrganizationName%22,%22PositionLocation.CityName%22,%22PositionLocation.DisplayName%22,%22PositionLocation.CountryCode%22,%22PositionLocation.Country%22,%22PositionLocation.Latitude%22,%22PositionSchedule.Longitude%22,%22ParentOrganization%22,%22ParentOrganizationName%22,%22PositionStartDate%22,%22PositionFormattedDescription.Content%22,%22UserAreaParentOrganizationIdentifier%22,%22PositionIndustry.Name%22,%22JobCategory.Name%22,%22CareerLevel.Name%22,%22PositionOfferingType.Name%22,%22PublicationStartDate%22,%22PositionSchedule.Name%22,%22LogoURI%22,%22ApplyURI%22,%22PositionURL.EmbedURL%22,%22PositionURL.URL%22,%22PositionURL.ChannelId%22]%7D,%22SearchCriteria%22:[%7B%22CriterionName%22:%22PublicationLanguage.Code%22,%22CriterionValue%22:[%22EN%22]%7D,%7B%22CriterionName%22:%22PositionLocation.Country%22,%22CriterionValue%22:[390]%7D,%7B%22CriterionName%22:%22JobCategory.Code%22,%22CriterionValue%22:[46,42]%7D,%7B%22CriterionName%22:%22ParentOrganization%22,%22CriterionValue%22:[140]%7D]%7D`, {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en, en, en;q=0.9",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "Referer": "https://jobs.mercedes-benz.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
});
}
// --------------------------------

// Write code below

