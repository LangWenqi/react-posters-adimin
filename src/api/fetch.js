//兼容node环境的fetch请求，脚手架对fetch和Promose低版本兼容已经在polyfills.js中兼容过
import fetchBase from "isomorphic-fetch";
import {qs} from '@/utils'
import {deepExtend} from '@/utils/object'

//fetch没有timeout时间利用一个setTimeout的Promise对象和Promise.race模拟超时，但是如果过了超时时间请求成功比较尴尬
function fetch_timeout(fetch_promise, timeout = 10000) {
    let abort_fn = null;
    let abort_promise = new Promise((resolve, reject) => {
        abort_fn = function () {
            reject({msg:'abort promise'});
        };
    });
    let abortable_promise = Promise.race([
        fetch_promise,
        abort_promise
    ]);
    setTimeout(function () {
        abort_fn();
    }, timeout);

    return abortable_promise;
}

export function fetch_base(url, params = {}, options = {}) {
    let method = options.method ? options.method.toUpperCase() : "GET";
    let cache = options.cache || 'no-cache';
    let credentials = options.credentials || 'include';
    let headers = {
        "Content-Type": method === 'POST' ? 'application/json' : "application/x-www-form-urlencoded",
        'Cache-Control': 'no-cache'
    };
    headers = deepExtend(headers, options.headers);
    let requestUrl = url;
    let data = {
        cache: cache,
        credentials: credentials,//omit(默认)
        method: method,
        headers: headers,
    };
    if (/GET/i.test(method)) {
        if (Object.keys(params).length > 0) {
            requestUrl = `${url}?${qs.stringify(params)}`;
        }
    } else {
        switch (headers["Content-Type"]) {
            case "application/x-www-form-urlencoded":
                data.body = qs.stringify(params);
                break;
            case "application/json":
                data.body = JSON.stringify(params);
                break;
            default:
                data.body = params;
                break;
        }
    }
    return fetch_timeout(fetchBase((options.baseUrl && !options.ignoreBaseUrl ? options.baseUrl : '') + requestUrl, data), options.timeout).then(response => {
        if (options.raw) {
            return response.text();
        } else {
          return  response.json().then(res => {
                switch (res.code) {
                    case 200:
                        break;
                    default:
                        console.log(res);
                        break;
                }
                return res;
            });
        }
    }).catch(err=>{
        console.log(err);
        return err;
    })
}

export function fetch_create(opt = {}) {
    return function (url, params = {}, options = {}) {
        let newOptions = deepExtend(opt, options);
        return fetch_base(url, params, newOptions)
    }
}
