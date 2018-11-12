import React, {Component} from 'react'   //模块引入
// import history from '@/history/history';
import history from '@/history';
import { SketchPicker } from 'react-color'
import {title} from '@/pageStyle/bbb.less'
import UpFile from '@/components/upfile/upfile'
import classNames from 'classnames/bind';
import styles from './submit-button.css';
let cx = classNames.bind(styles);
class Index extends Component {  //class特性
    constructor(props) {
        super(props);
        this.state = {
            value: 'langwenqi',
            bgColor:'rgba(255,255,255,1)'
        };
    }

    componentDidMount() {
        // console.log(this.props.match);
        // console.log(this.props.location);
        // console.log(history.location);
    }

    to(url, e) {
        console.log(e)
        //全局路由跳转
        history.push({
            pathname: url,
            search: '?sort=name',
            state: {
                aaa: 111,
                bbb: 222
            }
        })
        // this.props.history.push( {pathname: url,
        // 	search: '?sort=name',
        // 	state:{
        // 	  aaa:111,
        // 	  bbb:222
        // 	}
        //   })
    }
    aaa(url) {
        //自己封装全局路由跳转
        // history.navigateTo({
        //     pathname: '/index/1',
        //     // search: '?sort=name',
        //     state: {
        //         aaa: 111,
        //         bbb: 222
        //     },
        //     query: {
        //         a: 1
        //     }
        // })
        this.props.history.navigateTo({
            pathname: '/index/1',
            // search: '?sort=name',
            state: {
                aaa: 111,
                bbb: 222
            },
            query: {
                a: 1
            }
        })
    }
    changeInput(){
        this.setState({
            value:this.input.value
        },function () {
            console.log(this.state.value)
        })
    }
    handleColorChange(color, event){
        let rgba=Object.keys(color.rgb);
        rgba=rgba.map(el=>(color.rgb[el].toString()));
        rgba=rgba.join(',');
        this.setState({
            bgColor:`rgba(${rgba})`
        })
    }
    render() {
        // https://github.com/JedWatson/classnames
        var btnClass = classNames({
            btn: true,
            'btn-pressed': this.state.isPressed,
            'btn-over': !this.state.isPressed && this.state.isHovered
        });
        let className = cx({
            base: true,
            inProgress: this.props.store.submissionInProgress,
            error: this.props.store.errorOccurred,
            disabled: this.props.form.valid,
        });
        //以下用了箭头函数
        return (
            <div className="red">
                <div>
                    {React.Children.map(this.props.children,el=>el.props.slot==='a'?el:null)}
                </div>
                <SketchPicker color={ this.state.bgColor } onChange={this.handleColorChange.bind(this)}/>
                <div style={{background:this.state.bgColor}}> index page</div>
                <div>{this.value}</div>
                <input type="text" style={{"border":"1px solid red"}} onChange={this.changeInput.bind(this)} ref={(e)=>this.input=e} value={this.state.value}/>
                {/*<input type="text" style={{"border":"1px solid red"}} onChange={this.changeInput.bind(this)} ref={(input)=>{this.textInput=input}} value={this.value}/>*/}
                <div className={title} onClick={(e) => this.to('/bbb', e)}>/bbb</div>
                <img src={require('../images/posters/logo.png')} alt=""/>
                <div onClick={(e) => this.to('/index/ccc', e)} dangerouslySetInnerHTML={{
                    __html: this.state.value
                }}/>
                <div onClick={(e) => this.to(`/index/aaa`, e)}>/index/aaa</div>
                <UpFile/>
                {this.props.children}
            </div>
        )
    }
}

export default Index    //模块导出
