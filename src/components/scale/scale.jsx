import React, {Component} from 'react'
import scaleStyle from './scale.less';
// import classNames from 'classnames/bind';
// const scaleClass = classNames.bind(scaleStyle);
let startY, startWidth, startHeight;

// startX
class Scale extends Component {
    static defaultProps = {
        ifScale: false,
        ifDelete: false,
        right: window.innerWidth,
        bottom: window.innerHeight,
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        setClick() {

        },
        setDelete() {

        },
        handleScaleStyle(data) {

        }
    }

    componentDidMount() {

    }

    mouseDown(d, e) {
        e.stopPropagation();
        const props = this.props;
        // startX = e.clientX;
        startY = e.clientY;
        startWidth = props.width;
        startHeight = props.height;
        this.mouseMove(d);
        this.mouseUp();
    }

    mouseMove(d) {
        const props = this.props;
        const top = props.top;
        const left = props.left;
        const right = props.right;
        const bottom = props.bottom;
        window.onmousemove = (e) => {
            let moveY = e.clientY;
            let scale = startWidth / startHeight;
            let moveHeight = moveY - startY;
            let width = startWidth + scale * moveHeight * d;
            let height = startHeight + moveHeight * d;
            if (height < 10) {
                height = 10;
                width = scale * height;
            }
            if (left + width > right) {
                width = right - left;
                height = width / scale;
            }
            if (top + height > bottom) {
                height = bottom - top;
                width = height * scale;
            }
            props.handleScaleStyle({
                width: parseInt(width, 10),
                height: parseInt(height, 10)
            });
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
    }

    render() {
        const props = this.props;
        return (
            <div className={scaleStyle.container} onClick={props.setClick}>
                {props.ifDelete ? <div className={scaleStyle.delete} onClick={props.setDelete}/> : null}
                {props.ifScale ? <div className={scaleStyle.item} onMouseDown={this.mouseDown.bind(this, 1)}/> : null}
                {this.props.children}
            </div>
        )
    }
}

export default Scale


