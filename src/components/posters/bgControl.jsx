import React, {Component} from "react";
import { SketchPicker } from 'react-color'
import { InputNumber } from 'antd';
import {pxStringToNum,numToPxString} from '@/utils'
import {set,get} from "@/utils/immutable.js";
// import bgControlStyle from '@/pageStyle/posters/bgControl.less'
import {des,color} from '@/pageStyle/posters/control.less'
// import classNames from 'classnames/bind';
// const bgClass = classNames.bind(bgControlStyle);

const defaultHeight = 667;
class BgControl extends Component {
    constructor(props){
        super(props);
        this.state = {
            height:667
        }
    }
    componentWillMount() {
        this.initHeight()
    }
    initHeight(){
        const props = this.props;
        const height = get(props.postDataList,[props.postDataIndex,'componentStyle','height']);
        this.handleHeightChange(pxStringToNum(height));
        this.setState({
            height
        })

    }
    doChange(key,value){
        const props = this.props;
        const list = set(props.postDataList,[props.postDataIndex,'componentStyle',key],value);
        props.handlePostDataAction(list, props.postDataIndex);
    }
    handleColorChange(color){
        let rgba=Object.keys(color.rgb);
        rgba=rgba.map(el=>(color.rgb[el].toString()));
        rgba=rgba.join(',');
        let bgColor = `rgba(${rgba})`;
        this.doChange('background',bgColor)
    }
    handleHeightChange(value){
        this.setState({height:value});
        if(value < defaultHeight)return;
        const props = this.props;
        this.doChange('height',numToPxString(value));
        props.handlePostHeightAction(value);
    }
    render() {
        const props = this.props;
        const item = get(props.postDataList,[props.postDataIndex]);
        return (
            <div>
                <div className={des}>背景高度</div>
                <div>
                    <InputNumber min={defaultHeight}  defaultValue={defaultHeight} value={this.state.height} onChange={this.handleHeightChange.bind(this)} />
                </div>
                <div className={des}>背景颜色</div>
                <div className={color} style={{background:item.componentStyle.background}}/>
                <SketchPicker color={ item.componentStyle.background }onChange={this.handleColorChange.bind(this)}/>
            </div>
        )
    }
}

export default BgControl
