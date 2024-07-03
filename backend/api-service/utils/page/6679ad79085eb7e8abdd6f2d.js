export function getPage(count){
    return {
        url:`https://gcsservices.careers.microsoft.com/search/api/v1/search?lc=India&l=en_us&pg=${count}&pgSz=20&o=Relevance&flt=true`
    }
}