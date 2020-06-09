export const get = key => localStorage.getItem(key)
export const del = key => localStorage.removeItem(key)
export const set = (key, val)=> localStorage.setItem(key, val)

export const getStorageReader = (key) => ({
    get: () => get(key),
    set: (val) => set(key, val),
    remove:() => del(key)
})

export const getJsonStorageReader = (key) => ({
    get() {
        const data = get(key)
        return data ? JSON.parse(data) : null
    },
    set(data) {
        set(key, JSON.stringify(data))
    },
    remove: () => del(key)
})
