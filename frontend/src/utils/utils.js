export const capitalize = (val) => {
    if(typeof val !== 'string') return val
    return val[0].toUpperCase() + val.slice(1)
}