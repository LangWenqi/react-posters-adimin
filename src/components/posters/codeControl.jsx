import React, {Component} from "react";
// import codeControlStyle from '@/pageStyle/posters/codeControl.less'
import {des} from '@/pageStyle/posters/control.less'
import {set,get} from "@/utils/immutable.js";
import {numToPxString} from '@/utils'
// import classNames from 'classnames/bind';
import {Radio} from "antd";
const RadioGroup = Radio.Group;
// const codeClass = classNames.bind(codeControlStyle);
const codeList = [
    {
        label: '小程序码',
        type: 1
    },
    // {
    //     label: '二维码',
    //     type: 2
    // }
];

class CodeControl extends Component {  //class特性
    componentDidMount() {

    }
    handleTypeChange (e) {
        const type = e.target.value;
        const props = this.props;
        const list = set(props.postDataList,[props.postDataIndex,'type'],type);
        const border = numToPxString(type===1?100:0,'%',1);
        const newList = set(list,[props.postDataIndex,'componentStyle','borderRadius'],border);
        props.handlePostDataAction(newList, props.postDataIndex);
    }
    render() {
        const props = this.props;
        const item = get(props.postDataList,[props.postDataIndex]);
        return (
            <div>
                <div className={des}>名片样式选择</div>
                <div>
                    <RadioGroup onChange={this.handleTypeChange.bind(this)} value={item.type}>
                        {codeList.map((el, index) => <Radio key={index} value={el.type}>{el.label}</Radio>)}
                    </RadioGroup>
                </div>

            </div>
        )
    }
}

export default CodeControl
