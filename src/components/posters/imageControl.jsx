import React, {Component} from "react";
// import imageControlStyle from '@/pageStyle/posters/imageControl.less'
import {set,get} from "@/utils/immutable.js";
import {pxStringToNum,numToPxString} from '@/utils'
import {des} from '@/pageStyle/posters/control.less'
import {Radio} from 'antd';
const RadioGroup = Radio.Group;
// import classNames from 'classnames/bind';
// const fontClass = classNames.bind(fontControlStyle);
const imageTypeList = [
    {
        value:1,
        name:'图片'
    },
    {
        value:2,
        name:'背景'
    },
    {
        value:3,
        name:'头像'
    }
];
class ImageControl extends Component {  //class特性
    componentDidMount() {

    }
    getScaleHeight(width, height) {
        return 300 * height / width
    }
    handleChangeImageType(e){
        const props = this.props;
        const value = e.target.value;
        const list = set(props.postDataList,[props.postDataIndex,'imageType'], value);
        const componentStyle = get(list,[props.postDataIndex,'componentStyle']);
        const numWidth = pxStringToNum(componentStyle.width);
        const numHeight = pxStringToNum(componentStyle.height);
        const width=numToPxString(numWidth > 300 ? 300 : numWidth);
        const height = numToPxString(numWidth > 300 ? this.getScaleHeight(numWidth,numHeight) : numHeight);
        const newComponentStyle = {...componentStyle,borderRadius:value === 3?'100%':'0%',width:width,height:value === 3?width:height};
        const newList = set(list,[props.postDataIndex,'componentStyle'],newComponentStyle);
        props.handlePostDataAction(newList, props.postDataIndex);
    }
    render() {
        const props = this.props;
        const item = get(props.postDataList,[props.postDataIndex]);
        return (
            <div>
                <div>
                    <div className={des}>图片类型</div>
                    <div>
                        <RadioGroup onChange={this.handleChangeImageType.bind(this)} value={item.imageType}>
                            {imageTypeList.map((el, index) => <Radio key={index} value={el.value}>{el.name}</Radio>)}
                        </RadioGroup>
                    </div>
                </div>
            </div>
        )
    }
}

export default ImageControl
