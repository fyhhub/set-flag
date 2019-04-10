
export const getLocalStorage = (attr) => {
    let data = window.localStorage.getItem(attr)
    if (typeof data !== 'object') {
        if (typeof data === 'string') {
            return data.slice(1, data.length - 1)
        } else {
            return data
        }
    }
    return JSON.parse(data)
}
export const setLocalStorage = (attr, value) => {
    console.log(value);
    
    if (typeof value !== 'object') {
        window.localStorage.setItem(attr, value)
    }
    window.localStorage.setItem(attr, JSON.stringify(value))
}