import React, {Component} from "react";
import listStyle from '@/pageStyle/posters/list.less';
import classNames from 'classnames/bind';
const listClass = classNames.bind(listStyle);
const container=listClass('listContainer','container');
class List extends Component {  //class特性
    componentDidMount() {

    }
    render() {
        //以下用了箭头函数
        return (
            <div className={container}>
                <div className={listStyle.title}>海报列表</div>
                {/*<div className={list}></div>*/}
            </div>
        )
    }
}

export default List
