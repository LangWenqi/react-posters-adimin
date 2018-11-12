import React, {Component} from "react";
import codeModelStyle from '@/pageStyle/posters/codeModel.less'
// import classNames from 'classnames/bind';
// const codeClass = classNames.bind(codeModelStyle);

class CodeModel extends Component {  //class特性
    static defaultProps = {
        item: {}
    }
    componentDidMount() {

    }
    render() {
        const props = this.props;
        const url =props.item.type===1?require('@/images/common/code.jpeg'):'';
        return (
            <div className={codeModelStyle.container} style={props.item.componentStyle}>
                <img className={codeModelStyle.img} src={url} alt=""/>
            </div>
        )
    }
}

export default CodeModel
