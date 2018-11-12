// import {set} from "@/utils/immutable.js";
import {handleActions} from 'redux-actions'
import {SET_POST_DATA,SET_POST_STEP,SET_POST_HEIGHT,SET_POST_TITLE,SET_POST_IMAGE} from "../actions/data";

const initState = {
    postDataList: [],
    postDataIndex:-1,
    postStepList: [],
    postStepIndex: 0,
    postWidth:375,
    postHeight:667,
    postTitle:'',
    postImage:''
};

export default handleActions({
    [SET_POST_DATA](state, action) {
        const postDataList = action.postDataList;
        const postDataIndex =action.postDataIndex;
        return {...state,postDataList,postDataIndex};
    },
    [SET_POST_STEP](state, action) {
        const postStepList = action.postStepList;
        const postStepIndex =action.postStepIndex;
        return {...state,postStepList,postStepIndex};
    },
    [SET_POST_HEIGHT](state, action){
        const postHeight = action.postHeight;
        return {...state,postHeight};
    },
    [SET_POST_TITLE](state, action){
        const postTitle = action.postTitle;
        return {...state,postTitle};
    },
    [SET_POST_IMAGE](state, action){
        const postImage = action.postImage;
        return {...state,postImage};
    }
}, initState)
