
import fetch from "../request";
export const savePoster=(params)=> {
    return fetch('/poster/save',params,{method:'POST'})
};
export const getPosterDetail=(params)=> {
    return fetch('/poster/getDetail',params,{method:'GET'})
};
export const getPosterList=(params)=> {
    return fetch('/poster/pageByQuery',params,{method:'POST'})
};
