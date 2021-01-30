import Vue from 'vue'
import imgPopupTemplate from './index.vue'
import { isBrowser } from '~/environment'
let imgPopupConstructor = Vue.extend(imgPopupTemplate)   //返回一个实例创建的构造器，但实例构造器需要进行挂载到页面中

let openImgPopup = function (src) {
    if (!isBrowser) return;
    let popupDom = new imgPopupConstructor({
        el: document.createElement('div'),
        data: {
            src,
            showFlag: true
        }
    })
    document.body.appendChild(popupDom.$el)
    //将需要传入的文本内容传给组件实例
    popupDom.close = () => {
        popupDom.showFlag = false;
    }
}
export default {
    install (Vue) {
        Vue.openImgPopup = openImgPopup
        Vue.$openImgPopup = openImgPopup
        window.utils = window.utils ? window.utils : {};
        window.utils.openImgPopup = openImgPopup
    }
}
