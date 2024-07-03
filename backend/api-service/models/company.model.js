function Company(props){
    if(!props.name){
        throw new Error(`Company name cannot be ${props.name}`)
    }
    const companyObj =  {
        name:props.name || "",
        image:props.image || "",
        isApi:props.isApi ?? null,
        link:props.link || "",
        linkedin:props.linkedin || "",
        isActive:props.isActive ?? true,
        extract:{
            api: props.extract?.api,
            scrape:props.extract?.scrape,
            page:props.extract?.page
        }
    } 
    return companyObj
}

export default Company