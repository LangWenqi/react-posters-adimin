import React, {Component} from "react";
import imageControlStyle from '@/pageStyle/posters/imageControl.less'
import {set,get} from "@/utils/immutable.js";
import {pxStringToNum,numToPxString} from '@/utils'
import {des} from '@/pageStyle/posters/control.less'
import { Slider } from 'antd';
// import classNames from 'classnames/bind';
// const fontClass = classNames.bind(fontControlStyle);
class ImageControl extends Component {  //class特性
    componentDidMount() {

    }
    handleChangeBorderRadius(value){
        const props = this.props;
        const list = set(props.postDataList,[props.postDataIndex,'componentStyle','borderRadius'], numToPxString(value,'%',1));
        props.handlePostDataAction(list, props.postDataIndex);
    }
    render() {
        const props = this.props;
        const item = get(props.postDataList,[props.postDataIndex]);
        const value = pxStringToNum(item.componentStyle.borderRadius,'%',1);
        return (
            <div>
                <div className={des}>圆角度数</div>
                <div  flex="cross:center">
                    <Slider
                        min={0}
                        max={50}
                        style={{width:'80%'}}
                        onChange={this.handleChangeBorderRadius.bind(this)}
                        value={item.componentStyle.borderRadius ? value : 0}
                    />
                    <div className={imageControlStyle.sliderNumber}>{value}</div>
                </div>
            </div>
        )
    }
}

export default ImageControl
