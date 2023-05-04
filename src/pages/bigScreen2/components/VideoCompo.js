

import React, { useState } from 'react'
import RenderCompo from "@/components/RenderCompo";
import VideoOnLine from "@/components/VideoOnLine/VideoOnLine";

export default function App() {
  
  return (
    <div>
      <RenderCompo
        style={{
            width: 240,
            height: 300,
            position: 'absolute',
            top: 20,
            right: 120
        }}
      > 
        
          <VideoOnLine />
      </RenderCompo>

    </div>
  );
}
