import { COMMENT_LIST, COMMENT_ADD, COMMENT_LIKE, REPLY_LIST, REPLY_ADD, REPLY_LIKE } from '~/constants/api'
import { getJsonStorageReader } from '~/service/local_storage';
import { StorageField } from '~/constants/system';
export const state = () => {
    return {
        fetching: false,
        list: [],
        pagination: {},
        posting: false,
        likeHistory: []
    }
}

export const mutations = {
    setCommentList(state, list) {
        state.list = list
    },
    initlikeHistory(state) {
        const list = getJsonStorageReader(StorageField.UserLikeHistory).get() || [];
        state.likeHistory = list;
    },
    updatelikeHistory(state, item) {
        const id = item.cid ? (item.cid + '-' + item._id) : item._id;
        const list = state.likeHistory.slice();
        const index = list.indexOf(id);
        if (index === -1) {
            list.push(index)
        } else {
            list.splice(index, 1)
        }
        getJsonStorageReader(StorageField.SearchHistory).set(list);
        state.likeHistory = list;
    },
    setPagination(state, pagination) {
        state.pagination = pagination
    },
    setFetching(state, value) {
        state.fetching = value
    },
    setPosting(state, value) {
        state.posting = value
    },
    setReplies(state, { index, replies }) {
        let comment = state.list.slice()[index];
        comment.replies = replies;
        state.list.splice(index, 1, comment);
    }
}

export const actions = {
    async getCommentList({ commit, state }, params) {
        if (state.fetching) return
        try {
            commit('setFetching', true)
            const res = await this.$request(COMMENT_LIST, 'get', params);
            commit('setCommentList', res.result.list)
            commit('setPagination', res.result.pagination)
        } catch (err) {
            console.log(err)
        } finally {
            commit('setFetching', false)
        }
    },
    async addComment({ commit, state }, params) {
        if (state.posting) return
        try {
            commit('setPosting', true)
            const res = await this.$request(COMMENT_ADD, 'post', params);
            let comment = { ...res.result, replies: { list: [], pagination: {} } }
            commit('setCommentList', [comment, ...state.list])
        } catch (err) {
            console.log(err)
        } finally {
            commit('setPosting', false)
        }
    },
    async likeComment({ state, commit }, id) {
        if (state.posting) return
        try {
            commit('setPosting', true)
            const res = await this.$request(COMMENT_LIKE, 'post', { id });
            let list = state.list.slice();
            let index = list.findIndex(item => item._id === id);
            let item = Object.assign({}, list[index]);
            item.likes++;
            list.splice(index, 1, item)
            commit('setCommentList', list)
        } catch (err) {
            console.log(err)
        } finally {
            commit('setPosting', false)
        }

    },
    async getReply({ state, commit }, params) {
        const cid = params.cid;
        if (state.fetching) return
        try {
            commit('setFetching', true)
            const res = await this.$request(REPLY_LIST, 'get', params);
            const index = state.list.findIndex(item => item._id === cid);
            commit('setReplies', { index, replies: res.result })
        } catch (err) {
            console.log(err)
        } finally {
            commit('setFetching', false)
        }
    },
    async addReply({ state, commit }, params) {
        const cid = params.cid;
        if (state.posting) return
        try {
            commit('setPosting', true)
            const res = await this.$request(REPLY_ADD, 'post', params);
            const index = state.list.findIndex(item => item._id === cid);
            let { list, pagination } = state.list[index].replies;
            list = [res.result, ...list];
            commit('setReplies', { index, replies: { list, pagination } })
        } catch (err) {
            console.log(err)
        } finally {
            commit('setPosting', false)
        }
    },
    async likeReply({ state, commit }, params) {
        const { cid, rindex, id } = params
        if (state.posting) return
        try {
            commit('setPosting', true);
            const res = await this.$request(REPLY_LIKE, 'post', { id: id });
            let index = state.list.findIndex(item => item._id === cid);
            let { list, pagination } = state.list[index].replies;
            let replyList = list.slice();
            replyList.splice(rindex, 1, res.result)
            commit('setReplies', { index, replies: { list: replyList, pagination } })
        } catch (err) {
            console.log(err)
        } finally {
            commit('setPosting', false)
        }
    }
}

export const getters = {
    isLiked: (state) => {
        return (item) => {
            const id = item.cid ? (item.cid + '-' + item._id) : item._id;
            return state.likeHistory.indexOf(id) !== -1;
        }
    }
}