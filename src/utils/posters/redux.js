import {connect} from 'react-redux';
import {handlePostDataAction,handlePostStepAction,handlePostHeightAction,handlePostTitleAction,handlePostImageAction} from "@/redux/actions/data";
function mapStateToProps(state, props) {
    return {
        postDataList: state.data.postDataList,
        postDataIndex: state.data.postDataIndex,
        postHeight:state.data.postHeight,
        postWidth:state.data.postWidth,
        postTitle:state.data.postTitle,
        postImage:state.data.postImage
    };
}

function mapDispatchToProps(dispatch, props) {
    return {
        handlePostDataAction: handlePostDataAction(dispatch,props),
        handlePostStepAction: handlePostStepAction(dispatch,props),
        handlePostHeightAction:handlePostHeightAction(dispatch,props),
        handlePostTitleAction:handlePostTitleAction(dispatch,props),
        handlePostImageAction:handlePostImageAction(dispatch,props)
    };
}

//封装传递state和dispatch
export const PostersConnect = (component) => connect(mapStateToProps, mapDispatchToProps)(component);
