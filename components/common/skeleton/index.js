import Base from './base'
import Line from './line'
import Paragraph from './paragraph'

export default {
    install (Vue) {
        Vue.component('SkeletonBase', Base);
        Vue.component('SkeletonLine', Line);
        Vue.component('SkeletonParagraph', Paragraph)
    }
}