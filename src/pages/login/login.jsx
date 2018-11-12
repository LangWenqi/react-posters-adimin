import React, {Component} from 'react'
import { Input, Button, message } from 'antd';
import {TokenKeys} from '@/common/js/variable'
import {login} from '@/api/apis/login'
import loginStyle from '@/pageStyle/login/login.less';
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            uid : 'admin',
            password : 'flame'
        };
        this.login = this.login.bind(this);
    }
    componentWillMount() {
        this.enterLogin();
    }
    componentWillUnmount(){
        this.clearEnter()
    }
    enterLogin(){
        document.onkeydown = (e) =>{
            if (e.keyCode === 13) {
                e.preventDefault();
                this.login();
            }
        }
    }
    setInputValue(key,e){
        const value = e.target.value;
        this.setState({
            [key]: value
        })
    }
    async login(){
        const res = await login({
            uid: this.state.uid,
            password: this.state.password
        });
        const {code, data} = res;
        if (code === 200){
            localStorage.setItem(TokenKeys.ACCESS_TOKEN, data);
            this.props.history.navigateTo({
                pathname: '/index'
            });
            message.success('登录成功');
        }else{
            message.error(res.msg);
        }
    }
    clearEnter(){
        document.onkeydown = null;
    }
    render() {
        return (
            <div className={loginStyle.container}>
                <div className={loginStyle.wrapper}>
                    <div className={loginStyle.item}>
                        系统登录
                    </div>
                    <div className={loginStyle.item}>
                        <Input placeholder="请输入账号" size="large" onChange={this.setInputValue.bind(this,'uid')} value = {this.state.uid}/>
                    </div>
                    <div className={loginStyle.item}>
                        <Input placeholder="请输入密码" size="large" type = "password" onChange={this.setInputValue.bind(this,'password')} value = {this.state.password}/>
                    </div>
                    <div className={loginStyle.item}>
                        <Button type="primary" block size="large" onClick={this.login}>登录</Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login    //模块导出


