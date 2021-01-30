import { isServer } from "~/environment"
import uaParser from "~/util/ua-parser"
export const actions = {
  async nuxtServerInit (store, { req }) {
    const userAgent = isServer ? req.headers['user-agent'] : navigator.userAgent;
    const { isMobile, isWechat, isIE, isSafari } = uaParser(userAgent);
    store.commit('global/updateUserAgent', userAgent)

    // 微信/Safari/移动端无法精确判断兼容性，使用 jpg 格式
    if (isMobile || isWechat || isIE || isSafari) {
      store.commit('global/updateImageExt', systemConstants.ImageExt.Jpg)
    }

    // 如果是移动端，则设置语言为中文
    if (isMobile) {
      store.commit('global/updateMobileState', true)
      store.commit('global/updateLanguage', systemConstants.Language.Zh)
    }
    const initFetchTask = [
      store.dispatch('tag/fetchList'),
      store.dispatch('article/fetchGroupLList'),
      store.dispatch('search/fetchHotList')
      // store.dispatch('music/fetchMusicList')
      // store.dispath('category/fetchList')
    ];
    if (!isMobile) {
      initFetchTask.push(store.dispatch('article/fetchHotList'))
    }
    try {

      await Promise.all(initFetchTask)
    } catch (err) {
      console.log(err)
    }
  }
}