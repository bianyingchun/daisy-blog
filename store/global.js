import systemConstants from '~/constants/system'
import {getStorageReader} from '~/service/local_storage.js'
import i18nConfig from '~/config/i18n.config'
const localThemeReader = getStorageReader(systemConstants.StorageField.Theme)
const themes = [systemConstants.Theme.Default, systemConstants.Theme.Dark]
export const state = () => ({
    theme:systemConstants.Theme.Default,
    isMobile:false,
    language:i18nConfig.default,
    onBarrage:false
  })

export const mutations = {
    //主题
    updateTheme(state, theme) {
        if(themes.includes(theme)) {
            state.theme = theme
            localThemeReader.set(theme)
        }
    },

    resetTheme(state) {
        const historyTheme = localThemeReader.get()
        if(historyTheme) {
            const theme = historyTheme === systemConstants.Theme.Dark ? systemConstants.Theme.Dark : systemConstants.Theme.Default
            state.theme = theme
            localThemeReader.set(theme)
        }
    },
    //切换pc mobile
    updateMobileState(state, flag) {
        state.isMobile = flag
    },
    //切换语言
    updateLanguage(state, action) {
        state.language = action
    },
      // 切换弹幕状态
    toggleUpdateBarrageOnState(state, action) {
        state.onBarrage = action != null ? !!action : !state.onBarrage
    },
}


export const getters = {
    theme: state => state.theme,
    isDarkTheme : state => state.theme === systemConstants.Theme.Dark,
    isMobile:state => state.isMobile,
    isEnLang:state => state.language === systemConstants.Language.En
}