import Vue from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/tomorrow.css'
// 自定义样式文件
// import "~/assets/style/code.css";
Vue.directive('highlight', el => {
    let blocks = el.querySelectorAll('pre code')
    blocks.forEach(block => {
        hljs.highlightBlock(block)
    })
})
