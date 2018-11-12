import BgModel from '@/components/posters/bgModel'
import CardModel from '@/components/posters/cardModel'
import FontModel from '@/components/posters/fontModel'
import ImageModel from '@/components/posters/imageModel'
import CodeModel from '@/components/posters/codeModel'

import FontControl from '@/components/posters/fontControl'
import ImageControl from '@/components/posters/imageControl'
import CardControl from '@/components/posters/cardControl'
import CodeControl from '@/components/posters/codeControl'
import BgControl from '@/components/posters/bgControl'
export const modelComponents = {
    BgModel,
    CardModel,
    FontModel,
    ImageModel,
    CodeModel
};
export const controlComponents = {
    BgControl,
    CardControl,
    FontControl,
    ImageControl,
    CodeControl
};

export const headerList = [
    {
        img: require('@/images/posters/img.png'),
        font: '背景',
        componentName:'Bg'
    },
    // {
    //     img: require('@/images/posters/photo.png'),
    //     font: '头像',
    //     ifUpload: true,
    //     ifCut: true
    // },
    {
        img: require('@/images/posters/img.png'),
        font: '图片',
        componentName:'Image',
        ifUpload: true,
        upType:'img'
    },
    {
        img: require('@/images/posters/card.png'),
        font: '名片',
        componentName:'Card'
    },
    {
        img: require('@/images/posters/font.png'),
        font: '文字',
        componentName:'Font'
    },
    {
        img: require('@/images/posters/code.png'),
        font: '二维码',
        componentName:'Code'
    }
];
