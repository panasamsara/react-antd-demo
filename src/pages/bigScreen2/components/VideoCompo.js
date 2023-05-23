

import React, { useEffect,useState } from 'react'
import RenderCompo from "@/components/RenderCompo";
import VideoOnLine from "@/components/VideoOnLine/VideoOnLine";
import { bus } from '@/utils';
import Draggable from 'react-draggable';
import { message, Checkbox, Modal, Button, DatePicker, InputNumber, Form } from 'antd';
import { CloseOutlined, StepForwardOutlined , NodeIndexOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { get, post } from '@/utils/requests';

const { RangePicker } = DatePicker;

export default function App(props) {
  const [modalShow, setModalShow] = useState(false);
  const [terminalNo, setTerminalNo] = useState(''); 
  const [vin, setVin] = useState(''); 
  const [chosenCar, setChosenCar] = useState({});
  const [initChannels, setInitChannels] = useState([]); // 暂存 初始channel
  const [checkedValues, setCheckedValues] = useState([]); // 勾选的channel，勾选几个展示几个视频弹框
  const [channelOptions, setChannelOptions] = useState([]); // 展示频道选项 供勾选（已过滤 ==0不展示）
  const [trackFormVisible, setTrackFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 视频关闭按钮事件
    const closeVideoCallback = (e) => {
      let arr = checkedValues.filter(item=>item!=e.channelLabel);
      setCheckedValues(arr)
    }
    // 详情打开弹框
    const showModalCallback = (e) => {
      setModalShow(true)
      setChosenCar(e.chosenCar)
      setTerminalNo(e.channelInfo.terminalNo)
      setInitChannels(e.channelInfo.channels)
      setVin(e.vin)
      let options = [];
      options = Object.keys(e.channelInfo.channels).map(item=>{
        let obj = {
          label: item,
          value: item,
          disabled: e.channelInfo.channels[item] =='0'
        }
        return obj
      })
      let arr = options.filter(item=> !item.disabled)
      setChannelOptions(arr)
      // setCheckedValues(['ch1']) // 默认选中播放ch1的视频
    }
    bus.on(`closeVideo`, closeVideoCallback); // 监听关闭事件
    bus.on(`showDetailModal`, showModalCallback) //监听关闭详情弹框
    bus.on(`changeDetailModal`, closeDetailModal) //切换详情
    return () => {
      bus.off(`closeVideo`, closeVideoCallback)
      bus.off(`showDetailModal`, showModalCallback)
      bus.off(`changeDetailModal`, closeDetailModal)
    }
  }, [checkedValues])

  // 复选框勾选事件，打开视频弹框
  const onChange = (checkedValues) => {
    setCheckedValues(checkedValues);
  };
  // 关闭详情弹框
  const closeDetailModal = () => {
    setModalShow(false)
    setCheckedValues([])
  };

  // 打开所有视频
  const openAllVideo = () => {
    let options = [];
    options = Object.keys(initChannels).map(item=>{
      let obj = {
        label: item,
        value: item,
        disabled: initChannels[item] =='0'
      }
      return obj
    })
    let arr = options.filter(item=> !item.disabled).map(item=>item.label)
    setCheckedValues(arr)
  };

  const handleOk = () => {
    setLoading(true);
    form.validateFields().then(values=>{
      let duration = dayjs(values.times[1]).unix() - dayjs(values.times[0]).unix();
      let number = duration/values.step;
      if(number>=10000){
        setLoading(false);
        message.error(`筛选条件不合理，请缩小时间范围或增加时间间隔！`);
      }else{
        getTrack(values)
      }
    }).catch(e=>{
      setLoading(false);
    })
  };
  /*
  * 获取轨迹接口，参数：
  *  vin      String （例：'LDP29H929NG000069'  ）
  *  start    Number （时间戳 精确到秒，例：1684215885  ）
  *  end      Number （时间戳 精确到秒，例：1684216995  ）
  *  step     String （例：'300s'、 '10m'  ）
  */
  const getTrack = async (params)=>{
    const {code,data} = await get('/api/getTrack', {
      // vins: vin,
      // start: dayjs(params.times[0]).unix() ,
      // end: dayjs(params.times[1]).unix() ,
      // step: params.step+ 's'
      vins: 'LDP29C929NG000057', //以下4个参数 为测试轨迹用
      start: 1684820041 ,
      end: 1684824041 ,
      step: '4s'
    })
    setLoading(false);
    setModalShow(false);
    if(code==0){
      bus.emit('getTrack', data[vin])
    }
  }

  const handleCancel = () => {
    setLoading(false);
    setTrackFormVisible(false);
  };
  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    } else {
      console.log('Clear');
    }
  };
  const rangePresets = [
    {
      label: 'Last 3 Days',
      value: [dayjs().add(-3, 'd'), dayjs()],
    },
    {
      label: 'Last 7 Days',
      value: [dayjs().add(-7, 'd'), dayjs()],
    },
  ];
  const disabledDate = (current) => {
    // Can not select days after today
    return current > dayjs().endOf('day');
  };

  const layout = {
    labelCol: {
      span: 6,
      style: { color: '#fff' }
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };
  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

  return (
    <div>
      <RenderCompo
        style={{
            width: 240,
            height: 300,
            position: 'absolute',
            top: 120,
            right: 220
        }}
      > 
      {
        checkedValues.map(item=>{
          let i = parseInt(item.slice(2)) -1
          return <VideoOnLine channelLabel={item} key={item}
            url={`http://${terminalNo
            }_v.vd.rdas.dfmc.com.cn:9502/hlsram/${item.slice(0,2)+ 'n' +  i}/index.m3u8`}
          />
        })
      }
      </RenderCompo>
      
      {
        modalShow ?
        <Draggable>
          <div style={{width: 800, height: 400, position: 'absolute', cursor: 'move',
            left: '45%', transform: 'translateX(-50%)',
            top: '40%', transform: 'translateY(-50%)',
            color: '#fff', display: 'flex',}}>
              <div style={{ width: 400, height: 300, background: 'rgba(0, 0, 0, 0.5)', 
                display: 'flex', flexDirection: 'column',
                textAlign: 'left', fontSize: 16, borderRadius: 4
              }}
              >
                <div style={{ height: 40, lineHeight : '40px', borderBottom: '1px solid #fff', paddingLeft: 10, 
                  display: 'flex', justifyContent: 'space-between'
                }}>
                  <div>车辆信号详情</div>
                  
                  <div style={{ display: 'flex', width: 100, height: 40, cursor: 'pointer' }} >
                    <div style={{ width: 48, height: 40, }} onClick={()=> setTrackFormVisible(true)}>
                      <NodeIndexOutlined/>
                    </div>
                    <div style={{ width: 48, height: 40, }} onClick={()=> openAllVideo()}>
                      <StepForwardOutlined />
                    </div>
                    <div style={{ width: 48, height: 40, }} onClick={()=>closeDetailModal()}>
                      <CloseOutlined />
                    </div>
                    
                  </div>
                </div>
                <div style={{ padding: 10, }}>
                  <div style={{ margin: '5px 0' }}>
                    <span>VIN码：</span>
                    <span>{vin}</span>
                  </div>
                  <div style={{ margin: '5px 0' }}>
                    <span>速度：</span>
                    <span>{chosenCar.speed}</span>
                  </div>
                  <div style={{ margin: '5px 0' }}>
                  <span>频道：</span>
                  <div className='map-channel'>
                    <Checkbox.Group 
                      options={channelOptions} 
                      defaultValue={['ch1']} 
                      value={checkedValues}
                      onChange={onChange} 
                    />
                  </div>

                  </div>
                </div>
              </div>
              
              { trackFormVisible ?
              <div style={{ width: 450, height: 300, background: 'rgba(0, 0, 0, 0.5)', 
                textAlign: 'left', fontSize: 16, borderRadius: 4
              }}>
                <div>
                  <div style={{margin: 20, color: '#fff'}}>
                    <ExclamationCircleOutlined />
                    每次最多获取10000条轨迹数据，请合理选择时间范围、时间间隔
                  </div>
                  <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    style={{
                      maxWidth: 600,
                    }}
                  >
                    <Form.Item
                      name="times"
                      label="时间范围"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <RangePicker presets={rangePresets} 
                        disabledDate={disabledDate}
                        onChange={onRangeChange} 
                        showTime={{
                          hideDisabledOptions: true,
                          defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('23:59:59', 'HH:mm:ss')],
                        }}
                        format="YYYY-MM-DD HH:mm:ss"
                      />
                    </Form.Item>
                    
                    <Form.Item
                      name="step"
                      label="时间间隔"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <InputNumber addonAfter="秒" />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                      <Button htmlType="button" onClick={onReset} style={{marginRight: 12}}>
                        重置
                      </Button>
                      <Button type="primary" htmlType="submit" onClick={handleOk}>
                        确定
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div> : null
              }
          </div>
          
        </Draggable> : null
      }

      {/* <Modal
        open={trackFormVisible}
        width={800}
        title="车辆行驶轨迹"
        maskClosable={false}
        style= {{opacity: 1}}
        onCancel={handleCancel}
        getContainer={props.screenRef.current}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            确认
          </Button>
        ]}
      >
        <div>
          <div style={{marginLeft: 100, marginBottom: 20, color: '#ff4d4f'}}>
            <ExclamationCircleOutlined />
            每次最多获取10000条轨迹数据，请合理选择时间范围、时间间隔
          </div>
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item
              name="times"
              label="时间范围"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <RangePicker presets={rangePresets} 
                disabledDate={disabledDate}
                onChange={onRangeChange} 
                showTime={{
                  hideDisabledOptions: true,
                  defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('23:59:59', 'HH:mm:ss')],
                }}
                format="YYYY-MM-DD HH:mm:ss"
              />
            </Form.Item>
            
            <Form.Item
              name="step"
              label="时间间隔"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber addonAfter="秒" />
            </Form.Item>
          </Form>
        </div>
      </Modal> */}
      
    </div>
  );
}
