export function handleKey(file) {
    if (!file) {
        return {}
    }
    if (file.type.split('/')[0] === 'image') {
        return makeFileObj(1, file, file.type.split('/')[1]);
    } else if (file.type.split('/')[0] === 'video') {
        return makeFileObj(3, file, file.type.split('/')[1]);
    } else if (file.type.split('/')[1] === 'msword') {
        return makeFileObj(5, file, 'doc');
    } else if (file.type.split('/')[1] === 'vnd.openxmlformats-officedocument.wordprocessingml.document') {
        return makeFileObj(5, file, 'docx');
    } else if (file.type.split('/')[1] === 'vnd.ms-excel') {
        return makeFileObj(7, file, 'xls');
    } else if (file.type.split('/')[1] === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        return makeFileObj(7, file, 'xlsx');
    } else if (file.type.split('/')[1] === 'vnd.ms-powerpoint') {
        return makeFileObj(8, file, 'ppt');
    } else if (file.type.split('/')[1] === 'vnd.openxmlformats-officedocument.presentationml.presentation') {
        return makeFileObj(8, file, 'pptx');
    } else if (file.type.split('/')[1] === 'pdf') {
        return makeFileObj(6, file, 'pdf');
    } else if (file.type.split('/')[1] === 'plain') {
        return makeFileObj(4, file, 'txt')
    } else if (file.type.split('/')[0] === 'audio') {
        return makeFileObj(9, file, file.type.split('/')[1]);
    } else {
        return makeFileObj(127, file, file.type.split('/')[1]);
    }
}
export function makeFileObj(type, file, endType) {
    let content = {};
    content.type = type;
    content.fileName = file.name;
    content.endType = endType;
    return content;
}
