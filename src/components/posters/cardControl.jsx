import React, {Component} from "react";
import cardControlStyle from '@/pageStyle/posters/cardControl.less'
import {des} from '@/pageStyle/posters/control.less'
import {set, get} from "@/utils/immutable.js";
import classNames from 'classnames/bind';
import {SketchPicker} from "react-color";
import {Radio} from "antd";

const RadioGroup = Radio.Group;
const cardClass = classNames.bind(cardControlStyle);
const cardList = [
    {
        name: '基础样式'
    }
];
const colorList = [
    {
        label: '背景颜色',
        value: 'background',
    },
    {
        label: '字体颜色',
        value: 'color',
    }
];

class CardControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorType: 'background'
        }
    }

    componentDidMount() {

    }

    handleColorType(e) {
        const type = e.target.value;
        this.setState({
            colorType: type
        });
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
        this.doChange(fontColor,['componentStyle',this.state.colorType]);
    }

    render() {
        const props = this.props;
        const item = get(props.postDataList, [props.postDataIndex]);
        const PikerColor = item.componentStyle[this.state.colorType];
        return (
            <div>
                <div className={des}>名片样式选择</div>
                <div className={des}>背景颜色</div>
                <RadioGroup onChange={this.handleColorType.bind(this)} value={this.state.colorType}>
                    {colorList.map((el, index) => <Radio key={index} value={el.value}>{el.label}</Radio>)}
                </RadioGroup>
                <div flex="wrap:wrap" className={cardControlStyle.wrapper}>
                    {cardList.map((el, index) => (
                        <div flex-box="0" className={cardControlStyle.item} key={index}>
                            <div className={cardClass({img: true, imgFocus: true})}
                                 style={{background: item.componentStyle[this.state.colorType]}}/>
                            <div className={cardClass({font: true, fontFocus: true})}>{el.name}</div>
                        </div>
                    ))}
                </div>
                <SketchPicker color={PikerColor} onChange={this.handleColorChange.bind(this)}/>
            </div>
        )
    }
}

export default CardControl
