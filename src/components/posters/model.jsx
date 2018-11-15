import React, {Component} from 'react'
import {pxStringToNum,numToPxString} from '@/utils'
import modelStyle from '@/pageStyle/posters/model.less';
import {modelComponents} from '@/utils/posters/components'
import Dragger from '@/components/dragger/dragger'
import Scale from '@/components/scale/scale'
import {set,get,splice} from "@/utils/immutable.js";
// import classNames from 'classnames/bind';
// const modelClass = classNames.bind(modelStyle);
const refArr=[];
class Model extends Component {
    componentDidMount() {

    }
    componentDidUpdate(){

    }
    handleDragComponentStyle(data){
        const props = this.props;
        let obj = {left: numToPxString(data.left), top: numToPxString(data.top)};
        if(props.postDataList[props.postDataIndex].componentName==='Font'){
            obj.maxWidth = numToPxString(props.postWidth - data.left);
        }
        const list = set(props.postDataList,[props.postDataIndex,'componentStyle'],{...get(props.postDataList,[props.postDataIndex,'componentStyle']),...obj});
        props.handlePostDataAction(list, props.postDataIndex);
    }
    handleScaleComponentStyle(data) {
        const props = this.props;
        const obj = {
            width:`${data.width}px`,
            height:`${data.height}px`
        };
        const list = set(props.postDataList, [props.postDataIndex, 'componentStyle'], {...get(props.postDataList, [props.postDataIndex, 'componentStyle']), ...obj});
        props.handlePostDataAction(list, props.postDataIndex);
    }
    setPostDataIndex(index){
        const props = this.props;
        props.handlePostDataAction(props.postDataList, index);
    }
    deletePostData(index,e){
        e.stopPropagation();
        const props = this.props;
        if(props.postDataList[index].componentName==='Bg'){
            props.handlePostHeightAction(props.defaultHeight);
        }
        const list = splice(props.postDataList, index);
        props.handlePostDataAction(list, -1);
    }
    render() {
        const props = this.props;
        return (
            <div className={modelStyle.container}>
                <div className={modelStyle.title}>海报展示</div>
                <div className={modelStyle.wrapper} style={{height:props.postHeight}}>
                    {props.postDataList.map((el, index) => {
                        const ModelComponent = modelComponents[`${el.componentName}Model`];
                        return <Dragger noDrag={el.noDrag||(index !== props.postDataIndex)} ref={(e)=>refArr[index]=e}
                                    dragPosition={el.componentStyle.position}
                                    dragZIndex={el.componentStyle.zIndex}
                                    dragEnd={this.handleDragComponentStyle.bind(this)}
                                    top={pxStringToNum(el.componentStyle.top)}
                                    left={pxStringToNum(el.componentStyle.left)} right={props.postWidth} bottom={props.postHeight}
                                    key={el.key}>
                                    <Scale  key={el.key} setClick={()=>this.setPostDataIndex(index)}
                                        setDelete={(e)=>this.deletePostData(index,e)}
                                        handleScaleStyle={this.handleScaleComponentStyle.bind(this)}
                                        ifScale={el.ifScale&&index === props.postDataIndex}
                                        ifDelete={index === props.postDataIndex}
                                        top={pxStringToNum(el.componentStyle.top)}
                                        width={pxStringToNum(el.componentStyle.width)}
                                        height={pxStringToNum(el.componentStyle.height)}
                                        left={pxStringToNum(el.componentStyle.left)} right={props.postWidth} bottom={props.postHeight}>
                                        <ModelComponent {...props} item={el} key={el.key}/>
                                    </Scale>
                                </Dragger>
                    })}
                </div>
            </div>
        )
    }
}

export default Model


