/**************************************************************

クリックされたら特定のページに遷移する

注 userRouterはクライアントコンポーネントでしか使えない
  
ハードナビゲーション
...router.push で遷移すると遷移先でレンダリングが起きてデータベースから値を取得しにいく
ver13.4以降は初回だけレンダリングされて、2回目以降はソフトナビゲーションとなった

ソフトナビゲーション
...Linkから遷移したときなど。遷移先でレンダリングが起きない

***************************************************************/
"use client";

import { useRouter } from "next/navigation";


const RouterBtn = ({ destination = "" }: { destination?: string }) => {

  const router = useRouter()

  return(
    <button 
      className="rounded bg-indigo-600 px-3 py-1 font-medium text-white hover:bg-indigo-700"
      onClick={ () => router.push(`/${destination}`) }
    >
      Nav to { destination ? destination : "home" }
    </button>
  )
}

export default RouterBtn;