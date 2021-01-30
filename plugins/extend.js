import Vue from 'vue';
import moment from 'moment'

import i18nConfig from '~/config/i18n.config'
import i18nTransform from '~/transformers/i18n'

import NoData from '~/components/common/no-data'
import Loading from "~/components/common/loading"
import NoMore from "~/components/common/no-more"
import Skeleton from "~/components/common/skeleton"

const i18nData = i18nTransform(i18nConfig);

moment.locale('zh-cn')

Vue.filter('dateFormat', (dataStr, pattern = "YYYY-MM-DD") => {
    return moment(dataStr).format(pattern)
})
//mixin
Vue.mixin({
    computed: {
        $i18n() {
            return i18nData[this.$store.state.global.language]
        }
    }
})

//components
Vue.component('no-data', NoData)
Vue.component('loading', Loading)
Vue.component('no-more', NoMore)

Vue.use(Skeleton)