import musicPlayerTemplate from './index.vue'

//返回一个实例创建的构造器，但实例构造器需要进行挂载到页面中
export default {
    install(Vue) {
        let musicPlayerConstructor = Vue.extend(musicPlayerTemplate)
        const instance = new musicPlayerConstructor({
            el: document.createElement('div'),
            store: store
        });
        document.body.appendChild(instance.$el)
        Vue.prototype.$musicPlayer = instance
    }
}
