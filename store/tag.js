import { TAG_LIST } from "~/constants/api"

export const state = () => {
    return {
        fetching: false,
        data: []
    }
}

export const mutations = {
    updateFetching (state, action) {
        state.fetching = action
    },
    updateListData (state, list) {
        state.data = list
    }
}

export const actions = {
    async fetchList ({ commit }) {
        commit('updateFetching', true)
        try {
            const res = await this.$request(TAG_LIST, 'get', {});
            commit('updateListData', res.result.list);
        } catch (err) {
            console.log(err)
        } finally {
            commit('updateFetching', true)
        }
    }
}
