import { MUSIC_LIST, MUSIC_LYRIC } from '~/constants/api'
import { lyricParser, songParser } from '~/util/music-parser'
export const state = () => {
    return {
        list: {
            data: [],
            fetching: false,
        },
        playing: false,
        currentTime: 0,
        lyric: {
            data: [],
            fetching: false
        },
        currentLyricIndex: 0,
        currentIndex: -1,
    }
}

export const mutations = {
    setListFetching(state, value) {
        state.list.fetching = value
    },
    setListData(state, list) {
        state.list.data = list
    },
    setLyricFetching(state, value) {
        state.lyric.fetching = value;
    },
    setLyricData(state, list) {
        state.lyric.data = list;
    },
    setCurrentIndex(state, index) {
        state.currentIndex = index;
    },
    setCurrentLyricIndex(state, index) {
        state.currentLyricIndex = index;
    },
    setCurrentTime(state, time) {
        state.currentTime = time;
    },
    setPlaying(state, value) {
        state.playing = value;
    },
}

export const actions = {
    playNext({ commit, state }) {
        let index = state.currentIndex + 1;
        index = index === state.list.data.length ? 0 : index;
        commit('setCurrentIndex', index)
        commit('setPlaying', true)

    },
    playPrev({ commit, state }) {
        let index = state.currentIndex - 1;
        index = index < 0 ? state.list.data.length - 1 : index;
        commit('setCurrentIndex', index)
        commit('setPlaying', true)
    },
    playSong({ commit }, index = 0) {
        commit('setCurrentIndex', index)
        commit('setPlaying', true)
    },
    updateTime({ commit, state }, time) {
        commit('setCurrentTime', time)
        for (let i = 0; i < state.lyric.data.length; i++) {
            const item = state.lyric.data[i]
            if (item.time * 1000 >= time) {
                commit('setCurrentLyricIndex', Math.max(0, i - 1))
                break
            }
        }
    },
    async fetchMusicList({ commit, state }, id = 3150355397) {
        if (state.list.fetching) return;
        commit('setListFetching', true);
        try {
            const res = await this.$request(MUSIC_LIST, 'get', { id });
            commit('setListData', res.result.playlist.tracks.map(item => songParser(item)))
            commit('setCurrentIndex', 0);
            console.log(res.result.playlist.tracks)
        } catch (err) {
            console.log(err)
        } finally {
            commit('setListFetching', false)
        }
    },
    async fetchLyric({ state, commit }, id) {
        if (state.list.fetching) return;
        commit('setLyricFetching', true);
        try {
            const res = await this.$request(MUSIC_LYRIC, 'get', { id });
            const lyric = res.result.nolyric ? [] : lyricParser(res.result.lrc.lyric);
            commit('setLyricData', lyric)
        } catch (err) {
            console.log(err)
        } finally {
            commit('setLyricFetching', false)
        }
    }
}

export const getters = {
    currentSong: state => {
        return state.list.data[state.currentIndex] || null;
    },
    currentLyric: state => {
        if (state.lyric.data.lrc) {
            const item = state.lyric.data.lrc[state.lyric.currentIndex]
            return item.value
        }
        return ''
    },
    percent: (state) => {
        const song = state.list.data[state.currentIndex];
        if (!song) return 0
        return state.currentTime / song.dt
    }
}

