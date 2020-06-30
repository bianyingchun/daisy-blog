import API from '../config/api.config';

export default function ({ redirect, app }, inject) {
    // 数据访问前缀
    app.$axios.defaults.baseURL = API.BASE;
    if (process.server) {
        // 获取服务端的token
        // var token = getCookie.getcookiesInServer(req).token;
    }
    if (process.client) {
        // 获取客户端token
        // var token = getCookie.getcookiesInClient('token');
    }
    // request拦截器
    app.$axios.onRequest(config => {
        // console.log(config, 'request')
        if (process.client) {
            // 客户端下，请求进度条开始
            // NProgress.start();
        }
        // 将获取到token加入到请求头中
        // config.headers.common['Authorization'] = token;
    });
    // response拦截器，数据返回后，可以先在这里进行一个简单的判断
    app.$axios.interceptors.response.use(
        response => {
            // console.log(response, 'res')
            if (process.client) {
                // 客户端下， 请求进度条结束
                // NProgress.done();
            }
            // return response
            if (response.data.code == 401) {
                // 返回401，token验证失败，清除客户端cookie
                // Cookie.remove("token");
                // // 重定向到登录页面， 这里做一个判断，容错：req.url 未定义
                // if (req.url) {
                //     redirect("/sign?ref=" + req.url)
                // } else {
                //     redirect("/sign")
                // }
            } else if (response.data.code == 404) {
                // 重定向到404页面
                redirect("/")
            }
            else {
                // 请求接口数据正常，返回数据
                return response
            }
        },
        error => {
            if (process.client) {
                // NProgress.done();
            }
            if (error.response.status == 500) {
                // http状态500，服务器内部错误，重定向到500页面
                redirect("/500.html")
            }
            if (error.response.status == 404) {
                // http状态500，请求API找不到，重定向到404页面
                redirect("/404.html")
            }
            return Promise.reject(error.response)   // 返回接口返回的错误信息
        })
    // 注入到context.app.$request中
    const request = async (url, method, data = {}) => {
        if (method === 'get') {
            return app.$axios.$get(url, { params: data })
        } else {
            return app.$axios.$post(url, data)
        }
    }
    inject('request', request)
}
