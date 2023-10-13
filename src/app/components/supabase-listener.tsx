/**************************************************************


クライアントサイドとサーバーサイドのアクセストークンを比較して、
ログインしているユーザーを切り替える

***************************************************************/
// useEffect、クライアントサイドのSupabaseのインスタンスを使うのでuse client
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import supabase from "@/utils/supabase";
import useStore from "@/store";


// propsで、サーバーサイドにあるアクセストークンを取得
const SupabaseListener = ({ accessToken }: { accessToken?: string }) => {
  const router = useRouter();

  // ログインしているユーザーを更新する関数
  const { updateLoginUser } = useStore();

  useEffect(() => {
    // いまログインしているユーザーの状態をzustandに格納
    const getUserInfo = async () => {

      // 現在のユーザーのセッション情報を取得 (クッキーの中にセッションidがある)
      const { data } = await supabase.auth.getSession();

      if(data){
        updateLoginUser({ // zustandに通知
          id: data.session?.user.id,
          email: data.session?.user.email,
        })
      }
    }

    getUserInfo();

    // onAuthStateChange ... ユーザーのセッション情報の変化を監視
    // ユーザーがログインしたりしたり、ログアウトしたりするたびに発火
    supabase.auth.onAuthStateChange((_, session) => {

      // zustandに新しいユーザー情報を通知して更新
      updateLoginUser({ 
        id: session?.user.id, 
        email: session?.user.email! 
      })
      
      // クライアントサイドにあるトークンと、サーバーサイドのトークンとが一致しない場合は
      // サーバーコンポーネントを再実行してデータフェッチする
      if(session?.access_token !== accessToken){
        router.refresh(); // ここでサーバーコンポーネントを再実行
      }
    })

    // アクセストークンが変わるたびに処理が発火
  }, [ accessToken ])

  return null;
}

export default SupabaseListener;