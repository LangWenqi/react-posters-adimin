export const SET_POST_DATA = "SET_POST_DATA";
export const SET_POST_STEP = "SET_POST_STEP";
export const SET_POST_HEIGHT = "SET_POST_HEIGHT";
export const SET_POST_TITLE = "SET_POST_TITLE";
export const SET_POST_IMAGE = "SET_POST_IMAGE";
export const handlePostDataAction = (dispatch, props) => (postDataList,postDataIndex) => {
    const action = {type: SET_POST_DATA, postDataList,postDataIndex};
    dispatch(action);
};
export const handlePostStepAction = (dispatch, props) => (postStepList,postStepIndex) => {
    const action = {type: SET_POST_STEP, postStepList,postStepIndex};
    dispatch(action);
};
export const handlePostHeightAction = (dispatch, props) => (postHeight) => {
    const action = {type: SET_POST_HEIGHT, postHeight};
    dispatch(action);
};
export const handlePostTitleAction = (dispatch, props) => (postTitle) => {
    const action = {type: SET_POST_TITLE, postTitle};
    dispatch(action);
};
export const handlePostImageAction = (dispatch, props) => (postImage) => {
    const action = {type: SET_POST_IMAGE, postImage};
    dispatch(action);
};
