import parser from 'ua-parser-js'

const uaParser = (userAgent = '') => {
    const result = parser(userAgent);
    const browserName = result.browser.name.toLowerCase();
    const isBrowser = (browsers) => {
        return browsers.some(browser => browser.toLowerCase === browserName)
    }
    return {
        result,
        isIE: isBrowser(['compatible', 'MSIE', 'IE']),
        isEdge: isBrowser(['Edge']),
        isFirefox: isBrowser(['Firefox']),
        isChrome: isBrowser(['Chrome', 'Chromium']),
        isSafari: isBrowser(['Safari']),
        isWechat: isBrowser(['Wechat']),
        isIos: result.os.name === 'iOS',
        isAndroid: result.os.name === 'Android',
        isMobile: result.device.type === 'mobile'
    }
}
export default uaParser