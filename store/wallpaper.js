import { WALLPAPER_LIST } from "~/constants/api"

export const state = () => {
    return {
        papers: null,
        fetching: false,
    }
}

export const mutations = {
    updatePapersFetching (state, action) {
        state.fetching = action
    },
    updatePapersData (state, list) {
        state.papers = list
    }
}

export const actions = {
    async fetchPapers ({ commit, state }) {
        if (state.papers) return state.papers;
        commit('updatePapersFetching', true)
        try {
            const res = await this.$request(WALLPAPER_LIST, 'get');
            commit('updatePapersData', res.result.list)
        } catch (err) {
            console.log(err)
        } finally {

            commit('updatePapersFetching', false)
        }
    }
}