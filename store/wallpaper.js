export const WALLPAPER_API_PATH = '/wallpaper/list'

export const state = () => {
    return {
        papers: {
            fetching:false,
            data:null
        }
    }
}