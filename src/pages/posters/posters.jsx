import React, {Component} from 'react'
import classNames from 'classnames/bind';
import postersStyle from '@/pageStyle/posters/posters.less';
import Header from '@/components/posters/header'
// import List from '@/components/posters/list'
import Control from '@/components/posters/control'
import Model from '@/components/posters/model'
import {getPosterDetail} from "@/api/apis/posters";
import {PostersConnect} from '@/utils/posters/redux'
import {message} from "antd";
const postersClass = classNames.bind(postersStyle);
const container = postersClass('position', 'container');

class Posters extends Component {  //class特性
    constructor(props) {
        super(props);
        this.state = {
            value: 'langwenqi',
            bgColor: 'rgba(255,255,255,1)'
        };
    }
    componentWillMount() {
        this.clearData();
        this.getPosterDetail();
    }
    componentWillUnmount(){
        this.clearData();
    }
    async getPosterDetail(){
        const props =this.props;
        const id = props.match.params.id;
        if(id === '0')return;
        let params = {
            id: parseInt(id,10)
        };
        const res = await getPosterDetail(params);
        const {code,data} = res;
        if (code === 200){
            this.setData(data)
        }else{
            message.error(res.msg);
        }
    }
    setData(data){
        const props = this.props;
        const styleDetail = JSON.parse(data.styleDetail);
        props.handlePostDataAction(styleDetail.postDataList, -1);
        props.handlePostHeightAction(styleDetail.postHeight);
        props.handlePostTitleAction(data.posterName);
        props.handlePostImageAction(data.templateUrl);
    }
    clearData(){
        const props = this.props;
        props.handlePostDataAction([], -1);
        props.handlePostHeightAction(667);
        props.handlePostTitleAction('');
        props.handlePostImageAction('');
    }
    render() {
        const props = this.props;
        return [
            <div key="container" className={container}>
                <Header {...props}/>
                <div className="container" flex="">
                    {/*<List flex-box="0" {...props}/>*/}
                    <div flex-box="1" className="container">
                        <Model {...props}/>
                    </div>
                    <Control {...props}/>
                </div>
            </div>
        ]
    }
}

export default PostersConnect(Posters)


