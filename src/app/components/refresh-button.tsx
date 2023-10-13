/**************************************************************

リフレッシュボタン

***************************************************************/
"use client";


import { useRouter } from "next/navigation";


const RefreshBtn = () => {
  const router = useRouter();

  return(
    <button 
      className="rounded bg-indigo-600 px-3 font-medium text-white hover:bg-indigo-700"
      onClick={() => {
        // router.refresh...ローカルのステートは保持されるが、サーバーコンポーネントはサーバーサイドでレンダリングされ最新データが取得できる
        router.refresh() 
      }}
    >
      Refresh current route
    </button>
  )
}

export default RefreshBtn;