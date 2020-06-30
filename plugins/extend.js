import i18nConfig from '~/config/i18n.config'
import i18nTransform from '~/transformers/i18n'
const i18nData = i18nTransform(i18nConfig);

Vue.mixin({
    computed: {
        $18n () {
            return i18nData[this.$store.state.global.language]
        }
    }
})