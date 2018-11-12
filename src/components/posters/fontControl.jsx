import React, {Component} from "react";
import { SketchPicker } from 'react-color'
import {set,get} from "@/utils/immutable.js";
import fontControlStyle from '@/pageStyle/posters/fontControl.less'
import {des,color} from '@/pageStyle/posters/control.less'
// import classNames from 'classnames/bind';
import {Input,Select,Radio} from 'antd';
const RadioGroup = Radio.Group;
const {TextArea} = Input;
const Option = Select.Option;
const fontSizeList = [];
const fontWeightList = [
    {
        label:'普通',
        value:'normal'
    },
    {
        label:'加粗',
        value:'bolder'
    }
];
const setFontSize = (beginSize, endSize) => {
    for (let i = beginSize; i <= endSize; i=i+2) {
        fontSizeList.push(`${i}px`)
    }
};
setFontSize(12,48);
// const fontClass = classNames.bind(fontControlStyle);
class FontControl extends Component {  //class特性
    static defaultProps = {
        maxLength: 10000
    }
    componentDidMount() {

    }
    changeContent(e){
        this.doChange(e.target.value,['content']);
    }
    handleChangeFontSize(value) {
        this.doChange(value,['componentStyle','fontSize']);
    }
    doChange(value,paths=[]){
        const props = this.props;
        const list = set(props.postDataList,[props.postDataIndex,...paths], value);
        props.handlePostDataAction(list, props.postDataIndex);
    }
    handleColorChange(color, event){
        let rgba=Object.keys(color.rgb);
        rgba=rgba.map(el=>(color.rgb[el].toString()));
        rgba=rgba.join(',');
        const fontColor=`rgba(${rgba})`;
        this.doChange(fontColor,['componentStyle','color']);
    }
    handleChangeFontWeight(e){
        const value = e.target.value;
        this.doChange(value,['componentStyle','fontWeight']);
    }
    render() {
        const props = this.props;
        const item = get(props.postDataList,[props.postDataIndex]);
        return (
            <div>
                <div className={des}>文字内容</div>
                <TextArea placeholder="请输入文案内容" value={item.content} maxLength={props.maxLength}
                          onChange={this.changeContent.bind(this)}
                          autosize={{minRows: 2}}/>
                <div className={des}>字体大小</div>
                <Select
                    showSearch
                    allowClear
                    style={{width: '100%'}}
                    placeholder="请选择字体大小"
                    value={item.componentStyle.fontSize}
                    onChange={this.handleChangeFontSize.bind(this)}>
                    {fontSizeList.map((el,index)=><Option key={el} value={el}>{`${el}`}</Option>)}
                </Select>
                <div className={des}>字体加粗</div>
                <div>
                    <RadioGroup onChange={this.handleChangeFontWeight.bind(this)} value={item.componentStyle.fontWeight}>
                        {fontWeightList.map((el, index) => <Radio key={index} value={el.value}>{el.label}</Radio>)}
                    </RadioGroup>
                </div>
                <div className={des}>字体颜色</div>
                <div className={color} style={{background:item.componentStyle.color }}/>
                <div className={fontControlStyle.color}/>
                <SketchPicker color={ item.componentStyle.color } onChange={this.handleColorChange.bind(this)}/>
            </div>
        )
    }
}

export default FontControl
