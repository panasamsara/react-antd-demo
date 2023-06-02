
import BG1 from './bg.jpg'
import total1 from './total1.png'
import total2 from './total2.png'
import total3 from './total3.png'
import titleBg from './titleBg.png'
import bgg from './bgg.png'
import titleBg2 from './titleBg2.png'
import shapeBox from './shapeBox.png'
import titleBox from './titleBox.png'
import topBox from './topBox.png'
import mapBox from './mapBox.png'
import mapBack from './map_back.png'
import Box_470_150 from './Box_470_150.png'
import Box_470_200 from './Box_470_200.png'
import Box_470_230 from './Box_470_230.png'
import Box_470_300 from './Box_470_300.png'
import Box_470_390 from './Box_470_390.png'
import Box_470_410 from './Box_470_410.png'
import Box_450_200 from './Box_450_200.png'
import Box_230_60 from './Box_230_60.png'
import Box_230_55 from './Box_230_55.png'
import numberBG_23_90 from './numberBG_23_90.png'

import DongFeng from './campany_icon/df.jpeg'
import JiLi from './campany_icon/jili.jpeg'
import Changan from './campany_icon/changan.jpeg'
import qirui from './campany_icon/qirui.png'
import audi from './campany_icon/audi.jpeg'
import benz from './campany_icon/benz.jpeg'
import bmw from './campany_icon/bmw.jpeg'
import byd from './campany_icon/byd.png'
import changcheng from './campany_icon/changcheng.jpeg'
import farrari from './campany_icon/farrari.jpeg'
import lanbojini from './campany_icon/lanbojini.jpeg'
import tesla from './campany_icon/tesla.jpeg'
import lantu from './campany_icon/lantu.png'

export default function getImgUrl(imgName) {
  const obj = {
    BG1,
    titleBg,
    titleBg2,
    total1,
    total2,
    total3,
    bgg,
    shapeBox,
    titleBox,
    topBox,
    mapBox,
    mapBack,
    Box_470_150,
    Box_470_200,
    Box_470_230,
    Box_470_300,
    Box_470_390,
    Box_470_410,
    numberBG_23_90,
    Box_450_200,
    Box_230_60,
    Box_230_55,

    DongFeng,
    JiLi,
    Changan,
    qirui,
    changcheng,
    audi,
    benz,
    bmw,
    byd,
    farrari,
    lanbojini,
    tesla,
    lantu,
  }
  const bg = obj[imgName]
  return bg ? bg : obj.BG1
}
