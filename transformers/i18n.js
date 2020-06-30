function transform (config) {
    let languanges = config.languages.map(lang => lang.code)
    let data = config.data;
    let newData = {};

    function _trans (newObj, key, oldObj, lang) {
        for (let attr in oldObj) {
            let value = oldObj[attr];
            if (attr === lang) {
                newObj[key] = value;
            } else if (typeof value === "object") {
                let obj = newObj[key];
                if (!obj) {
                    obj = {}
                    newObj[key] = obj;
                }
                _trans(obj, attr, oldObj[attr], lang);
            }
        }
    }
    languanges.forEach(lang => {
        newData[lang] = {}
        for (let attr in data) {
            _trans(newData[lang], attr, data[attr], lang);
        }
    })
    return newData
}
export default transform;