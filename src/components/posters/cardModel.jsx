import React, {Component} from "react";
import cardModelStyle from '@/pageStyle/posters/cardModel.less'
// import classNames from 'classnames/bind';
// const cardClass = classNames.bind(cardModelStyle);
const titleList = [
    '姓名：',
    '公司：',
    '联系电话：'
];

class CardModel extends Component {  //class特性
    componentDidMount() {

    }

    render() {
        const props = this.props;
        const url = props.item.type === 1 ? require('@/images/common/code.jpeg') : '';
        return (
            <div className={cardModelStyle.container} flex="cross:center" style={props.item.componentStyle}>
                <div flex-box="1">
                    {titleList.map((el,index)=><div className={cardModelStyle.title} key={index}>{el}</div>)}
                </div>
                <div flex-box="0" className={cardModelStyle.right}
                     style={{borderRadius: props.item.type === 1 ? '100%' : '0'}}>
                    <img src={url} className={cardModelStyle.img} alt=""/>
                </div>
            </div>
        )
    }
}

export default CardModel
