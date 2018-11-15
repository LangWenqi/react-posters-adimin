
import React, {Component} from "react";
import {controlComponents} from '@/utils/posters/components'
import UpFile from '@/components/upfile/upfile'
import controlStyle from '@/pageStyle/posters/control.less'
import classNames from 'classnames/bind';
import {set} from "@/utils/immutable.js";
import {pxStringToNum,numToPxString} from '@/utils'
import {Input, InputNumber} from "antd";
import {div} from "../../utils";
const controlClass = classNames.bind(controlStyle);
const container=controlClass('controlContainer','container');
const acceptstr = 'image/png,image/jpg,image/jpeg';
class Control extends Component {
    constructor(props){
        super(props);
        this.state={
            width:0,
            height:0,
            top:0,
            left:0
        }
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps){

    }
    handleChangeZIndex(value){
        const props = this.props;
        const newValue = value || 1;
        const list = set(props.postDataList,[props.postDataIndex,'componentStyle','zIndex'],numToPxString(newValue,''));
        props.handlePostDataAction(list, props.postDataIndex);
    }
    uploading(loading) {
        console.log(loading)
    }

    uploadsuccess(file, result, type) {
        const props = this.props;
        props.handlePostImageAction(result.name);
    }
    setPosterTitle(e){
        const props = this.props;
        const value = e.target.value;
        props.handlePostTitleAction(value);
    }
    handleNumber(value,key,min,max){
        const props = this.props;
        const newValue = value || 1;
        const list = set(props.postDataList,[props.postDataIndex,'componentStyle','zIndex'],numToPxString(newValue,''));
        props.handlePostDataAction(list, props.postDataIndex);
    }
    getPosition(){
        // const {postWidth,postHeight,componentStyle,position}=this.props;
        // if(!position){
        //     return{}
        // }

    }
    getSize(){
        // const {postWidth,postHeight,componentStyle,size,postDataIndex,postDataList}=this.props;
        // if(!size){
        //     return{
        //         minLeft:0,
        //         minTop:0,
        //         maxLeft:0,
        //         maxTop:0,
        //     }
        // }
        // const left = pxStringToNum(componentStyle.left);
        // const top = pxStringToNum(componentStyle.top);
        // const width = pxStringToNum(componentStyle.width);
        // const height = pxStringToNum(componentStyle.height);
        // const scale=height/width;
        // const minHeight=10;
        // const minWith=minHeight*scale;
        // let maxWidth,maxHeight;
        // if (left + width > postWidth) {
        //     maxWidth = postWidth - left;
        //     maxHeight = maxWidth / scale;
        // }
        // if (top + height > postHeight) {
        //     maxHeight = postHeight - top;
        //     maxWidth = maxHeight * scale;
        // }
        // return {
        //     maxWidth,
        //     maxHeight,
        //     minHeight,
        //     minWith
        // }
    }
    render() {
        const props = this.props;
        const {postDataIndex,postDataList} = props;
        const postItem = postDataList && postDataList.length>0 ? postDataList[postDataIndex] :null;
        const ControlComponent = postItem ? controlComponents[`${postItem.componentName}Control`] : null;
        const zIndexValue = postItem?pxStringToNum(postItem.componentStyle.zIndex) : 1;
        const top = postItem&&postItem.position?pxStringToNum(postItem.componentStyle.top) : 0;
        const left = postItem&&postItem.position?pxStringToNum(postItem.componentStyle.left) : 0;
        const width = postItem&&postItem.size?pxStringToNum(postItem.componentStyle.width) : 0;
        const height = postItem&&postItem.size?pxStringToNum(postItem.componentStyle.height) : 0;
        return (
            <div className={container}>
                <div className={controlStyle.title}>海报标题</div>
                <Input placeholder="请输入海报标题" maxLength={9} onChange={this.setPosterTitle.bind(this)} value = {props.postTitle}/>
                <div className={controlStyle.title}>海报封面</div>
                <UpFile uploading={this.uploading.bind(this)}
                        uploadsuccess={this.uploadsuccess.bind(this)}
                        acceptstr={acceptstr} fileclassname={controlStyle.upFile}>
                        {props.postImage? <div className={controlStyle.imgWrapper}>
                                            <img className={controlStyle.img} src={props.postImage} alt=""/>
                                          </div>:null}
                        </UpFile>
                <div className={controlStyle.title}>内容样式编辑器</div>
                {
                    ControlComponent?<div>
                        <div className={controlStyle.des}>定位层级</div>
                        <div>
                            <InputNumber min={1} max={999} maxLength={3} defaultValue={1} value={zIndexValue} onChange={this.handleChangeZIndex.bind(this)} />
                        </div>
                        {postItem.position?(<div>
                            <div className={controlStyle.des}>坐标</div>
                            <div flex="cross:center" className={controlStyle.wrapper}>
                                <div className={controlStyle.font}>上：</div>
                                <InputNumber  value={top} disabled/>
                            </div>
                            <div flex="cross:center" className={controlStyle.wrapper}>
                                <div className={controlStyle.font}>左：</div>
                                <InputNumber  value={left} disabled/>
                            </div>
                        </div>):null}
                        {postItem.size?(<div>
                            <div className={controlStyle.des}>尺寸</div>
                            <div flex="cross:center" className={controlStyle.wrapper}>
                                <div className={controlStyle.font}>宽：</div>
                                <InputNumber  value={width} disabled/>
                            </div>
                            <div flex="cross:center" className={controlStyle.wrapper}>
                                <div className={controlStyle.font}>高：</div>
                                <InputNumber  value={height} disabled/>
                            </div>
                        </div>):null}

                    </div>:null
                }
                {ControlComponent ? <ControlComponent {...props} /> : null}
            </div>
        )
    }
}

export default Control
