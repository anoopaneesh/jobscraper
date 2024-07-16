function Company(props) {
    if (!props.name) {
        throw new Error(`Company name cannot be ${props.name}`)
    }
    const companyObj = {
        name: props.name || "",
        image: props.image || "",
        isApi: props.isApi ?? null,
        link: props.link || "",
        linkedin: props.linkedin || "",
        isActive: props.isActive ?? true,
        skills: props.skills ?? false, //TODO: this changes to true after all
        extract: {
            api: props.extract?.api,
            scrape: props.extract?.scrape,
            page: props.extract?.page,
            jobExtra: props.extract?.jobExtra
        }
    }
    return companyObj
}

export default Company