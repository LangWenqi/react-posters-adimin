import React, {Component} from "react";
import bgModelStyle from '@/pageStyle/posters/bgModel.less'
// import classNames from 'classnames/bind';
// const bgClass = classNames.bind(bgModelStyle);
class BgModel extends Component {  //class特性
    componentDidMount() {

    }

    handleColorChange(color, event){
        let rgba=Object.keys(color.rgb);
        rgba=rgba.map(el=>(color.rgb[el].toString()));
        rgba=rgba.join(',');
        console.log(`rgba(${rgba})`);
    }
    uploading(loading){
        console.log(loading)
    }
    uploadsuccess(file, result, type){
        console.log(result)
    }
    render() {
        const props = this.props;
        return (
            <div className={bgModelStyle.container} style={props.item.componentStyle}/>
        )
    }
}

export default BgModel
