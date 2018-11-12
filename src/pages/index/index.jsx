import React, {Component} from 'react'

class Index extends Component {  //class特性
    render() {
        //以下用了箭头函数
        return (
            <div className="container">
                {this.props.children}
            </div>
        )
    }
}

export default Index    //模块导出


