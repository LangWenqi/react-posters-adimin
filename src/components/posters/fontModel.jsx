import React, {Component} from "react";
import {getHtmlData} from '@/utils'
import fontModelStyle from '@/pageStyle/posters/fontModel.less'
// import classNames from 'classnames/bind';
// const fontClass = classNames.bind(fontModelStyle);
class FontModel extends Component {  //class特性
    componentDidMount() {
    }
    render() {
        const props = this.props;
        return (
            <div className={fontModelStyle.container} style={props.item.componentStyle} dangerouslySetInnerHTML={{
                __html: getHtmlData(props.item.content)
            }}/>
        )
    }
}

export default FontModel
