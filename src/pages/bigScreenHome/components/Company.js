

import React, { useState } from 'react';
import { Button } from 'antd';
import getImgUrl from "@/assets/images/getImgUrl";

export default function App() {
  
  return (
    <div style={{ color: '#fff', padding: 20, height: 400, 
      display: 'flex', flexDirection: 'column', flexWrap: 'wrap',
      }}>
      <div style={{display: 'flex', justifyContent: 'space-between', width: 360, height: 30}}>
        <Button type='primary'>纳米</Button>
        <Button type='primary'>风神</Button>
        <Button type='primary'>猛士</Button>
        <Button>智采系统</Button>
      </div>

      <div style={{display: 'flex', flexWrap: 'wrap',width: 450, height: 300, padding: '30px 10px'}}>
        <div style={{ width: 60, height: 60, marginRight: 30, background: `url(${getImgUrl('DongFeng')}) center no-repeat`, backgroundSize: 'cover'}}></div>
        <div style={{ width: 60, height: 60, marginRight: 30, background: `url(${getImgUrl('JiLi')}) center no-repeat`, backgroundSize: 'cover'}}></div>
        <div style={{ width: 60, height: 60, marginRight: 30, background: `url(${getImgUrl('Changan')}) center no-repeat`, backgroundSize: 'cover'}}></div>
        <div style={{ width: 60, height: 60, marginRight: 30, background: `url(${getImgUrl('lantu')}) center no-repeat`, backgroundSize: 'contain'}}></div>
        <div style={{ width: 60, height: 60, marginRight: 30, background: `url(${getImgUrl('changcheng')}) center no-repeat`, backgroundSize: 'contain'}}></div>
        <div style={{ width: 60, height: 60, marginRight: 30, background: `url(${getImgUrl('audi')}) center no-repeat`, backgroundSize: 'cover'}}></div>
        <div style={{ width: 60, height: 60, marginRight: 30, background: `url(${getImgUrl('benz')}) center no-repeat`, backgroundSize: 'cover'}}></div>
        <div style={{ width: 60, height: 60, marginRight: 30, background: `url(${getImgUrl('bmw')}) center no-repeat`, backgroundSize: 'cover'}}></div>
        <div style={{ width: 60, height: 60, marginRight: 30, background: `url(${getImgUrl('byd')}) center no-repeat`, backgroundSize: 'cover'}}></div>
        <div style={{ width: 60, height: 60, marginRight: 30, background: `url(${getImgUrl('farrari')}) center no-repeat`, backgroundSize: 'cover'}}></div>
        <div style={{ width: 60, height: 60, marginRight: 30, background: `url(${getImgUrl('lanbojini')}) center no-repeat`, backgroundSize: 'cover'}}></div>
        <div style={{ width: 60, height: 60, marginRight: 30, background: `url(${getImgUrl('tesla')}) center no-repeat`, backgroundSize: 'cover'}}></div>
      </div>
    </div>
  );
}
