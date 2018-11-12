import fetch from "../request";

export const getOssToken=(params)=> {
    return fetch('/oss/token',params,{method:'POST'})
};
