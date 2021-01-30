import musicPlayerTemplate from '~/components/common/music-player/index.vue'
import Vue from 'vue';
export default ({ store, app }, inject) => {
    let instance = null
    inject('musicPlayer', () => {
        if (!instance) {
            let musicPlayerConstructor = Vue.extend(musicPlayerTemplate)
            instance = new musicPlayerConstructor({
                el: document.createElement('div'),
                store: store
            });
            document.body.appendChild(instance.$el)
        }
        return instance
    })
    // Vue.use(install)
}