/**************************************************************

１づつカウンターが増えるクライアントコンポーネント

***************************************************************/
"use client"

import { useState } from "react";



const Counter = () => {
  const [ count, setCount ] = useState<number>(0);

  return(
    <div className="border border-orange-500 p-1 text-center">
      <p>{ count }</p>
      <button
        className="rounded bg-indigo-600 px-3 font-medium text-white hover:bg-indigo-700"
        onClick={ () => setCount(prevState => prevState + 1) }
      >
        increment
      </button>
    </div>
  )
}

export default Counter;