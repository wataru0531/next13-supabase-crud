/**************************************************************

authページのレイアウト

クライアントサイドで持っているアクセストークンをサーバーサイドに渡す

***************************************************************/
// クライアントからサーバーにアクセストークンを渡すためにheaders、cookiesをインポート
// headers、cookiesにはログインしているユーザーの
import { headers, cookies } from "next/headers";
import SupabaseListener from "../components/supabase-listener";

// サーバーコンポーネントで使用できるsupabaseのインスタンスを生成するためのもの
// createServerComponentSupabaseClient は非推奨
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "../../../database.types"


const AuthLayout = async ({ children }: { children: React.ReactNode }) => {

  // サーバーサイドで使えるsupabaseのインスタンスを生成
  // ここで、headers、cookiesを生成しておくことで、クライアントサイドで持っている
  // アクセストークンをサーバーサイドに渡すことができる。
  const supabase = createServerComponentClient<Database>({
    headers,
    cookies,
  })

  // サーバーサイドに保存されているセッション情報(アクセストークン)を取得
  const { data: { session } } = await supabase.auth.getSession();

  return(
    <>
      <SupabaseListener accessToken={ session?.access_token } />
      { children }
    </>
  )
}

export default AuthLayout;
