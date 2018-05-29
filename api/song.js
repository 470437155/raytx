import {callback, commonParams, ERR_OK, options} from './config'
import axios from 'axios'
import {getUid} from 'common/js/uid'
import jsonp from 'common/js/jsonp'

const debug = process.env.NODE_ENV !== 'production'

export function getLyric(mid) {
  const url = debug ? '/api/lyric' : 'http://182.61.58.67:9000/api/lyric'
  
  const data=Object.assign({},commonParams,{
    songmid:mid,
    pachetime:+new Date(),
    platform:'yqq',
    hostUin:0,
    needNewCode:0,
    g_tk: 5381,
    categoryId: 10000000,
    format:'json'
  })
  
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getSongsUrl(songs) {
  const url =debug ? '/api/getPurlUrl' : 'http://182.61.58.67:9000/api/getPurlUrl'
  // debug ? '/api/getPurlUrl' : 'http://ustbhuangyi.com/music/api/getPurlUrl'
  let mids = []
  let types = []
  
  songs.forEach((song) => {
    mids.push(song.mid)
    types.push(0)
  })
  
  const urlMid = genUrlMid(mids, types)
  
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  })
  // return axios.post(url, {
  //   comm: data,
  //   url_mid: genUrlMid(mids, types)
  //   }).then((res) => {
  //   return Promise.resolve(res.data)
  // })
  return new Promise((resolve, reject) => {
    let tryTime = 3

    function request() {
      return axios.post(url, {
        comm: data,
        url_mid: urlMid
      }).then((response) => {
        const res = response.data
        if (res.code === ERR_OK) {
          let urlMid = res.url_mid
          if (urlMid && urlMid.code === ERR_OK) {
            const info = urlMid.data.midurlinfo[0]
            if (info && info.purl) {
              resolve(res)
            } else {
              retry()
            }
          } else {
            retry()
          }
        } else {
          retry()
        }
      })
    }

    function retry() {
      if (--tryTime >= 0) {
        request()
      } else {
        reject(new Error('Can not get the songs url'))
      }
    }

    request()
  })
}

function genUrlMid(mids, types) {
  const guid = getUid()
  return {
    module: 'vkey.GetVkeyServer',
    method: "CgiGetVkey",
    param: {
      guid,
      songmid: mids,
      songtype: types,
      uin: '0',
      loginflag: 0,
      platform: '23'
    }
  }
}

export function getSongComment(songid) {
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
    biztype: 1,
    topid: songid,
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
