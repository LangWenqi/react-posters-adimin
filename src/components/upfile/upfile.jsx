import React, {Component} from 'react'   //模块引入
import {message} from 'antd';
import classNames from 'classnames/bind';
import {getOssToken} from '@/api/apis/oss'
import browserMD5File from 'browser-md5-file';
import {handleKey} from '@/utils/file'
import {TokenKeys} from '@/common/js/variable'
import upFileStyle from './upfile.less'
import co from 'co';
import OSS from 'ali-oss';
const upFileClass = classNames.bind(upFileStyle);
let increment = 0;
let fileIndex = {};
let hashIndex = {};
let percent = 0;
const host = TokenKeys.OSS_DOMAIN;
const BMF = new browserMD5File();

class UpFile extends Component {  //class特性
    constructor(props) {
        super(props);
        this.state = {
            percent: 0
        };
    }

    // static propTypes = {
    //     model: object.isRequired,
    //     title: string
    // }
    static defaultProps = {
        font: "上传图片",
        reuploadtimes: 5,
        filepath: '/oss/img/activity/',
        scale: 1,
        ifmultiple: false,
        acceptstr: 'image/png,image/jpg,image/jpeg,\n' +
            'video/mp4,audio/mp3,\n' +
            'application/vnd.openxmlformats-officedocument.presentationml.presentation,\n' +
            'application/vnd.ms-powerpoint,\n' +
            'application/vnd.ms-excel,\n' +
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,\n' +
            'application/msword,\n' +
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document,\n' +
            'application/pdf,\n' +
            'text/plain',
        ifpieces: false,
        fileclassname:'',
        maxNum: null,
        filesize: null,
        ifshowpercent: false,
        tolocal(item, type) {
        },
        uploadsuccess(file, result, type) {
        },
        uploading(boolean) {
        },
        uploaderror(file, result, type) {
        },
        uploadprocess(percent) {
        }
    };

    componentDidMount() {
        this.dropInit();
    }

    componentWillUnmount() {
        this.dropLeave();
    }

    //添加到本地回调
    toLocal(item) {
        if(!this.props.tolocal)return;
        this.props.tolocal(item, handleKey(item).type);
    }

    //上传成功回调
    uploadSuccess(file, result) {
        if(!this.props.uploadsuccess)return;
        result.name = host + result.name;
        this.props.uploadsuccess(file, result, handleKey(file).type);
    }

    //上传进度回调
    uploadProcess(percentage) {
        if(!this.props.uploadprocess)return;
        if (!this.ifshowpercent) return;
        percent = Math.floor(percentage * 100);
        this.setState({
            percent: percent
        });
        this.props.uploadprocess(percent);
    }

    //上传中回调
    uploading(boolean) {
        if(!this.props.uploading)return;
        this.props.uploading(boolean);
    }

    //上传失败回调
    uploadError(file, result) {
        if(!this.props.uploaderror)return;
        this.props.uploaderror(file, result, handleKey(file).type);
    }

    initialize(file, id) {
        let video = document.createElement("video");
        video.onloadeddata = this.captureImage(video, id + ".jpeg");
        video.src = window.URL.createObjectURL(file);
    }

    captureImage(video, id) {
        video.onloadeddata = null;
        return () => {
            let canvas = document.createElement("canvas");
            canvas.width = video.videoWidth * this.props.scale;
            canvas.height = video.videoHeight * this.props.scale;
            canvas
                .getContext("2d")
                .drawImage(video, 0, 0, canvas.width, canvas.height);
            let base64Url = canvas.toDataURL("image/png");
            window.URL.revokeObjectURL(video.src);
            let blobUrl = this.toBlobUrl(base64Url);
            this.toArrayBuffer(blobUrl, id);
        };
    }

    toArrayBuffer(blob, id) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        reader.onload = event => {
            let buffer = new OSS.Buffer(event.target.result);
            this.initOss(buffer, increment, id, true);
        };
    }

    toBlobUrl(base64Url) {
        var bytes = window.atob(base64Url.split(",")[1]); //去掉url的头，并转换为byte
        //处理异常,将ascii码小于0的转换为大于0
        var ab = new ArrayBuffer(bytes.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab], {
            type: "image/png"
        });
    }

    /**
     * @describe 上传文件
     *
     * @param    obj 文件伪数组
     *
     * @date     2018-1-5
     *
     * @author   langwenqi
     */
    upFile() {
        if (!this.upload.files.length) return;
        increment++;
        fileIndex[increment] = 0;
        let files = Array.prototype.slice.call(this.upload.files);
        this.upload.value = null;
        this.initOss(files, increment);
    }

    /**
     * @describe 上传之前判断限制数目，并且返回带有文件id的files
     *
     * @param    obj 文件伪数组
     *
     * @date     2018-1-5
     *
     * @author   langwenqi
     */
    fileAdded(files, increment) {
        if (files.length > this.props.maxnum && this.props.maxnum !== null) {
            message.error('上传个数超出限制');
            return;
        }
        hashIndex[increment] = 0;
        return new Promise((resolve, reject) => {
            this.getFileHash(files, increment, resolve, reject);
        });
    }

    checkLength(files, increment, resolve, reject) {
        if (hashIndex[increment] >= files.length) {
            resolve(files);
            return false;
        }
        return true;
    }

    checkSize(files, increment, resolve, reject) {
        if (this.props.filesize !== null) {
            if (
                files[hashIndex[increment]].size >
                this.props.filesize * 1024 * 1024
            ) {
                message.error(`上传文件的大小需小于${this.props.filesize}M`);
                let newFiles = [];
                for (let val of files) {
                    if (val.id) {
                        newFiles.push(val);
                    } else {
                        break;
                    }
                }
                resolve(newFiles);
                return false;
            }
        }
        return true;
    }

    //获取文件hash
    getFileHash(files, increment, resolve, reject) {
        if (!this.checkLength(files, increment, resolve, reject)) {
            return;
        }
        if (!this.checkSize(files, increment, resolve, reject)) {
            return;
        }
        BMF.md5(
            files[hashIndex[increment]],
            (err, md5) => {
                files[hashIndex[increment]].id =
                    this.props.filepath +
                    md5 +
                    new Date().getTime() +
                    Math.floor(9000 * Math.random() + 1000) +
                    "." +
                    handleKey(files[hashIndex[increment]]).endType;
                this.toLocal(files[hashIndex[increment]]);
                hashIndex[increment]++;
                this.getFileHash(files, increment, resolve, reject);
            },
            progress => {
                console.log('progress number:', progress);
            },
        );
    }

    /**
     * @describe 初始化oss
     *
     * @param    files 文件伪数组
     *
     * @date     2018-1-5
     *
     * @author   langwenqi
     */
    initOss(files, increment, id, cover) {
        let that = this;
        co(function* () {
            let res = yield getOssToken({
                filePath: that.props.filepath
            });
            let {
                code,
                data
            } = res;
            if (code !== 200) return;
            let client = new OSS({
                secure: true,
                accessKeyId: data.accessKeyId,
                //OSSAccessKeyId: `${new Date().getTime()+Math.floor(9000*Math.random()+1000)}.${ext}`,
                accessKeySecret: data.accessKeySecret,
                stsToken: data.accessToken,
                bucket: data.bucket
            });
            if (cover) {
                that.ossPut(client, files, id);
            } else {
                that.uploading(true);
                let keyFiles = yield that.fileAdded(files, increment);
                if (keyFiles && keyFiles.length > 0) {
                    that.ossSend(client, keyFiles, increment);
                }
            }
        }).catch(err => {
            console.log(err);
        });
    }

    ossPut(client, file, id) {
        client.put(id, file);
    }

    clearIndexFuc(increment) {
        delete fileIndex.increment;
        delete hashIndex.increment;
        sessionStorage.removeItem("checkpoint" + increment);
    }

    ossSend(client, files, increment) {
        if (fileIndex[increment] >= files.length) {
            this.clearIndexFuc(increment);
            this.uploading(false);
            return;
        }
        let that = this;
        co(function* () {
            sessionStorage.setItem("checkpoint" + increment, "");
            // retry 5 times
            let upFile = files[fileIndex[increment]];
            if (handleKey(upFile).type === 3) {
                that.initialize(upFile, upFile.id);
            }
            for (let i = 0; i < that.props.reuploadtimes; i++) {
                let result = yield client.multipartUpload(upFile.id, upFile, {
                    checkpoint: sessionStorage.getItem("checkpoint" + increment) ?
                        sessionStorage.getItem("checkpoint" + increment) : null,
                    progress: function (percentage, cpt) {
                        that.uploadProcess(percentage);
                        sessionStorage.setItem("checkpoint" + increment, cpt);
                    }
                });
                if (result.res.status === 200 && result.res.statusCode === 200) {
                    that.uploadSuccess(upFile, result);
                    fileIndex[increment]++;
                    that.ossSend(client, files, increment);
                    if (fileIndex[increment] + 1 >= files.length) {
                        that.uploading(false);
                    }
                    break; // break if success
                } else {
                    if (i >= that.props.reuploadtimes - 1) {
                        that.uploading(false);
                        that.uploadError(upFile, result);
                        message.error("上传失败");
                    }
                }
            }
        }).catch(err => {
            that.uploading(false);
            that.uploadError(files[fileIndex[increment]], err);
            console.log(err);
        });
    }

    //阻止drop默认事件
    dropInit() {
        document.ondrop = function (event) {
            let e = event || window.event;
            e.preventDefault();
        };
        document.ondragleave = function (event) {
            let e = event || window.event;
            e.preventDefault();
        };
        document.ondragenter = function (event) {
            let e = event || window.event;
            e.preventDefault();
        };
        document.ondragover = function (event) {
            let e = event || window.event;
            e.preventDefault();
        };
    }

    dropLeave() {
        document.ondrop = null;
        document.ondragleave = null;
        document.ondragenter = null;
        document.ondragover = null;
    }

    /**
     * @describe 拖拽上传
     *
     * @param    obj 文件伪数组
     *
     * @date     2018-1-5
     *
     * @author   langwenqi
     */
    // dragFile(event){
    //   let e=event|| window.event;
    //   let obj = e.dataTransfer.files;
    //   if (!obj.length)
    //     return;
    //   fileIndex[increment]=0;
    //   let files = Array.prototype.slice.call(obj.files);
    //   obj.value=null;
    //   this.initOss(files);
    // }
    render() {
        const props = this.props;
        const container= (hasChildren) =>upFileClass({
            wrapper:!hasChildren,
            container:hasChildren,
            [props.fileclassname]:true
        });
        //以下用了箭头函数
        return (
            <label className={container(this.props.children)}>
                {!this.props.children?<React.Fragment>
                    <div className={upFileStyle.img} src={require('./images/add.png')}></div>
                    <p className={upFileStyle.font} flex="main:center cross:center">{props.font}</p>
                </React.Fragment>:this.props.children}
                <input type="file" multiple={props.ifmultiple} onChange={this.upFile.bind(this)}
                       accept={props.acceptstr}
                       ref={(e) => this.upload = e}/>
            </label>
        )
    }
}

export default UpFile;
