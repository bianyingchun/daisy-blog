import marked from 'marked'
import Hljs from 'highlight.js'
// import 'highlight.js/styles/tomorrow.css'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight(code) {
    return Hljs.highlightAuto(code).value
  }
})


const renderer = new marked.Renderer()
// 段落解析

renderer.paragraph = text => `<p>${text}</p>`

// renderer.link = (href, title, text) => {

// }
// 代码解析器（行号处理）
renderer.code = function (code, lang, escaped) {
  if (this.options.highlight) {
    const out = this.options.highlight(code, lang)
    if (out != null && out !== code) {
      escaped = true
      code = out
    }
  }

  const lineNums = code
    .split('\n')
    .map((l, i) => `<li class="code-line-number">${i + 1}</li>`.replace(/\s+/g, ' '))
    .join('')

  const preHtml = lang
    ? `
        <pre data-lang="${lang}">
          <ul class="code-lines">${lineNums}</ul>
          <code class="${this.options.langPrefix}${escape(lang, true)}">${escaped ? code : escape(code, true)
    }\n</code>
        </pre>\n
      `
    : `
        <pre>
          <ul class="code-lines">${lineNums}</ul>
          <code>${escaped ? code : escape(code, true)}\n</code>
        </pre>
      `

  return preHtml
}
// 对图片进行弹窗处理
renderer.image = (src, title, alt) => {
  // 仅替换 HTTP 链接为 proxy
  // src = src.replace(/^http:\/\//gi, `${apiConfig.PROXY}/`)
  const imageHtml = `
      <img
        class="lozad"
        data-src="${src}"
        src="${src}"
        title="${title || alt || appConfig.meta.url}" 
        alt="${alt || title || src}"
        onclick="window.utils && window.utils.openImgPopup('${src}')"
      />
    `
  return imageHtml.replace(/\s+/g, ' ').replace(/\n/g, ' ')
}


export default (content) => {
  if (typeof content !== 'string') return ''
  return marked(content, { renderer })
}