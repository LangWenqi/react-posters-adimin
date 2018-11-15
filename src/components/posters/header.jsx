import React, {Component} from "react";
import {Button, message, Modal} from 'antd';
import {splice} from "@/utils/immutable.js";
import {numToPxString} from '@/utils'
import UpFile from '@/components/upfile/upfile'
import headerStyle from '@/pageStyle/posters/header.less';
import {headerList} from '@/utils/posters/components'
import {savePoster} from "@/api/apis/posters";
const Confirm = Modal.confirm;
const acceptstr = 'image/png,image/jpg,image/jpeg';
let posterId = '0';
let canSave = true;
class Header extends Component {  //class特性
    componentWillMount() {
        this.initPosterId();
    }
    initPosterId(){
        posterId = this.props.match.params.id;
        console.log('posterId:',posterId);
    }
    showConfirm() {
        const that = this;
        Confirm({
            title: '提示',
            content: '是否保存该海报',
            onOk() {
                that.savePoster();
            },
            onCancel() {
            },
        });
    }
    clearData(){
        const props = this.props;
        props.handlePostDataAction([], -1);
        props.handlePostHeightAction(props.defaultHeight);
        props.handlePostTitleAction('');
        props.handlePostImageAction('');
    }
    checkSave(){
        const props = this.props;
        if(props.postTitle.trim()===''){
            message.error('请编辑海报标题');
            return false;
        }
        if(!props.postImage){
            message.error('请编辑海报封面');
            return false;
        }
        if(props.postDataList&&props.postDataList.length<=0){
            message.error('请编辑海报内容');
            return false;
        }
        return true;
    }
    async savePoster(){
        if(!canSave)return;
        if(!this.checkSave())return;
        canSave = false;
        const props = this.props;
        let styleDetail = {
            postWidth:props.postWidth,
            postHeight:props.postHeight,
        };
        const postDataList = [...props.postDataList].sort((a,b)=>(a.componentStyle.zIndex-b.componentStyle.zIndex));
        styleDetail.postDataList = postDataList;
        let params = {
            posterName:props.postTitle,
            styleDetail:JSON.stringify(styleDetail),
            templateUrl:props.postImage
        };
        if(posterId && posterId !== '0'){
            params.id = parseInt(posterId,10);
        }
        const res = await savePoster(params);
        const {code} = res;
        if (code === 200){
            if(posterId && posterId === '0'){
                this.clearData();
            }
            message.success('保存成功');
        }else{
            message.error(res.msg);
        }
        canSave = true;
    }
    uploading(loading, componentName) {
        console.log(loading, componentName)
    }

    uploadsuccess(file, result, type, componentName) {
        let img = new Image();
        img.onload = () => {
            this.setPostData(this[`make${componentName}PostData`]({img, componentName}));
            img = null
        };
        img.src = result.name;
    }
    setDataFuc(data){
        switch (data.componentName) {
            case 'Bg':
                this.setBgPostData(this.makeBgPostData(data));
                break;
            case 'Image':
                break;
            default:
                this.setPostData(this[`make${data.componentName}PostData`](data));
                break;
        }
    }
    setBgPostData(data) {
        const props = this.props;
        const item=props.postDataList[0]?props.postDataList[0]:{};
        const ifSplice=item.componentName==='Bg';
        const list = ifSplice ? props.postDataList : splice(props.postDataList, 0, 0, [], data);
        props.handlePostDataAction(list, 0);
    }
    makeBgPostData(data){
        const props = this.props;
        const componentStyle = {
            width:numToPxString(props.postWidth),
            height:numToPxString(props.defaultHeight),
            position: 'relative',
            zIndex:`1`,
            overflow:'hidden',
            minHeight:'100%',
            background:'#fff'
        };
        return {
            componentStyle,
            url: '',
            componentName: data.componentName,
            key: new Date().getTime(),
            noDrag:true,
            position:false,
            size:false
        }
    }
    setPostData(data) {
        const props = this.props;
        const list = splice(props.postDataList, props.postDataList.length, 0, [], data);
        props.handlePostDataAction(list, list.length - 1);
    }

    getScaleHeight(width, height) {
        return 300 * height / width
    }
    makeCardPostData(data){
        const props = this.props;
        const componentStyle = {
            background: 'rgba(0,0,0,0.5)',
            color:'#fff',
            width:numToPxString(props.postWidth),
            height:numToPxString(115),
            top:numToPxString(0),
            left:numToPxString(0),
            zIndex:`1`,
            position:'absolute'
        };
        return {
            componentStyle,
            componentName: data.componentName,
            key: new Date().getTime(),
            position:true,
            type:1
        }
    }
    makeFontPostData(data = {}){
        const componentStyle = {
            display:'inline-block',
            position: 'absolute',
            left:numToPxString(0),
            top:numToPxString(0),
            zIndex:`1`,
            fontSize:'16px',
            color:'rgba(0,0,0,1)',
            fontWeight:'normal',
            textAlign:'justify',
            maxWidth:'375px'
        };
        return {
            componentStyle,
            componentName: data.componentName,
            key: new Date().getTime(),
            position:true,
            content:'请输入内容'
        }
    }
    makeImagePostData(data = {}) {
        const componentStyle = {
            width:numToPxString(data.img.width > 300 ? 300 : data.img.width),
            height:numToPxString(data.img.width > 300 ? this.getScaleHeight(data.img.width, data.img.height) : data.img.height),
            position: 'absolute',
            left:numToPxString(0),
            top:numToPxString(0),
            zIndex:`1`,
            borderRadius:numToPxString(0,'%',1)
        };
        return {
            componentStyle,
            url: data.img.src,
            componentName: data.componentName,
            key: new Date().getTime(),
            ifScale:1,
            position:true,
            size:true,
            imageType:1
        }
    }
    makeCodePostData(data = {}) {
        const componentStyle = {
            width:numToPxString(100),
            height:numToPxString(100),
            position: 'absolute',
            left:numToPxString(0),
            top:numToPxString(0),
            zIndex:`1`,
            borderRadius:numToPxString(100,'%',1)
        };
        return {
            componentStyle,
            componentName: data.componentName,
            key: new Date().getTime(),
            ifScale:1,
            position:true,
            size:true,
            type:1
        }
    }
    render() {
        //以下用了箭头函数
        return (
            <div className={headerStyle.container} flex="main:justify cross:center">
                <div flex-box="0" className={headerStyle.logo}/>
                <div flex-box="1" flex="main:center cross:center">
                    {headerList.map((el, index) => {
                            const HeaderDom = el.ifUpload ? UpFile : 'div';
                            return (<HeaderDom className={headerStyle.editBtn} fileclassname={headerStyle.editBtn} onClick={this.setDataFuc.bind(this,el)}
                                               uploading={el.ifUpload ? (loading) => this.uploading(loading, el.componentName) : null}
                                               uploadsuccess={el.ifUpload ? (file, result, type) => this.uploadsuccess(file, result, type, el.componentName) : null}
                                               acceptstr={el.ifUpload ? acceptstr : null} flex-box="0" key={index}>
                                <img src={el.img} className={headerStyle.editImg} alt=""/>
                                <div className={headerStyle.editFont}>{el.font}</div>
                            </HeaderDom>)
                        }
                    )}
                </div>
                <Button flex-box="0" type="primary" onClick={this.showConfirm.bind(this)}>完成</Button>
            </div>
        )
    }
}

export default Header
