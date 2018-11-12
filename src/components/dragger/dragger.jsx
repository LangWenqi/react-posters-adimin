import React, {Component} from "react";
import draggerStyle from './dragger.less'

let startX, startY, startLeft, startTop;

class Dragger extends Component {  //class特性
    constructor(props) {
        super(props);
        this.state = {
            top: '0',
            left: '0'
        }
    }

    static defaultProps = {
        dragPosition: 'absolute',
        dragZIndex: 0,
        noDrag: false,
        scale: 1,
        ifFixed: false,
        top: '0',
        left: '0',
        right: window.innerWidth,
        bottom: window.innerHeight,
        dragEnd(data) {

        }
    }

    componentWillMount() {
        this.initState(this.props)
    }

    componentWillReceiveProps(nextProps) {
        // if((nextProps.top!==this.props.top)||(nextProps.left!==this.props.left)){
        //     this.initState(nextProps);
        // }
    }

    componentDidMount() {

    }

    initState(props) {
        this.setState({
            top: props.top,
            left: props.left
        })
    }

    mouseDown(e) {
        startX = e.clientX;
        startY = e.clientY;
        startLeft = this.state.left;
        startTop = this.state.top;
        this.mouseMove();
        this.mouseUp();
    }

    mouseMove() {
        const props = this.props;
        window.onmousemove = (e) => {
            let moveX = e.clientX;
            let moveY = e.clientY;
            let X = startLeft + props.scale * (moveX - startX);
            let Y = startTop + props.scale * (moveY - startY);
            if (X < 0) {
                X = 0;
            } else if (X > props.right - this.draggerRef.offsetWidth) {
                X = props.right - this.draggerRef.offsetWidth
            }
            if (Y < 0) {
                Y = 0;
            } else if (Y > props.bottom - this.draggerRef.offsetHeight) {
                Y = props.bottom - this.draggerRef.offsetHeight
            }
            this.setState((prevState, props) => ({
                top: parseInt(Y, 10),
                left: parseInt(X, 10)
            }));
            return false;//必须写，不写不会触发mouseup
        }
    }

    mouseUp() {
        window.onmouseup = () => {
            this.removeFuc();
        }
    }

    removeFuc() {
        window.onmousemove = null;
        window.onmouseup = null;
        this.props.dragEnd({left: this.state.left, top: this.state.top});
    }

    render() {
        const props = this.props;
        return (
            <div ref={(e) => this.draggerRef = e} className={draggerStyle.container} style={{
                position: props.dragPosition,
                left: `${this.state.left}px`,
                top: `${this.state.top}px`,
                zIndex: props.dragZIndex
            }} onMouseDown={props.noDrag ? null : this.mouseDown.bind(this)}>
                {this.props.children}
            </div>
        )
    }
}

export default Dragger
