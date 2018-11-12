import fetchRequest from './config'
import {TokenKeys} from '@/common/js/variable'
import {deepExtend} from '@/utils/object'
import {message} from 'antd';
import history from '@/history'
function fetch(url, params, options) {
    let headers={
        [TokenKeys.ACCESS_TOKEN]:localStorage.getItem(TokenKeys.ACCESS_TOKEN)||null
    };
    let newOptions=deepExtend({headers},options);

    return fetchRequest(url, params, newOptions).then(res=>{
        const {code} = res;
        if ([10002, 10004].indexOf(code)>-1) {
            if(localStorage.getItem(TokenKeys.ACCESS_TOKEN)){
                message.error(code === 10004?'用户不存在':'登录过期，请重新登录');
            }
            localStorage.setItem(TokenKeys.ACCESS_TOKEN,'');
            history.redirectTo({pathname:'/login'});
        }
        return res
    }).catch(res=>res);
}
export default fetch
