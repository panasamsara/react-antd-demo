
import { isEmpty } from 'lodash'
import moment from 'moment'
import { CSSProperties } from 'react'

export enum BgType {
  pic = 'pic',
  color = 'color',
}

export interface ContextDeclare {
  bgType?: BgType // 背景类型
  bgColor?: ColorRGBA
  bgFileResourceId?: 1
  bgFileResourceName?: '默认'
  bgPicValue?: 'bgSample' | 'bgMoreSample' | 'self' // 1 2 3 self

  titleFontType?: string
  titleFontSize?: number
  titleFontFamily?: string
  titleBold?: boolean
  titleItalic?: boolean
  titleColor?: ColorRGBA
  strokeColor?: ColorRGBA

  projectName?: string
  padding?: string
  // refreshFrequency?: number
  getPopupContainer?: () => HTMLElement

  headerLogoType?: string // custom | logo1
  headerColor?: ColorRGBA // 标题文字颜色
  headerFontSize?: 38 // 标题 文字大小
  headerLogoFileResourceId?: string // logo资源id
  headerLogoFileResourceName?: string // logo资源name
  headerLogoWidth?: 150 // 标题logo的宽度
  logoBgType?: string // 标题是否使用图片bg
  headerBgFileResourceId?: string // 标题背景图片
  headerBgFileResourceName?: string // 标题背景图片名称

  isEdit?: boolean // 是否是编辑状态
  blurValue?: number // 组件背景模糊值
  gradientColor?: ColorRGBA //组件背景渐变色
  gradientBottomColor?: ColorRGBA //组件背景渐变底色

  nowProject?: { id: string; name: string } // 当前项目
  nowPageIndex?: 1 | 2 // 当前所在页面的下标
}

interface RangeDate {
  startDate: string
  endDate: string
}

export interface ColorRGBA {
  r: number
  g: number
  b: number
  a: number
}
/**
 * 时间范围
 */
export enum Range {
  自定义 = 'zidingyi',
  全年 = 'year',
  近三月 = 'threeMonthes',
  近一月 = 'oneMonth',
}
/**
 * 统计方式
 */
export enum StyleType {
  day,
  week,
  month,
  year,
}

export function getRangeDate(
  range: Range,
  customTime: [moment.Moment, moment.Moment] 
): RangeDate {
  let startDate: string = ''
  let endDate = moment().format('YYYY-MM-DD')
  switch (range) {
    case Range.近一月: {
      startDate = moment().subtract(1, 'months').format('YYYY-MM-DD')
      break
    }
    case Range.近三月: {
      startDate = moment().subtract(2, 'months').date(1).format('YYYY-MM-DD')

      break
    }
    case Range.全年: {
      startDate = moment().month(0).date(1).format('YYYY-MM-DD')

      break
    }
    case Range.自定义: {
      if (isEmpty(customTime)) {
        startDate = ''
        break
      } else {
        startDate = customTime[0].format('YYYY-MM-DD')
        endDate = customTime[1].format('YYYY-MM-DD')
        break
      }
    }
    default: {
      startDate = ''
      endDate = ''
    }
  }
  return {
    startDate,
    endDate,
  }
}

export function myFlow<T>(...rest: Array<(arr: T) => Promise<T> | any>): any {
  return async (args: T | any) => {
    let result = args
    for await (const func of rest) {
      const r: { command: string; payload: any } | any = await func(result)
      if (typeof r === 'object' && r.command === 'break') {
        return r.payload
      } else {
        result = r
      }
    }
    return result
  }
}

export function promisify(fn:any) {
  return (args: any) => {
    return new Promise((res) => {
      fn(res, args)
    })
  }
}

export function toInt(num: any): number {
  return parseInt(num, 10)
}

export function getBG(context: ContextDeclare): CSSProperties | undefined {
  const {
    bgColor = { r: 0, g: 81, b: 173, a: 0.8 },
    // bgType,
    // bgFileResourceId,
    // bgPicValue,
  } = context
  return {
    backgroundColor: `rgba(${bgColor.r},${bgColor.g},${bgColor.b},${bgColor.a})`,
  }
}

interface TimeArgs {
  fn: (obj: any) => void
  speed?: number
  arrayMap: {
    [key: string]: {
      from: number
      to: number
    }
  }
  getKillfn?: any
}
export function timingFunction(obj: TimeArgs) {
  const { speed = 2, fn, arrayMap, getKillfn } = obj
  const keys = Object.keys(arrayMap)
  let kill = false
  const killFn = () => {
    kill = true
  }
  if (getKillfn) {
    getKillfn(killFn)
  }
  return new Promise((res:any) => {
    let index = 0
    function fun() {
      requestAnimationFrame(() => {
        if (kill) {
          res('kill')
          return
        }
        const obj:any = {}
        keys.forEach((key) => {
          const total = arrayMap[key].to - arrayMap[key].from
          obj[key] = (index / 100) * total + arrayMap[key].from
        })
        fn(obj)
        if (index >= 100) {
          res()
          return
        }
        index = speed + index >= 100 ? 100 : speed + index
        fun()
      })
    }
    fun()
  })
}


export function getTitleStyle(context: ContextDeclare): CSSProperties {
  if (context.titleFontType === 'auto') {
    return {
      fontFamily: 'auto',
      fontSize: '22px',
    }
  } else {
    context.titleColor = context.titleColor || { r: 0, g: 236, b: 252, a: 1 }
    return {
      fontFamily: context.titleFontFamily,
      fontSize: context.titleFontSize,
      fontWeight: context.titleBold ? 'bold' : 'normal',
      fontStyle: context.titleItalic ? 'italic' : 'normal',
      color: `rgba(${context.titleColor.r},${context.titleColor.g},${context.titleColor.b},${context.titleColor.a})`,
    }
  }
}