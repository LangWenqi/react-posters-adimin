import fetch from "../request";

export const login=(params)=> {
    return fetch('/login',params,{method:'POST'})
};
