/**************************************************************

タイマーカウンター  

***************************************************************/
"use client";

import { useState, useEffect } from "react";



const TimerCounter = () => {
  const [ count, setCount ] = useState<number>(0);

  useEffect(() => {
    // 0.5秒おきに1づつインクリメントしていく
    const timer = setInterval(() => setCount((prevState) => prevState + 1), 1000);

    // このreturnは、クリーンアップ関数 ... timer()が発火し続けるのでアンマウント時に解放する
    // 第２引数の依存配列(ここでは[])により、アンマウント時に一度だけ発火
    return () => clearInterval(timer);
  }, []);

  return(
    <div>
      <p>{ count }</p>

      <button 
        className="font-sm my-3 rounded bg-indigo-600 py-1 px-3 text-white hover:bg-indigo"
        onClick={ () => setCount(0) }
      >
        reset
      </button>
    </div>
  )
}


export default TimerCounter;