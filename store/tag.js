/**
 * @file 标签数据状态 / ES module
 * @module store/tag
 * @author Surmon <https://github.com/surmon-china>
 */

export const TAG_API_PATH = '/tag'

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
        const res = await this.$request('/tag/list', 'get', {});
        if (res) {
            commit('updateListData', res.result.list);
        }
        commit('updateFetching', true)
    }
}
