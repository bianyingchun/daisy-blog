import { ARTICLE_LIST, ARTICLE_LIKE, ARTICLE_GROUP, ARTICLE_DETAIL } from "~/constants/api"
export const state = () => ({
    list: {
        fetching: false,
        data: [],
        pagination: {
            current_page: 0,
            page_size: 10
        },
        hasMore: true,
    },
    hotList: {
        fetching: false,
        data: []
    },
    detail: {
        fetching: false,
        data: {}
    },
    groupList: []
})

export const mutations = {
    reset (state) {
        state.list = {
            fetching: false,
            data: [],
            pagination: {
                current_page: 0,
                page_size: 10
            },
            hasMore: true,
        }
    },
    addListData (state, datas) {
        state.list.data = [...state.list.data, ...datas]
    },
    setListPagination (state, pagination) {
        const { total_page, current_page } = pagination;
        state.list.hasMore = total_page > current_page;
        state.list.pagination = pagination;
    },
    setListFetching (state, value) {
        state.list.fetching = value
    },
    addLikesCount (state) {
        const article = state.detail.data;
        article && article.meta.likes++;
    },
    setDetailFetching (state, value) {
        state.detail.fetching = value
    },
    setDetailData (state, data) {
        state.detail.data = data;
    },
    setHotListData (state, data) {
        state.hotList.data = data;
    },
    setHotListFetching (state, value) {
        state.hotList.fetching = value;
    },
    setGroupList (state, list) {
        state.groupList = list;
    }
}

export const actions = {
    async fetchList ({ state, commit }, params = {}) {
        if (state.list.fetching || !state.list.hasMore) return
        commit('setListFetching', true)
        let { current_page, page_size } = state.list.pagination
        params = { current_page: current_page + 1, page_size, ...params };
        try {
            const res = await this.$request(ARTICLE_LIST, 'get', params);
            commit('addListData', res.result.list)
            commit('setListPagination', res.result.pagination)
            return res;
        } catch (err) {
            console.log(err)
        } finally {
            commit('setListFetching', false);
        }
    },
    async refreshList ({ commit, dispatch }, params) {
        commit('reset');
        await dispatch('fetchList', params)
    },
    async fetchHotList ({ commit, state }) {
        if (state.hotList.fetching) return
        commit('setHotListFetching', true)
        try {
            const res = await this.$request(ARTICLE_LIST, 'get', { hot: true });
            commit('setHotListData', res.result.list)
            return res;
        } catch (err) {
            console.log(err)
        } finally {
            commit('setHotListFetching', false)
        }
    },
    async fetchDetail ({ state, commit }, id) {
        if (state.detail.fetching) return
        commit('setDetailFetching', true)
        try {
            const res = await this.$request(ARTICLE_DETAIL, 'get', { id });
            commit('setDetailData', res.result)
            return res
        } catch (err) {
            throw err;
        } finally {
            commit('setDetailFetching', false)

        }
    },
    async likeArticle ({ commit }, id) {
        const res = await this.$request(ARTICLE_LIKE, 'post', { id })
        commit('addLikesCount')
        return res
    },
    async fetchGroupLList ({ commit, state }) {
        try {
            const res = await this.$request(ARTICLE_GROUP, 'get', {});
            commit('setGroupList', res.result)
        } catch (err) {
            console.log(err);
        }

    }
}

export const getters = {

}