import React, {Component} from "react";
import imageModelStyle from '@/pageStyle/posters/imageModel.less'
// import classNames from 'classnames/bind';
// const imageClass = classNames.bind(imageModelStyle);

class ImageModel extends Component {  //class特性
    static defaultProps = {
        item: {}
    }

    componentDidMount() {

    }
    render() {
        const props = this.props;
        return (
            <div className={imageModelStyle.container} style={props.item.componentStyle}>
                <img className={imageModelStyle.img} src={props.item.url} alt=""/>
            </div>
        )
    }
}

export default ImageModel
