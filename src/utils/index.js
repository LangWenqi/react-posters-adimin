import {getType} from "./object";
import {EXIF} from 'exif-js';
import html2canvas from '@/common/js/html2canvas'

/**
 * @author: langwenqi
 * @describe: check the telephone or mobile
 * @params:{String} mobile
 * @return: {Boolean} the result
 **/
export function checkPhone(mobile) {
    let reg = /(^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}-))?(1[3456789]\d{9})$)/;
    return reg.test(mobile)
};

/**
 * @author: langwenqi
 * @describe: check the mobile
 * @params:{String} mobile
 * @return: {Boolean} the result
 **/
export function checkMobile(mobile) {
    let reg = /^1[0-9]{10}$/;
    return reg.test(mobile)
};

/**
 * @author: langwenqi
 * @describe: change the utf16 to utf8
 * @params:{String} str
 * @return: {String} the result
 **/
export function utf16toEntities(str) {
    if (getType(str) !== 'string') {
        return str
    }
    var patt = /[\ud800-\udbff][\udc00-\udfff]/g;
    // 检测utf16字符正则
    str = str.replace(patt, function (char) {
        var H, L, code;
        if (char.length === 2) {
            H = char.charCodeAt(0);
            // 取出高位
            L = char.charCodeAt(1);
            // 取出低位
            code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00;
            // 转换算法
            return "&#" + code + ";";
        } else {
            return char;
        }
    });
    return str;
}

/**
 * @author: langwenqi
 * @describe: change the utf8 to utf16
 * @params:{String} str
 * @return: {String} the result
 **/
export function entitiestoUtf16(str) {
    if (getType(str) !== 'string') {
        return str
    }
    // 检测出形如&#12345;形式的字符串
    var strObj = utf16toEntities(str);
    var patt = /&#\d+;/g;
    var H, L, code;
    var arr = strObj.match(patt) || [];
    for (var i = 0; i < arr.length; i++) {
        code = arr[i];
        code = code.replace('&#', '').replace(';', '');
        // 高位
        H = Math.floor((code - 0x10000) / 0x400) + 0xD800;
        // 低位
        L = (code - 0x10000) % 0x400 + 0xDC00;
        code = "&#" + code + ";";
        var s = String.fromCharCode(H, L);
        strObj = strObj.replace(code, s);
    }
    return strObj;
}

/**
 * @author: langwenqi
 * @describe: encodeURI the Object's keys
 * @params:{String} str
 * @return: {Object} the result
 **/
export function transformObjectString(obj) {
    if (getType(obj) === 'object') {
        let transObj = {};
        Object.keys(obj).forEach((el, index) => {
            transObj[el] = encodeURIComponent(obj[el]);
        });
        return transObj;
    }
    else if (getType(obj) === 'string') {
        return encodeURIComponent(obj)
    }
    return obj
}

/**
 * @author: langwenqi
 * @describe: decodeURI the Object's keys
 * @params:{String} str
 * @return: {Object} the result
 **/
export function unTransformObjectString(obj) {
    if (getType(obj) === 'object') {
        let transObj = {};
        Object.keys(obj).forEach((el, index) => {
            transObj[el] = decodeURIComponent(obj[el]);
        });
        return transObj
    } else if (getType(obj) === 'string') {
        return decodeURIComponent(obj)
    }
    return obj
}

/**
 * @author: langwenqi
 * @describe: stringify Object or parse Url
 * @params:{Object} stringify:obj,{String} parse:str
 * @return: {String} stringify:the result,{Object} parse:the result
 **/
export const qs = {
    stringify: function (obj = {}, ifEncode) {
        return Object.keys(obj).map((el, index) => {
            return `${el}=${ifEncode ? encodeURIComponent(obj[el]) : obj[el]}`
        }).join('&')
    },
    parse: function (str = '', ifDecode) {
        let param = {};
        const arr = str ? str.split('&') : [];
        arr.forEach((el, index) => {
            param[el.split('=')[0]] = ifDecode ? decodeURIComponent(el.split('=')[1]) : el.split('=')[1]
        });
        return param;
    }
};

/**
 * @author: langwenqi
 * @describe: check with emoji,'',null,undefind,String.trim()==='',special string to false
 * @params:{String} str
 * @return: {Boolean} the result
 **/
export function checkExpression(str) {
    let emoji = /[\ud800-\udbff][\udc00-\udfff]/;
    let reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    if ((!str) || emoji.test(str) || reg.test(str) || str.trim() === '') {
        return false;
    }
    return true;
}

/**
 * @author: langwenqi
 * @describe: format the date Object or date Number
 * @params:{date Object or date Number} date
 * @params:{String} format
 * @return: {String} the result
 **/
export function dateFormat(date, format) {
    var o = {
        "y+": new Date(date).getFullYear(),
        "M+": new Date(date).getMonth() + 1,
        "d+": new Date(date).getDate(),
        "h+": new Date(date).getHours(),
        "m+": new Date(date).getMinutes(),
        "s+": new Date(date).getSeconds(),
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (new Date(date).getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length === 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

/**
 * @author: langwenqi
 * @describe: make the measure text to Array
 * @params:{String} text: the measure text
 * @params:{Number} maxWidth: the measure text maxWidth
 * @return: {Array} row: the measure text Array
 **/
export function measureCanvasFont(text, maxWidth, fontSize) {
    let measureCanvas = document.createElement("canvas");
    let measureCtx = measureCanvas.getContext("2d");
    if (!text) {
        return [];
    }
    let chr = text.split("");
    let temp = "";
    let row = [];
    for (var a = 0; a < chr.length; a++) {
        if (measureCtx.measureText(temp).width < maxWidth - 2 * fontSize) {
            temp += chr[a];
        } else {
            a--;
            row.push(temp);
            temp = "";
        }
    }
    row.push(temp);
    measureCtx = null;
    measureCanvas = null;
    return row
}

/**
 * @author: langwenqi
 * @describe: get img src from the rich-context
 * @params:{String} strs
 * @return: {Array} arr_src
 **/
export function getHtmlImg(strs) {
    let imgReg = /<img.*?(?:>|\/>)/gi;
    let srcReg = /src=['"]?([^'"]*)['"]?/i;
    let arr = [];
    if (strs && strs.trim()) {
        arr = strs.match(imgReg);
    }
    console.log('所有已成功匹配图片的数组：' + arr);
    let arr_src = [];
    if (arr) {
        for (var i = 0; i < arr.length; i++) {
            var src = arr[i].match(srcReg);
            //获取图片地址
            if (src[1]) {
                arr_src.push(src[1])
            }
        }
    }
    console.log('截取html生成的数组')
    console.log(arr_src)
    return arr_src;
}

/**
 * @author: langwenqi
 * @describe: get bytes length
 * @params:{String} str
 * @return: {Number} the result
 **/
export function getBytesLength(str) {
    // 在GBK编码里，除了ASCII字符，其它都占两个字符宽
    return str.replace(/[^\x00-\xff]/g, 'xx').length;
}

/**
 * @author: langwenqi
 * @describe: accurate multiplication
 * @params:{Number} arg1
 * @params:{Number} arg2
 * @return: {Number} the result
 **/
export function mul(arg1 = 0, arg2 = 0) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    }
    catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

/**
 * @author: langwenqi
 * @describe: accurate division
 * @params:{Number} arg1：dividend
 * @params:{Number} arg2：divisor
 * @return: {Number} the result
 **/
export function div(arg1 = 0, arg2 = 1) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
    }
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
}

/**
 * @author: langwenqi
 * @describe: pxString to Number
 * @params:{String} string
 * @return: {Number} the result
 **/
export function pxStringToNum(string, splitString = 'px', scale = 1) {
    if (getType(string) !== 'string') return;
    let number = parseInt(string.split(splitString)[0], 10);
    return number / scale;
}

/**
 * @author: langwenqi
 * @describe: Number to pxString
 * @params:{Number} number
 * @return: {pxString} the result
 **/
export function numToPxString(number, splitString = 'px', scale = 1) {
    if (getType(number) !== 'number') return;
    return `${scale * number}${splitString}`;
}

export function getFormData(str) {
    if (!str) {
        return '';
    }
    const newStr = str.replace(/<br>/ig, "\n").replace(/&nbsp;/g, " ").replace('&lt;', '<').replace('&gt;', '>');
    return newStr;
}

export function getHtmlData(str) {
    if (!str) {
        return '';
    }
    const newStr = str.replace('<', '&lt;').replace('>', '&gt;').replace(/\n|\r\n/g, "<br>").replace(/[ ]/g, "&nbsp;");
    return newStr;
}

export function BrowserType() {
    const userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    const isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    const isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    const isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    const isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    const isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1 && userAgent.indexOf("Edge") === -1; //判断是否Safari浏览器
    const isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Edge") === -1; //判断Chrome浏览器

    if (isIE) {
        const reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        const fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion === 7) {
            return "IE7";
        } else if (fIEVersion === 8) {
            return "IE8";
        } else if (fIEVersion === 9) {
            return "IE9";
        } else if (fIEVersion === 10) {
            return "IE10";
        } else if (fIEVersion === 11) {
            return "IE11";
        } else {
            return "0"
        } //IE版本过低
    } //isIE end

    if (isFF) {
        return "FF";
    }
    if (isOpera) {
        return "Opera";
    }
    if (isSafari) {
        return "Safari";
    }
    if (isChrome) {
        return "Chrome";
    }
    if (isEdge) {
        return "Edge";
    }
}

/**
 * @author: langwenqi
 * @describe: correct rotateImage
 * @params:{IMG Object} image
 * @return: {IMG Base64} the result
 **/
export function rotateImage(image) {
    console.log('rotateImage');
    var width = image.width;
    var height = image.height;

    var canvas = document.createElement("canvas")
    var ctx = canvas.getContext('2d');

    var newImage = new Image();
    let imageDate;
    //旋转图片操作
    EXIF.getData(image, function () {
            var orientation = EXIF.getTag(this, 'Orientation');
            // orientation = 6;//测试数据
            console.log('orientation:' + orientation);
            switch (orientation) {
                //正常状态
                case 1:
                    console.log('旋转0°');
                    // canvas.height = height;
                    // canvas.width = width;
                    newImage = image;
                    break;
                //旋转90度
                case 6:
                    console.log('旋转90°');
                    canvas.height = width;
                    canvas.width = height;
                    ctx.rotate(Math.PI / 2);
                    ctx.translate(0, -height);

                    ctx.drawImage(image, 0, 0)
                    imageDate = canvas.toDataURL('Image/jpeg', 1)
                    newImage.src = imageDate;
                    break;
                //旋转180°
                case 3:
                    console.log('旋转180°');
                    canvas.height = height;
                    canvas.width = width;
                    ctx.rotate(Math.PI);
                    ctx.translate(-width, -height);

                    ctx.drawImage(image, 0, 0)
                    imageDate = canvas.toDataURL('Image/jpeg', 1)
                    newImage.src = imageDate;
                    break;
                //旋转270°
                case 8:
                    console.log('旋转270°');
                    canvas.height = width;
                    canvas.width = height;
                    ctx.rotate(-Math.PI / 2);
                    ctx.translate(-height, 0);

                    ctx.drawImage(image, 0, 0)
                    imageDate = canvas.toDataURL('Image/jpeg', 1)
                    newImage.src = imageDate;
                    break;
                //undefined时不旋转
                case undefined:
                    console.log('undefined  不旋转');
                    newImage = image;
                    break;
                case 0:
                    console.log('0  不旋转');
                    newImage = image;
                    break;
                default:
                    newImage = image;
                    break;
            }
        }
    );
    return newImage;
}

export function drawCanvas(obj = {}) {
    if (!obj.dom) return;
    setTimeout(() => {
        let width = obj.dom.offsetWidth; //获取dom 宽度
        let height = obj.dom.offsetHeight; //获取dom 高度
        let top = obj.dom.offsetTop; //获取dom 高度
        let canvas = document.createElement("canvas"); //创建一个canvas节点
        let context = canvas.getContext("2d");
        let scale = obj.scale ? obj.scale : 2; //定义任意放大倍数 支持小数
        canvas.width = width * scale; //定义canvas 宽度 * 缩放
        canvas.height = (height + top) * scale; //定义canvas高度 *缩放
        context.scale(scale, scale); //获取context,设置scale
        var opts = {
            // allowTaint: false, //允许加载跨域的图片
            useCORS: true,
            tainttest: true, //检测每张图片都已经加载完成
            scale: scale, // 添加的scale 参数
            canvas: canvas, //自定义 canvas
            logging: false, //日志开关，发布的时候记得改成false
            width: width, //dom 原始宽度
            height: height //dom 原始高度
        };
        html2canvas(obj.dom, opts).then((canvas) => {
            let url = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            if (obj.cb) {
                obj.cb(url);
            }
        });
    }, 20);
}
