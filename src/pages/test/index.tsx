import { useState, useEffect } from "react"


export default function RootPage() {

  var [count, setCount] = useState(0)

  useEffect(() => {

  });

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => { setCount(count + 1) }}>add</button>
    </div>
  )
}