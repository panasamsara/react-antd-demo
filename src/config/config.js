let SERVER_URL = 'http://10.92.101.63:8089' // 线上环境----打包用这个地址
// http://172.16.11.76:8889/dfcv//setupBinding/dpVideoChannel
// let VIDEOSERVER = 'http://220.249.118.243:10080/sys'
// let REALVIDEOSERVER = '_v.tv.ssinube.com.cn:9502'
// let anilysisServer = 'http://27.17.52.252:2000'

// 生产一套
// SERVER_URL = 'https://tmp.gacrnd.com:8087'
let REALVIDEOSERVER = '_v.videotmp.gacrnd.com:19502'
let VIDEOSERVER = 'https://tmp.gacrnd.com:60080/'
let anilysisServer = 'https://tmp.gacrnd.com:60080'

// if (process.env.BUILD_EVN === 'dev') {
//   // 61环境
//   SERVER_URL = 'http://172.16.11.43:8087'
//   REALVIDEOSERVER = '_v.tv.ssinube.com.cn:9502'
//   VIDEOSERVER = 'http://220.249.118.243:10080/'
// } else if (process.env.BUILD_EVN === 'test') {
//   // 测试环境
//   SERVER_URL = 'http://172.16.20.15:8087'
//   REALVIDEOSERVER = '_v.tv.ssinube.com.cn:9502'
//   VIDEOSERVER = 'http://220.249.118.243:10080/'
// } else if (process.env.BUILD_EVN === 'prod') {
//   SERVER_URL = 'https://tmp.gacrnd.com:8087'
//   REALVIDEOSERVER = '_v.videotmp.gacrnd.com:19502'
//   VIDEOSERVER = 'https://tmp.gacrnd.com:60080/'
//   anilysisServer = 'https://tmp.gacrnd.com:60080'
// }
export { SERVER_URL, VIDEOSERVER, REALVIDEOSERVER, anilysisServer }
