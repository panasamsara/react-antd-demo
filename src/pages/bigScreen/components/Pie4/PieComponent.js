
import "../styles.css";
import React, { useState } from 'react'
import RenderCompo from "@/components/RenderCompo";
import Pie from "./Pie";
import getImgUrl from "@/assets/images/getImgUrl";

const colorList = [
    '#0090ff',
    '#06d3c4',
    '#ffbc32',
    '#2ccc44',
    '#ff3976',
    '#6173d6',
    '#914ce5',
    '#42b1cc',
    '#ff55ac',
    '#0090ff',
    '#06d3c4',
    '#ffbc32',
    '#2ccc44',
    '#ff3976',
    '#6173d6',
    '#914ce5',
    '#42b1cc',
    '#ff55ac',
    '#0090ff',
    '#06d3c4',
    '#ffbc32',
    '#2ccc44',
    '#ff3976',
    '#6173d6',
    '#914ce5',
    '#42b1cc',
    '#ff55ac',
    '#0090ff',
    '#06d3c4',
    '#ffbc32',
    '#2ccc44',
    '#ff3976',
    '#6173d6',
    '#914ce5',
    '#42b1cc',
    '#ff55ac',
    '#0090ff',
    '#06d3c4',
    '#ffbc32',
    '#2ccc44',
    '#ff3976',
    '#6173d6',
    '#914ce5',
    '#42b1cc',
    '#ff55ac',
    '#0090ff',
    '#06d3c4',
    '#ffbc32',
    '#2ccc44',
    '#ff3976',
    '#6173d6',
    '#914ce5',
    '#42b1cc',
    '#ff55ac',
    '#0090ff',
    '#06d3c4',
    '#ffbc32',
    '#2ccc44',
    '#ff3976',
    '#6173d6',
    '#914ce5',
    '#42b1cc',
    '#ff55ac',
    '#0090ff',
    '#06d3c4',
    '#ffbc32',
    '#2ccc44',
    '#ff3976',
    '#6173d6',
    '#914ce5',
    '#42b1cc',
    '#ff55ac',
    '#0090ff',
    '#06d3c4',
    '#ffbc32',
    '#2ccc44',
    '#ff3976',
    '#6173d6',
    '#914ce5',
    '#42b1cc',
    '#ff55ac',
    '#0090ff',
    '#06d3c4',
    '#ffbc32',
    '#2ccc44',
    '#ff3976',
    '#6173d6',
    '#914ce5',
    '#42b1cc',
    '#ff55ac',
    '#0090ff',
    '#06d3c4',
    '#ffbc32',
    '#2ccc44',
    '#ff3976',
    '#6173d6',
    '#914ce5',
    '#42b1cc',
    '#ff55ac',
]

export default function App() {
    const [data, setData] = useState([
      { name: 'MORV',total: 7},
      { name: '乘用车开发中心',total: 14},
      { name: '架构开发中心',total: 36},
      { name: '科技创新部',total: 3},
      { name: '前瞻研究中心',total: 3},
      { name: '新能源及动力中心',total: 66},
      { name: '质量验证中心',total: 25},
      { name: '智能软件中心',total: 35},
    ])
    return (
      <div>
        <RenderCompo
            style={{
                width: 400,
                height: 300,
                position: 'absolute',
                top: 400,
                right: 20
            }}
        >   
            <div style={{ position: 'relative', height: 'auto' }}>
                <h4
                style={{
                    paddingLeft: 5,
                    color: 'rgb(0,236,252)',
                    height: 46,
                    lineHeight: '46px',
                    marginBottom: 1,
                    textAlign:'center',
                    background: `url(${getImgUrl('titleBg2')}) 45px center no-repeat`,
                }}
                >
                中心人员分布
                </h4>
            </div>

            <div style={{ display: 'flex', width: '100%' }}>
              <div style={{ width: '120%' }}>
              <Pie />
              </div>
              <div
                style={{
                  width: '70%',
                  height: 'calc(100% - 5px)',
                  paddingTop: 50, //调整右边table的 距离上面的距离
                  paddingRight:15
                  // overflowY: 'auto',
                }}
              >
                <table
                  style={{
                    width: 'calc(100% - 26px)',
                    marginLeft: 26,
                  }}
                >
                  <tbody>
                    {data.map((e, i) => {
                      return (
                        <tr
                          key={e.name}
                          style={{
                            borderBottom: '1px solid rgba(255,255,255,.4)',
                          }}
                        >
                          <td>
                            <div
                              style={{
                                position: 'relative',
                                height: 16,
                                cursor: 'pointer',
                              }}
                            >
                              <div
                                style={{
                                  position: 'absolute',
                                  borderRadius: 100,
                                  width: 12,
                                  height: 12,
                                  top: 4,
                                  left: -23,
                                  background: colorList[i % colorList.length],
                                }}
                              ></div>
                              <div style={{ color: 'white', fontSize: 14 }}>
                                {e.name}{' '}
                                <span
                                  style={{
                                    color: 'rgba(255,255,255,.4)',
                                    float: 'right',
                                    overflow: 'hidden',
                                    display: 'inline-block',
                                    height: 16,
                                  }}
                                >
                                  {e.total}辆
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
        </RenderCompo>
      </div>
  );
}