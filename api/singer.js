import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({},commonParams,{
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 50,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 667679724
  })

  return jsonp(url, data, options)
}


export function getSingerDetail(singerId) {
  const url='https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    hostUin:0,
    needNewCode:1,
    platform:'yqq',
    begin:0,
    num:300,
    songstate:1,
    g_tk:320023356,
    singermid:singerId,
    order: 'listen',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    form:'h5'
  })

  return jsonp(url,data,options)


}

// export function getVkey() {
//     const url='https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg '
//
//     const data =Object.assign({},commonParams, {
//       g_tk: 195219765,
//       jsonpCallback: MusicJsonCallback004680169373158849,
//       loginUin:0,
//       hostUin:0,
//       format:json,
//       inCharset:utf8,
//       outCharset:utf - 8,
//       notice:0,
//       platform:yqq,
//       needNewCode:0,
//       cid:205361747,
//       callback:MusicJsonCallback004680169373158849,
//       uin: 0,
//       songmid:001Qu4I30eVFYb,
//       filename:C400001Qu4I30eVFYb.m4a,
//       guid:7332953645
//     })
// }
