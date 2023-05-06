/*
 * @Author: joshua
 * @Date: 2023-04-27 10:42:38
 * @LastEditTime: 2023-04-27 13:39:41
 * @LastEditors: joshua
 * @Description:
 * @FilePath: 
 */

import BG1 from './bg.jpg'
import total1 from './total1.png'
import total2 from './total2.png'
import total3 from './total3.png'
import titleBg from './titleBg.png'
import bgg from './bgg.png'
import titleBg2 from './titleBg2.png'

export default function getImgUrl(imgName) {
  const obj = {
    BG1,
    titleBg,
    titleBg2,
    total1,
    total2,
    total3,
    bgg,
  }
  const bg = obj[imgName]
  return bg ? bg : obj.BG1
}
