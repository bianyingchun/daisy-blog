import { getJsonStorageReader } from '~/service/local_storage';
import { SEARCH_HOT_LIST } from "~/constants/api"
import { StorageField } from '~/constants/system';
const maxHistoryLen = 10
export const state = () => {
    return {
        hot: [],
        history: [],
    }
}

export const mutations = {
    initHistory(state) {
        const list = getJsonStorageReader(StorageField.SearchHistory).get() || [];
        state.history = list;
    },
    updateHistory(state, item) {
        let list = state.hot.slice();
        const index = list.indexOf(item.trim());
        if (index !== -1) {
            list.splice(index, 1);
        }
        list.unshift(item)
        list = list.slice(0, maxHistoryLen)
        getJsonStorageReader(StorageField.SearchHistory).set(list);
        state.history = list;
    },
    updateHotList(state, list = []) {
        state.hot = list;
    }
}

export const actions = {
    async fetchHotList({ commit }) {
        try {
            const res = await this.$request(SEARCH_HOT_LIST, 'get', {});
            commit('updateHotList', res.result);
        } catch (err) {
            console.log(err)
        }
    }
}