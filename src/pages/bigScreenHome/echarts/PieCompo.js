

import React, { useState } from 'react'
import Pie from "./Pie";
import Category from "./Category";

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
      { name: '风神', total: 76 },
      { name: 'M事业部', total: 14 },
      { name: '东创紫联', total: 5 },
  ])
    return (
      <div>
        <div style={{ display: 'flex', width: 500 }}>
          <div style={{ width: 200 }}>
            <Pie />
          </div>
          <div
            style={{
              width: 270,
              height: 200,
              // overflowY: 'auto',
            }}
          >
            <Category/>
            {/* <table
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
            </table> */}
          </div>
        </div>
      </div>
  );
}
