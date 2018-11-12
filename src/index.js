import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import './common/css/flex.css';
import './common/css/main.less';
import './common/js/common'
import store from "@/redux/store";
import Rooter from '@/router'
import {LocaleProvider} from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import registerServiceWorker from './registerServiceWorker';
import { AppContainer } from 'react-hot-loader'; // 包裹根节点，想要渲染的内容
import {TokenKeys} from '@/common/js/variable'
import history from '@/history'
if(history.query.accessToken){
    localStorage.setItem(TokenKeys.ACCESS_TOKEN,decodeURIComponent(history.query.accessToken));
}
// import("./common/js/fontSize").then(({ initSize }) => {
//   initSize();
// });
const root = document.getElementById('root');
const Component = (props) => (
    <LocaleProvider locale={zhCN}>
        <Provider store={store}>
            <Rooter/>
        </Provider>
    </LocaleProvider>
);
const Parent = TokenKeys.PRODUCT_ENV === 'development'?AppContainer:React.Fragment;
const render = Component => {
    ReactDOM.render(
        <Parent>
            <Component/>
        </Parent>,
        root
    )
};
render(Component);
//热更新
if(module.hot&&TokenKeys.PRODUCT_ENV === 'development'){
    module.hot.accept(Component, () => {
        render(Component)
    });
}
registerServiceWorker();

