import jsonp from 'common/js/jsonp'
import {commonParams, options,callback} from './config'


const debug = process.env.NODE_ENV !== 'production'

export function getAlbumList(singerid) {
  const url='https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_album.fcg'
  
  const data = Object.assign({}, commonParams, {
    g_tk: 320023356,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: singerid,
    order: 'time',
    begin: 0,
    num: 30,
    exstatus: 1,
  })
  
  return jsonp(url,data,options)
  
  
}

export function getAlbumDetail(albummid) {
  const url='https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg'
  
  const data = Object.assign({}, commonParams, {
    albummid,
    hostUin:0,
    needNewCode:0,
    platform:'yqq',
    g_tk:320023356,
    order: 'listen',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0
  })
  
  return jsonp(url,data,options)
  
  
}


export function getAlbumComment(albumid) {
  const url='https://c.y.qq.com/base/fcgi-bin/fcg_global_comment_h5.fcg'
  
  const data = Object.assign({}, commonParams, {
    g_tk: 906236879,
    hostUin: 0,
    inCharset: 'utf8',
    outCharset: 'GB2312',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    cid: 205360772,
    reqtype: 2,
    biztype: 2,
    topid: albumid,
    cmd: 8,
    needmusiccrit: 0,
    pagenum: 0,
    pagesize: 25,
    domain: 'qq.com',
    ct: 24,
    lasthotcommentid:'',
    cv: 101010,
  })
  return jsonp(url,data,callback)//ganjue shi  zheli  baocuo le
  
  
}
