import systemConstants from '~/constants/system'
import stateConstants from '~/constants/state'
import { getStorageReader } from '~/service/local_storage.js'
import i18nConfig from '~/config/i18n.config'
const localThemeReader = getStorageReader(systemConstants.StorageField.Theme)
const themes = [systemConstants.Theme.Default, systemConstants.Theme.Dark]
export const state = () => ({
    theme: systemConstants.Theme.Default,
    isMobile: false,
    language: i18nConfig.default,
    onBarrage: false,
    constants: stateConstants,
    // 打开今日壁纸
    onWallpaper: false,
    // 页面的栏目展示类型（3栏/2栏）
    isTwoColumns: false,
    isThreeColumns: false,
    // 图片格式，见 OSS: https://oss.console.aliyun.com/bucket/oss-cn-hangzhou/surmon-static/process/img
    imageExt: systemConstants.ImageExt.WebP,
    // ua
    userAgent: '',
})

export const mutations = {
    //主题
    updateTheme (state, theme) {
        if (themes.includes(theme)) {
            state.theme = theme
            localThemeReader.set(theme)
        }
    },

    resetTheme (state) {
        const historyTheme = localThemeReader.get()
        if (historyTheme) {
            const theme = historyTheme === systemConstants.Theme.Dark ? systemConstants.Theme.Dark : systemConstants.Theme.Default
            state.theme = theme
            localThemeReader.set(theme)
        }
    },
    //切换pc mobile
    updateMobileState (state, flag) {
        state.isMobile = flag
    },
    //切换语言
    updateLanguage (state, action) {
        state.language = action
    },
    // 切换弹幕状态
    toggleUpdateBarrageOnState (state, action) {
        state.onBarrage = action != null ? !!action : !state.onBarrage
    },
    // 切换今日壁纸状态
    toggleUpdateWallpaperOnState (state, action) {
        state.onWallpaper = action != null ? !!action : !state.onWallpaper
    },
    updateUserAgent (state, value) {
        state.userAgent = value;
    },
    // 设置图片格式
    updateImageExt (state, action) {
        state.imageExt = action
    },

    // 设置是否移动端状态
    updateMobileState (state, action) {
        state.isMobile = action
    },

    // 设置三栏页面结构
    updateThreeColumnsState (state, action) {
        state.isThreeColumns = action
    },

    // 设置两栏页面结构
    updateTwoColumnsState (state, action) {
        state.isTwoColumns = action
    },
}


export const getters = {
    theme: state => state.theme,
    isDarkTheme: state => state.theme === systemConstants.Theme.Dark,
    isMobile: state => state.isMobile,
    isEnLang: state => state.language === systemConstants.Language.En

}